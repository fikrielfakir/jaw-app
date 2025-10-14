import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { RegisterRestaurantScreen } from '@/features/auth/screens/RegisterRestaurantScreen';

const Stack = createStackNavigator();

// Placeholder Login Screen
const LoginScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login Screen</Text>
  </View>
);

// Placeholder Register Screen for Diners
const RegisterScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Register Screen (Diner)</Text>
  </View>
);

interface AuthNavigatorProps {
  userType: 'diner' | 'owner';
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ userType }) => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={userType === 'owner' ? 'RegisterRestaurant' : 'Login'}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterRestaurant" component={RegisterRestaurantScreen} />
    </Stack.Navigator>
  );
};