import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

// Placeholder Login Screen
const LoginScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login Screen</Text>
  </View>
);

// Placeholder Register Screen
const RegisterScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Register Screen</Text>
  </View>
);

interface AuthNavigatorProps {
  userType: 'diner' | 'owner';
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ userType }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};