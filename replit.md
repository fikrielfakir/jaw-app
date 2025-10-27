# Overview

JAW Restaurant is a React Native mobile application built with Expo that connects diners with restaurant owners. The app provides a dual-sided platform where users can discover and book restaurants, while restaurant owners can manage their establishments and bookings. The application supports both light and dark themes, multiple languages, and includes features like user authentication, restaurant search and filtering, booking management, and push notifications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application follows a modular React Native architecture using Expo as the development platform. The codebase is organized with TypeScript for type safety and uses a feature-based folder structure with shared components.

**Navigation System**: Implements React Navigation with separate navigation stacks for authenticated users (UserNavigator for diners, OwnerNavigator for restaurant owners) and unauthenticated users (AuthNavigator). The RootNavigator manages the overall navigation flow based on authentication state and user type.

**State Management**: Uses Zustand for lightweight state management with separate stores for authentication (authStore), UI state (uiStore), and user-specific data. This provides a simple and performant alternative to Redux while maintaining type safety.

**Component Architecture**: Follows a component-driven approach with reusable UI components (Button, Card, Avatar, Loader, Input) that support theming and consistent styling across the application.

**Theme System**: Implements a custom theming solution with light and dark mode support, managed through the useTheme hook and stored in the UI store for persistence across app sessions.

## Backend Architecture
**Authentication Service**: Integrates with Supabase for user authentication, supporting email/password login with automatic session management and token refresh.

**Database Design**: Uses Supabase PostgreSQL database with a profiles table structure that extends the default auth.users table to store additional user information including user type (diner/owner), profile details, and preferences.

**API Layer**: Implements a service-oriented architecture with Supabase client for database operations, including CRUD operations for users, restaurants, and bookings.

**File Storage**: Leverages Supabase Storage for handling image uploads (profile pictures, restaurant images) with public URL generation and file management capabilities.

## Data Models
The application defines clear TypeScript interfaces for core entities:
- **User**: Supports both diner and owner types with profile information
- **Restaurant**: Complete restaurant data including business hours, location, amenities, and ratings
- **Booking**: Reservation system with status tracking and guest management
- **BusinessHours**: Flexible scheduling system for restaurant operating hours

## Security & Authentication
Implements row-level security through Supabase with user type-based access control. Authentication state is managed globally and persisted using AsyncStorage for offline capability.

# External Dependencies

## Core Framework
- **Expo SDK 54**: Development platform and build system
- **React Native**: Mobile app framework
- **React Navigation**: Navigation library with stack, tab, and drawer navigators

## Backend Services
- **Supabase**: Backend-as-a-Service providing authentication, PostgreSQL database, and file storage
- **Supabase JavaScript Client**: Official client library for API interactions

## State Management
- **Zustand**: Lightweight state management library
- **AsyncStorage**: Local storage for authentication persistence

## UI Framework & Styling
- **NativeWind v4**: Tailwind CSS for React Native - modern utility-first styling approach
- **Tailwind CSS v3**: CSS framework powering NativeWind
- **Gluestack UI**: Component library for consistent design system
- **Lucide React Native**: Modern icon library with consistent design and tree-shakable imports
- **React Native SVG**: Vector graphics support
- **Expo Linear Gradient**: Gradient styling support

## Device Features
- **Expo Image Picker**: Camera and photo library access
- **Expo Notifications**: Push notification system
- **React Native Gesture Handler**: Touch gesture handling
- **React Native Reanimated**: Advanced animations

## Development Tools
- **TypeScript**: Type safety and developer experience
- **Metro**: JavaScript bundler configured for Replit environment
- **React Native Screens**: Native screen optimization

## Environment Configuration
The application requires Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY) for backend connectivity, with graceful fallbacks for development environments.

# Recent Changes

## October 27, 2025 - HomeScreen Category Images Enhancement
- **Updated category images** to use new circular restaurant/food photography assets (6 images: cafe, outdoor dining, celebration, bar, lounge, fine dining)
- **Added purple borders** (#8B5CF6) with 3px solid width to all category images for consistent visual design
- **Implemented active shadow effect** for selected categories:
  - Uses dual-wrapper architecture (outer for shadow, inner for circular clipping) for cross-platform compatibility
  - Shadow properties: shadowColor: #8B5CF6, shadowOpacity: 0.8, shadowRadius: 12, elevation: 12
  - Works correctly on iOS, Android, and Web platforms
- **Added continuous rotation animation** to the central bottle decoration using React Native Animated API
  - 360-degree rotation over 10 seconds
  - Smooth looping animation using useNativeDriver
- **Fixed Tamagui dark mode configuration**:
  - Set themeClassNameOnRoot: true in tamagui.config.ts
  - Removed problematic StyleSheet.setFlag code that caused runtime errors
  - Resolved "Cannot manually set color scheme" error
- Architecture review: PASS - All visual requirements met with cross-platform shadow support

## October 15, 2025 - Main App Screens Implementation
- **Built complete post-authentication user experience** with 8 new screens
- **User Screens (Diner Role)**:
  - **HomeScreen**: Category selection with circular layout featuring Cafe, Morocco Way, Fine Dining, Dance, Loung & Pub, and Chiringuito categories with purple gradient background
  - **DiscoverScreen**: Restaurant search and discovery with category filters, search bar, QR code scanner, and restaurant card listings
  - **VenueDetailsScreen**: Complete restaurant details with tabbed interface (Overview, Menu, Bookings), image gallery, cuisine tags, location map placeholder, contact information
  - **BookingScreen**: Modal-based reservation system with guest counter, interactive calendar, time slot selection, and booking confirmation
  - **ReviewsScreen**: Reviews feed with star ratings, user comments, and inline review submission with star rating and text input
  - **RestaurantCard Component**: Reusable card component displaying restaurant images, ratings, location, and favorite toggle
- **Owner Screens (Restaurant Owner Role)**:
  - **FeedScreen**: Social feed with Best Chef horizontal carousel, restaurant posts with engagement stats (likes, comments, ratings), and quick action menu (Start Live, Add Story, Add PIN)
- **Navigation Integration**: 
  - Updated UserNavigator with 5-tab bottom navigation (Home, Search, Favorites, Bookings, Profile)
  - Implemented stack navigation for Home tab to handle screen transitions (Home → Discover → VenueDetails → Booking/Reviews)
  - Updated OwnerNavigator with 5-tab layout (Feed, Discover, Add, Bookings, Profile)
  - All tabs styled with purple accent color (#8B5DFF) and dark theme
- **Design System**: Consistent dark theme implementation across all screens with purple accents, proper spacing, and responsive layouts
- Architecture review: All screens functionally complete with proper navigation flow

## October 15, 2025 - Lucide Icon Migration
- **Migrated from @expo/vector-icons to lucide-react-native** for all icon usage across the application
- **Avatar Component**: Updated to use Lucide's User and Pencil icons
- **Navigation Icons**: Added tab bar icons to both UserNavigator (Home, Calendar, UserCircle) and OwnerNavigator (LayoutDashboard, Calendar, Store)
- **Auth Screen Icons**: Replaced all emoji icons with proper Lucide icons:
  - Mail, Lock, Eye, EyeOff icons for input fields
  - ArrowLeft for back navigation
  - KeyRound for password reset screens
- Benefits: Consistent icon design, better performance with tree-shaking, more professional appearance
- All icons properly sized and colored to match the app's design system
- Architecture review: PASS - Lucide migration functionally correct with no blocking issues

## October 15, 2025 - Complete Authentication Flow Implementation
- **Built complete authentication system** with 6 screens matching the design specifications
- **SignInScreen**: Email/password login with Google/Facebook social login options, remember me checkbox, and forgot password link
- **SignUpScreen**: User registration with first/last name, email, password fields and social login options
- **ForgotPasswordScreen**: Password recovery with email input and KeyRound icon from Lucide
- **VerifyEmailScreen**: 6-digit OTP verification with auto-focus between inputs and resend code functionality
- **EnterNewPasswordScreen**: New password entry with confirmation and password visibility toggle
- **RegisterRestaurantScreen**: Full-width scrollable form for restaurant owner registration
- **AuthNavigator**: Complete navigation flow wiring all auth screens with proper transitions
- All screens use consistent purple gradient background (rgba(69, 48, 99, 0.86) to #000000)
- Logo integration across all auth screens using the JAW logo image
- Responsive design with proper keyboard handling and ScrollView support
- Architecture review: PASS - All screens meet design requirements and follow best practices

## October 15, 2025 - Logo Integration
- Replaced all "JAW" text instances with the official logo image
- Updated OnboardingScreen, WelcomeScreen, and all auth screens with logo
- Logo properly sized and positioned for each screen context

## October 15, 2025 - Project Import and Setup
- Completed project import from GitHub to Replit environment
- Installed all npm dependencies using --legacy-peer-deps flag
- Configured and verified Expo Web Server workflow running successfully on port 5000

## October 1, 2025 - NativeWind Migration (Modern Styling)
- **Modernized styling approach** from StyleSheet to NativeWind (Tailwind CSS for React Native)
- Successfully migrated OnboardingScreen to use className utility syntax
- Installed and configured NativeWind v4 with Tailwind CSS v3
- Updated Babel and Metro configurations for NativeWind support
- Added TypeScript types for className IntelliSense
- Created global.css with Tailwind directives
- **Visual design preserved exactly** - no regressions or UI changes
- Code is now cleaner and more maintainable with Tailwind utilities
- Gradient colors maintained: dark purple (#453063 at 86% opacity) to black (#000000)
- Architecture review: PASS - Migration well-executed with improved code quality

## October 1, 2025 - Fresh GitHub Clone Import
- Successfully imported JAW Restaurant app from fresh GitHub clone to Replit environment
- Installed all npm dependencies using --legacy-peer-deps flag (required for Tamagui and React Native compatibility)
- Configured Metro bundler for Replit proxy environment:
  - Removed invalid server.host configuration from metro.config.js
  - Added EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 environment variable to package.json web script
  - Configured to bind to port 5000 as required by Replit
- Set up Expo Web Server workflow successfully running on port 5000
- Configured deployment for autoscale target with production optimization flags (--no-dev --minify)
- Verified application is fully functional and accessible via Replit webview
- Application displays onboarding screens correctly with JAW branding
- Note: Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY) need to be configured in Replit secrets for full backend functionality

## Previous Onboarding Implementation
- Implemented complete 4-screen onboarding flow with React Native best practices
- Features dark purple to black gradient background with dining scene illustrations
- Uses useWindowDimensions for responsive sizing and modern React Native patterns