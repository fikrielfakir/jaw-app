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
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';

interface EnterNewPasswordScreenProps {
  navigation?: any;
  onContinue?: (newPassword: string, confirmPassword: string) => void;
  onCancel?: () => void;
}

export const EnterNewPasswordScreen: React.FC<EnterNewPasswordScreenProps> = ({ 
  navigation,
  onContinue,
  onCancel 
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    console.log('Setting new password...');
    onContinue?.(newPassword, confirmPassword);
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
              onPress={() => navigation?.goBack()}
              className="pt-3 pb-6"
            >
              <ArrowLeft size={28} color="#FFFFFF" />
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
                <Lock size={48} color="rgba(255, 255, 255, 0.8)" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-white text-center mb-8">
              Enter Your New Password
            </Text>

            {/* New Password Field */}
            <Text className="text-white/70 text-sm mb-3">New Password</Text>
            <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4 flex-row items-center">
              <Lock size={20} color="rgba(255, 255, 255, 0.4)" style={{ marginRight: 12 }} />
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter your new password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={!showNewPassword}
                className="flex-1 text-white"
                style={{ fontSize: 15 }}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? (
                  <Eye size={20} color="rgba(255, 255, 255, 0.4)" />
                ) : (
                  <EyeOff size={20} color="rgba(255, 255, 255, 0.4)" />
                )}
              </TouchableOpacity>
            </View>

            {/* Confirm Password Field */}
            <Text className="text-white/70 text-sm mb-3">Confirm Password</Text>
            <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-8 flex-row items-center">
              <Lock size={20} color="rgba(255, 255, 255, 0.4)" style={{ marginRight: 12 }} />
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your  password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={!showConfirmPassword}
                className="flex-1 text-white"
                style={{ fontSize: 15 }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <Eye size={20} color="rgba(255, 255, 255, 0.4)" />
                ) : (
                  <EyeOff size={20} color="rgba(255, 255, 255, 0.4)" />
                )}
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-[#8B5DFF] rounded-xl py-4 mb-4"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Continue
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onCancel || (() => navigation?.goBack())}
              className="bg-white/10 border border-white/20 rounded-xl py-4"
            >
              <Text className="text-white text-base text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
