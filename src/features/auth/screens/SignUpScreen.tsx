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
import { Lock, Eye, EyeOff } from 'lucide-react-native';

interface SignUpScreenProps {
  navigation?: any;
  onSignIn?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation, onSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log('Signing up...');
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up');
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook Sign Up');
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
                <View className="items-center mb-6">
                  <Image
                    source={require('../../../../attached_assets/Profile Restaurent Booking_1760530725671.png')}
                    className="h-[50px]"
                    resizeMode="contain"
                    style={{ width: 120 }}
                  />
                </View>

                {/* Title */}
                <Text className="text-3xl font-bold text-white text-center mb-2">
                  Sign Up Account
                </Text>

                {/* Subtitle */}
                <Text className="text-sm text-white/70 text-center mb-6">
                  Enter your personal data to create your account.
                </Text>

                {/* Social Login Buttons */}
                <View className="flex-row mb-6" style={{ gap: 12 }}>
                  <TouchableOpacity 
                    onPress={handleGoogleSignUp}
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 flex-row items-center justify-center"
                    style={{ gap: 8 }}
                  >
                    <Text className="text-white text-base">Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleFacebookSignUp}
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

                {/* First Name & Last Name */}
                <View className="flex-row mb-4" style={{ gap: 12 }}>
                  <View className="flex-1">
                    <Text className="text-white text-sm mb-2">First Name</Text>
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="eg.John"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                      style={{ fontSize: 15 }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-sm mb-2">Last Name</Text>
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="eg.Francisco"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
                      style={{ fontSize: 15 }}
                    />
                  </View>
                </View>

                {/* Email Field */}
                <Text className="text-white text-sm mb-2">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="eg.johnfran@gmail.com"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4 text-white"
                  style={{ fontSize: 15 }}
                />

                {/* Password Field */}
                <Text className="text-white text-sm mb-2">Password</Text>
                <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-2 flex-row items-center">
                  <Lock size={20} color="rgba(255, 255, 255, 0.4)" style={{ marginRight: 12 }} />
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
                    {showPassword ? (
                      <Eye size={20} color="rgba(255, 255, 255, 0.4)" />
                    ) : (
                      <EyeOff size={20} color="rgba(255, 255, 255, 0.4)" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Password Requirements */}
                <Text className="text-white/50 text-xs mb-8">
                  Must be at least 8 characters
                </Text>

                {/* Sign Up Button */}
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="bg-[#8B5DFF] rounded-xl py-4 mb-8"
                >
                  <Text className="text-white text-lg font-semibold text-center">
                    Sign Up
                  </Text>
                </TouchableOpacity>

                {/* Sign In Link */}
                <View className="flex-row justify-center items-center mb-6">
                  <Text className="text-white/60 text-sm">Already have an account ? </Text>
                  <TouchableOpacity onPress={onSignIn}>
                    <Text className="text-white text-sm font-semibold">Sign In</Text>
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
