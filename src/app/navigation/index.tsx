import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '@/store/authStore';
import { WelcomeScreen } from '@/features/auth/screens/WelcomeScreen';
import { AuthNavigator } from './AuthNavigator';
import { UserNavigator } from './UserNavigator';
import { OwnerNavigator } from './OwnerNavigator';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const { isAuthenticated, userType } = useAuthStore();
  const [selectedRole, setSelectedRole] = React.useState<'diner' | 'owner' | null>(null);

  const handleRoleSelection = (role: 'diner' | 'owner') => {
    setSelectedRole(role);
  };

  if (!isAuthenticated && !selectedRole) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome">
            {() => <WelcomeScreen onSelectRole={handleRoleSelection} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (!isAuthenticated && selectedRole) {
    return (
      <NavigationContainer>
        <AuthNavigator userType={selectedRole} />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {userType === 'diner' ? <UserNavigator /> : <OwnerNavigator />}
    </NavigationContainer>
  );
};