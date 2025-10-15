import React, { useState, useRef } from 'react';
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
import { Mail, ArrowLeft } from 'lucide-react-native';

interface VerifyEmailScreenProps {
  navigation?: any;
  onVerify?: (code: string) => void;
  onResendCode?: () => void;
}

export const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ 
  navigation, 
  onVerify,
  onResendCode 
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const fullCode = code.join('');
    console.log('Verifying code:', fullCode);
    onVerify?.(fullCode);
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
                <Mail size={48} color="rgba(255, 255, 255, 0.8)" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-white text-center mb-2">
              Verify Your Email to
            </Text>

            {/* Subtitle */}
            <Text className="text-base text-white/70 text-center mb-8">
              Enter the 6 digit verification code
            </Text>

            {/* OTP Input Fields */}
            <View className="flex-row justify-center mb-8" style={{ gap: 12 }}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  className="w-12 h-12 bg-black/40 border border-white/30 rounded-lg text-white text-center text-xl"
                  style={{ fontSize: 20 }}
                />
              ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-[#8B5DFF] rounded-xl py-4 mb-6"
            >
              <Text className="text-white text-lg font-semibold text-center">
                Continue
              </Text>
            </TouchableOpacity>

            {/* Resend Code */}
            <View className="flex-row justify-center items-center">
              <Text className="text-white/60 text-sm">Didn't you code receive any code ? </Text>
              <TouchableOpacity onPress={onResendCode}>
                <Text className="text-white text-sm font-semibold">Resend Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
