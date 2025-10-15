import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ForgotPasswordScreenProps {
  navigation?: any;
  onSubmit?: (email: string) => void;
  onBackToSignIn?: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ 
  navigation, 
  onSubmit,
  onBackToSignIn 
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Submitting forgot password request...');
    onSubmit?.(email);
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
          <View className="flex-1 px-6">
            {/* Back Button */}
            <TouchableOpacity 
              onPress={onBackToSignIn || (() => navigation?.goBack())}
              className="pt-3 pb-6"
            >
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>

            {/* JAW Logo */}
            <View className="items-center mb-8">
              <Image
                source={require('../../../../attached_assets/Profile Restaurent Booking_1760530725671.png')}
                className="h-[50px]"
                resizeMode="contain"
                style={{ width: 120 }}
              />
            </View>

            {/* Icon */}
            <View className="items-center mb-6">
              <View className="w-24 h-24 bg-white/10 border border-white/20 rounded-3xl items-center justify-center">
                <Text className="text-5xl">👆</Text>
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-white text-center mb-4">
              Forgot Your Password{'\n'}and Continue
            </Text>

            {/* Email Field */}
            <Text className="text-white text-sm mb-3">Email</Text>
            <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6 flex-row items-center">
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

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#8B5DFF] rounded-xl py-4 mb-4"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Submit Now
              </Text>
            </TouchableOpacity>

            {/* Back to Sign In Button */}
            <TouchableOpacity
              onPress={onBackToSignIn || (() => navigation?.goBack())}
              className="bg-white/10 border border-white/20 rounded-xl py-4"
            >
              <Text className="text-white text-base text-center">
                ← back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
