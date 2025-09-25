-- JAW Restaurant App - Complete Supabase Database Schema
-- Generated for Supabase PostgreSQL
-- Date: September 21, 2025

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types and enums
CREATE TYPE user_type AS ENUM ('customer', 'restaurant_owner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'approved', 'cancelled', 'completed');
CREATE TYPE notification_type AS ENUM ('booking', 'review', 'promotion', 'system');
CREATE TYPE price_range AS ENUM ('$', '$$', '$$$', '$$$$');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired');
CREATE TYPE payment_method_type AS ENUM ('credit_card', 'debit_card', 'paypal', 'apple_pay');
CREATE TYPE content_type AS ENUM ('image', 'video');

-- ==========================================
-- USERS TABLE (extends Supabase auth.users)
-- ==========================================

CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    profile_image TEXT,
    bio TEXT,
    user_type user_type DEFAULT 'customer',
    is_verified BOOLEAN DEFAULT FALSE,
    language VARCHAR(10) DEFAULT 'en',
    dark_theme BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- CATEGORIES TABLE
-- ==========================================

CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- RESTAURANTS TABLE
-- ==========================================

CREATE TABLE public.restaurants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    email VARCHAR(255),
    website TEXT,
    cuisine_type VARCHAR(100),
    price_range price_range,
    average_rating DECIMAL(2,1) DEFAULT 0.0 CHECK (average_rating >= 0 AND average_rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    business_hours JSONB, -- Store opening hours as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- RESTAURANT CATEGORIES (Many-to-Many)
-- ==========================================

CREATE TABLE public.restaurant_categories (
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, category_id)
);

-- ==========================================
-- RESTAURANT IMAGES TABLE
-- ==========================================

CREATE TABLE public.restaurant_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- MENU ITEMS TABLE
-- ==========================================

CREATE TABLE public.menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category VARCHAR(100),
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    allergens TEXT[], -- Array of allergen information
    nutritional_info JSONB, -- Store nutritional data as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- BOOKINGS TABLE
-- ==========================================

CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size > 0 AND party_size <= 20),
    status booking_status DEFAULT 'pending',
    special_requests TEXT,
    confirmation_code VARCHAR(10),
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure booking is in the future (except for testing)
    CONSTRAINT future_booking CHECK (booking_date >= CURRENT_DATE)
);

-- ==========================================
-- REVIEWS TABLE
-- ==========================================

CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    response TEXT, -- Restaurant owner response
    response_date TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE, -- For verified reviews
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- REVIEW IMAGES TABLE
-- ==========================================

CREATE TABLE public.review_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- FAVORITES TABLE
-- ==========================================

CREATE TABLE public.favorites (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, restaurant_id)
);

-- ==========================================
-- BOOKMARKS TABLE
-- ==========================================

CREATE TABLE public.bookmarks (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, restaurant_id)
);

-- ==========================================
-- NOTIFICATIONS TABLE
-- ==========================================

CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT, -- Deep link for notification actions
    metadata JSONB, -- Additional data for the notification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PREMIER SUBSCRIPTIONS TABLE
-- ==========================================

CREATE TABLE public.premier_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    plan_type VARCHAR(50) NOT NULL DEFAULT 'premier',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status subscription_status DEFAULT 'active',
    stripe_subscription_id TEXT, -- For Stripe integration
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure valid date range
    CONSTRAINT valid_subscription_period CHECK (end_date > start_date)
);

-- ==========================================
-- PAYMENT METHODS TABLE
-- ==========================================

CREATE TABLE public.payment_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type payment_method_type NOT NULL,
    last_four VARCHAR(4),
    brand VARCHAR(50),
    expiry_month INTEGER,
    expiry_year INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    stripe_payment_method_id TEXT, -- For Stripe integration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- USER STORIES TABLE
-- ==========================================

CREATE TABLE public.user_stories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content_url TEXT NOT NULL,
    content_type content_type NOT NULL,
    caption TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- STORY VIEWS TABLE
-- ==========================================

CREATE TABLE public.story_views (
    story_id UUID REFERENCES public.user_stories(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (story_id, viewer_id)
);

-- ==========================================
-- BUSINESS ANALYTICS TABLE
-- ==========================================

CREATE TABLE public.business_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    bookings INTEGER DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    favorites INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0.0,
    revenue DECIMAL(12,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(restaurant_id, date)
);

-- ==========================================
-- CONTACT MESSAGES TABLE
-- ==========================================

CREATE TABLE public.contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    admin_response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- FAQ TABLE
-- ==========================================

CREATE TABLE public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PARTNER APPLICATIONS TABLE
-- ==========================================

CREATE TABLE public.partner_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    business_address TEXT NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premier_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_views ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Public access to restaurants (read-only for most users)
CREATE POLICY "Anyone can view active restaurants" ON public.restaurants FOR SELECT USING (is_active = true);
CREATE POLICY "Restaurant owners can manage own restaurants" ON public.restaurants FOR ALL USING (auth.uid() = owner_id);

-- Bookings - users can manage their own bookings, restaurant owners can see bookings for their restaurants
CREATE POLICY "Users can manage own bookings" ON public.bookings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Restaurant owners can view bookings for their restaurants" ON public.bookings FOR SELECT USING (
    auth.uid() IN (SELECT owner_id FROM public.restaurants WHERE id = restaurant_id)
);

-- Reviews - users can manage their own reviews, public can read
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Favorites and bookmarks - users can manage their own
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Notifications - users can view their own notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Premier subscriptions - users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.premier_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own subscriptions" ON public.premier_subscriptions FOR ALL USING (auth.uid() = user_id);

-- Payment methods - users can manage their own payment methods
CREATE POLICY "Users can manage own payment methods" ON public.payment_methods FOR ALL USING (auth.uid() = user_id);

-- User stories - users can manage their own stories, others can view active stories
CREATE POLICY "Users can manage own stories" ON public.user_stories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view active stories" ON public.user_stories FOR SELECT USING (is_active = true AND expires_at > NOW());

-- Story views - users can view/add story views
CREATE POLICY "Users can manage story views" ON public.story_views FOR ALL USING (auth.uid() = viewer_id);

-- ==========================================
-- FUNCTIONS AND TRIGGERS
-- ==========================================

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_premier_subscriptions_updated_at BEFORE UPDATE ON public.premier_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update restaurant rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_restaurant_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.restaurants 
    SET 
        average_rating = (
            SELECT ROUND(AVG(rating::numeric), 1) 
            FROM public.reviews 
            WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
        )
    WHERE id = COALESCE(NEW.restaurant_id, OLD.restaurant_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply rating update trigger
CREATE TRIGGER update_restaurant_rating_on_review_change 
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews 
    FOR EACH ROW EXECUTE FUNCTION update_restaurant_rating();

-- Function to generate confirmation codes for bookings
CREATE OR REPLACE FUNCTION generate_confirmation_code()
RETURNS TRIGGER AS $$
BEGIN
    NEW.confirmation_code = UPPER(SUBSTRING(MD5(RANDOM()::text), 1, 8));
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply confirmation code trigger
CREATE TRIGGER generate_booking_confirmation_code 
    BEFORE INSERT ON public.bookings 
    FOR EACH ROW EXECUTE FUNCTION generate_confirmation_code();

-- ==========================================
-- INITIAL DATA (SAMPLE CATEGORIES)
-- ==========================================

INSERT INTO public.categories (name, description, icon_url) VALUES 
('Fast Food', 'Quick service restaurants and fast food chains', 'https://example.com/icons/fast-food.png'),
('Fine Dining', 'Upscale restaurants with premium service', 'https://example.com/icons/fine-dining.png'),
('Casual Dining', 'Relaxed atmosphere family restaurants', 'https://example.com/icons/casual-dining.png'),
('Coffee & Cafes', 'Coffee shops and casual cafes', 'https://example.com/icons/coffee.png'),
('Delivery Only', 'Delivery and takeout only restaurants', 'https://example.com/icons/delivery.png'),
('Food Trucks', 'Mobile food vendors and food trucks', 'https://example.com/icons/food-truck.png');

-- ==========================================
-- SAMPLE FAQ DATA
-- ==========================================

INSERT INTO public.faqs (question, answer, category, display_order) VALUES 
('How do I make a reservation?', 'You can make a reservation by browsing restaurants in the app, selecting your preferred restaurant, and choosing an available time slot.', 'Bookings', 1),
('Can I cancel my reservation?', 'Yes, you can cancel your reservation up to 2 hours before the scheduled time through the app.', 'Bookings', 2),
('How do I become a restaurant partner?', 'Restaurant owners can apply to join our platform by filling out the partner application form in the app.', 'Business', 3),
('What is JAW Premier?', 'JAW Premier is our premium subscription service that offers exclusive benefits like priority bookings and special discounts.', 'Premium', 4),
('How do I contact customer support?', 'You can reach our customer support team through the Contact Us section in the app or email us directly.', 'Support', 5);