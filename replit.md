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

## UI Framework
- **Gluestack UI**: Component library for consistent design system
- **Expo Vector Icons**: Icon library
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

## October 1, 2025 - Onboarding Screens Implementation
- Implemented complete 4-screen onboarding flow matching exact design specifications
- Updated OnboardingScreen.tsx with React Native best practices:
  - Used useWindowDimensions for responsive sizing
  - Implemented Platform.select for web-compatible shadow styles (boxShadow on web)
  - Moved Image resizeMode from style to prop
  - Refactored to StyleSheet.create for better performance
- Replaced illustration images with custom-designed shapes:
  - Screen 1: Purple circular background with dining scene
  - Screen 2: Beige shape with reviews/5-star rating scene  
  - Screen 3: Beige shape with business/growth scene
  - Screen 4: Light blue circular with couple dining scene
- All 4 screens properly display with JAW logo, Skip button, titles, pagination dots, and Next button

## October 1, 2025 - Fresh Clone Import Setup
- Successfully re-imported the JAW Restaurant app from GitHub clone to Replit environment
- Installed all npm dependencies using --legacy-peer-deps flag (required for Tamagui compatibility)
- Verified Metro bundler configuration for Replit environment (0.0.0.0:5000 with proper host binding)
- Expo Web Server workflow running successfully on port 5000
- Deployment configuration set up for autoscale with production flags (--no-dev --minify)
- Project is fully functional and accessible via webview
- Note: Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY) need to be configured for full backend functionality

## September 26, 2025 - Initial Project Import Setup
- First import of the JAW Restaurant app to Replit environment
- Configured Metro bundler for Replit environment with proper host binding (0.0.0.0:5000)
- Set up Expo Web Server workflow running on port 5000
- Deployed configuration set up for autoscale deployment target