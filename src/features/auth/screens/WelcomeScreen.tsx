import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WelcomeScreenProps {
  onSelectRole: (role: 'diner' | 'owner') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectRole,
}) => {
  return (
    <View className="flex-1">
      {/* Dark Purple Gradient Background - same as onboarding */}
      <LinearGradient
        colors={['rgba(69, 48, 99, 0.86)', '#000000']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 justify-center items-center px-6">
            <View className="w-full max-w-[400px]">
              {/* JAW Logo */}
              <Text className="text-[60px] font-bold text-white text-center mb-6 tracking-[2px] italic">
                JAW
              </Text>

              {/* Welcome Title */}
              <Text className="text-[32px] font-bold text-white text-center mb-3">
                Welcome to JAW
              </Text>

              {/* Subtitle */}
              <Text className="text-[17px] text-white/80 text-center mb-12">
                Join our community now
              </Text>

              {/* Buttons */}
              <View className="gap-4">
                {/* Owner Button - Purple */}
                <TouchableOpacity
                  onPress={() => onSelectRole('owner')}
                  className="bg-[#8B5DFF] py-[18px] rounded-xl"
                >
                  <Text className="text-white text-[17px] font-semibold text-center">
                    I'm an Owner
                  </Text>
                </TouchableOpacity>

                {/* User Button - White */}
                <TouchableOpacity
                  onPress={() => onSelectRole('diner')}
                  className="bg-white py-[18px] rounded-xl"
                >
                  <Text className="text-[#2D2D4A] text-[17px] font-semibold text-center">
                    I'm a user
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
