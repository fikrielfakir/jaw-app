import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { WelcomeScreen } from '@/features/auth/screens/WelcomeScreen';
import { OnboardingScreen } from '@/features/onboarding/screens/OnboardingScreen';
import { AuthNavigator } from './AuthNavigator';
import { UserNavigator } from './UserNavigator';
import { OwnerNavigator } from './OwnerNavigator';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated, userType } = useAuthStore();
  const { hasCompletedOnboarding } = useUIStore();
  const [selectedRole, setSelectedRole] = React.useState<'diner' | 'owner' | null>(null);

  const handleRoleSelection = (role: 'diner' | 'owner') => {
    setSelectedRole(role);
  };

  const handleBackToWelcome = () => {
    setSelectedRole(null);
  };

  const handleOnboardingComplete = () => {
    // Navigation will automatically update when hasCompletedOnboarding changes
  };

  // Temporarily show UserNavigator directly for testing
  return (
    <NavigationContainer>
      <UserNavigator />
    </NavigationContainer>
  );

  // // Show onboarding if not completed
  // if (!hasCompletedOnboarding) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator screenOptions={{ headerShown: false }}>
  //         <Stack.Screen name="Onboarding">
  //           {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
  //         </Stack.Screen>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  // if (!isAuthenticated && !selectedRole) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator screenOptions={{ headerShown: false }}>
  //         <Stack.Screen name="Welcome">
  //           {() => <WelcomeScreen onSelectRole={handleRoleSelection} />}
  //         </Stack.Screen>
  //       </Stack.Navigator>    
  //     </NavigationContainer>
  //   );
  // }

  // if (!isAuthenticated && selectedRole) {
  //   return (
  //     <NavigationContainer>
  //       <AuthNavigator userType={selectedRole} onBackToWelcome={handleBackToWelcome} />
  //     </NavigationContainer>
  //   );
  // }

  // return (
  //   <NavigationContainer>
  //     {userType === 'diner' ? <UserNavigator /> : <OwnerNavigator />}
  //   </NavigationContainer>
  // );
};
