import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SignInScreenProps {
  navigation?: any;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation, onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    console.log('Signing in...');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook Sign In');
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['rgba(69, 48, 99, 0.86)', '#000000']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView 
              className="flex-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex-1 px-6 pt-12">
                {/* JAW Logo */}
                <View className="items-center mb-8">
                  <Image
                    source={require('../../../../attached_assets/Profile Restaurent Booking_1760530725671.png')}
                    className="h-[50px]"
                    resizeMode="contain"
                    style={{ width: 120 }}
                  />
                </View>

                {/* Title */}
                <Text className="text-3xl font-bold text-white text-center mb-2">
                  Sign In
                </Text>

                {/* Subtitle */}
                <Text className="text-base text-white/70 text-center mb-8">
                  Sign in to continue
                </Text>

                {/* Social Login Buttons */}
                <View className="flex-row mb-6" style={{ gap: 12 }}>
                  <TouchableOpacity 
                    onPress={handleGoogleSignIn}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 flex-row items-center justify-center"
                    style={{ gap: 8 }}
                  >
                    <Text className="text-white text-base">Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleFacebookSignIn}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 flex-row items-center justify-center"
                    style={{ gap: 8 }}
                  >
                    <Text className="text-white text-base">Facebook</Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-[1px] bg-white/20" />
                  <Text className="text-white/50 px-4">Or</Text>
                  <View className="flex-1 h-[1px] bg-white/20" />
                </View>

                {/* Email Field */}
                <Text className="text-white text-sm mb-2">Email</Text>
                <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4 flex-row items-center">
                  <Text className="text-white/40 mr-3">✉</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="eg.johnfran@gmail.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-white"
                    style={{ fontSize: 15 }}
                  />
                </View>

                {/* Password Field */}
                <Text className="text-white text-sm mb-2">Password</Text>
                <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-2 flex-row items-center">
                  <Text className="text-white/40 mr-3">🔒</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-white"
                    style={{ fontSize: 15 }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text className="text-white/40 text-lg">{showPassword ? '👁' : '👁‍🗨'}</Text>
                  </TouchableOpacity>
                </View>

                {/* Password Requirements */}
                <Text className="text-white/50 text-xs mb-4">
                  Must be at least 8 characters
                </Text>

                {/* Remember Me & Forgot Password */}
                <View className="flex-row items-center justify-between mb-8">
                  <TouchableOpacity 
                    onPress={() => setRememberMe(!rememberMe)}
                    className="flex-row items-center"
                  >
                    <View className={`w-5 h-5 border border-white/40 rounded mr-2 ${rememberMe ? 'bg-white/20' : ''}`} />
                    <Text className="text-white/70 text-sm">Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onForgotPassword}>
                    <Text className="text-white text-sm">Forget Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                  onPress={handleSignIn}
                  className="bg-[#8B5DFF] rounded-xl py-4 mb-8"
                >
                  <Text className="text-white text-lg font-semibold text-center">
                    Sign Up
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View className="flex-row justify-center items-center mb-6">
                  <Text className="text-white/60 text-sm">Don't have an account ? </Text>
                  <TouchableOpacity onPress={onSignUp}>
                    <Text className="text-white text-sm font-semibold">Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
