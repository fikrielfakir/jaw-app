import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../../store/authStore';

interface WelcomeScreenProps {
  onSelectRole: (role: 'diner' | 'owner') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectRole,
}) => {
  const { setUser } = useAuthStore();

  const handleDemoLogin = (userType: 'diner' | 'owner') => {
    const demoUser = {
      id: userType === 'diner' ? 'demo-diner-123' : 'demo-owner-123',
      email: userType === 'diner' ? 'demo@diner.com' : 'demo@owner.com',
      fullName: userType === 'diner' ? 'Demo Diner' : 'Demo Owner',
      userType: userType,
      avatarUrl: 'https://i.pravatar.cc/100?img=10',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setUser(demoUser);
  };
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
              <View className="items-center mb-6">
                <Image
                  source={require('../../../../attached_assets/Profile Restaurent Booking_1760530725671.png')}
                  className="h-[60px]"
                  resizeMode="contain"
                  style={{ width: 150 }}
                />
              </View>

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

              {/* Demo Mode Section */}
              <View className="mt-8 pt-8 border-t border-white/10">
                <Text className="text-white text-lg font-semibold text-center mb-2">
                  Try Demo Mode
                </Text>
                <Text className="text-white/60 text-sm text-center mb-4">
                  Explore the app without signing up
                </Text>
                
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => handleDemoLogin('diner')}
                    className="flex-1 bg-[#8B5DFF]/20 py-4 rounded-xl border border-[#8B5DFF]"
                  >
                    <Text className="text-[#8B5DFF] text-base font-semibold text-center">
                      Demo as Diner
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDemoLogin('owner')}
                    className="flex-1 bg-[#8B5DFF]/20 py-4 rounded-xl border border-[#8B5DFF]"
                  >
                    <Text className="text-[#8B5DFF] text-base font-semibold text-center">
                      Demo as Owner
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
