import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterRestaurantScreen } from '@/features/auth/screens/RegisterRestaurantScreen';
import { SignInScreen } from '@/features/auth/screens/SignInScreen';
import { SignUpScreen } from '@/features/auth/screens/SignUpScreen';
import { ForgotPasswordScreen } from '@/features/auth/screens/ForgotPasswordScreen';
import { VerifyEmailScreen } from '@/features/auth/screens/VerifyEmailScreen';
import { EnterNewPasswordScreen } from '@/features/auth/screens/EnterNewPasswordScreen';

const Stack = createStackNavigator();

interface AuthNavigatorProps {
  userType: 'diner' | 'owner';
  onBackToWelcome?: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ userType, onBackToWelcome }) => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={userType === 'owner' ? 'RegisterRestaurant' : 'SignIn'}
    >
      {/* Sign In Screen */}
      <Stack.Screen name="SignIn">
        {(props) => (
          <SignInScreen 
            {...props} 
            onForgotPassword={() => props.navigation.navigate('ForgotPassword')}
            onSignUp={() => props.navigation.navigate('SignUp')}
          />
        )}
      </Stack.Screen>

      {/* Sign Up Screen */}
      <Stack.Screen name="SignUp">
        {(props) => (
          <SignUpScreen 
            {...props} 
            onSignIn={() => props.navigation.navigate('SignIn')}
          />
        )}
      </Stack.Screen>

      {/* Forgot Password Flow */}
      <Stack.Screen name="ForgotPassword">
        {(props) => (
          <ForgotPasswordScreen 
            {...props} 
            onSubmit={(email) => {
              console.log('Forgot password for:', email);
              props.navigation.navigate('VerifyEmail');
            }}
            onBackToSignIn={() => props.navigation.navigate('SignIn')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="VerifyEmail">
        {(props) => (
          <VerifyEmailScreen 
            {...props} 
            onVerify={(code) => {
              console.log('Verification code:', code);
              props.navigation.navigate('EnterNewPassword');
            }}
            onResendCode={() => console.log('Resending code...')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="EnterNewPassword">
        {(props) => (
          <EnterNewPasswordScreen 
            {...props} 
            onContinue={(newPassword, confirmPassword) => {
              console.log('New password set');
              props.navigation.navigate('SignIn');
            }}
            onCancel={() => props.navigation.navigate('SignIn')}
          />
        )}
      </Stack.Screen>

      {/* Restaurant Registration */}
      <Stack.Screen name="RegisterRestaurant">
        {(props) => <RegisterRestaurantScreen {...props} onBackToWelcome={onBackToWelcome} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
