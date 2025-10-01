import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, useWindowDimensions, DimensionValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useUIStore } from '@/store/uiStore';

interface OnboardingData {
  id: number;
  title: string;
  image: any;
  containerStyle: {
    borderRadius: number;
    width: DimensionValue;
    height: DimensionValue;
  };
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'Discover the perfect vibe for every occasion',
    image: require('../../../../assets/illustration-dining.png'),
    containerStyle: {
      borderRadius: 150,
      width: '85%',
      height: '40%',
    },
  },
  {
    id: 2,
    title: 'Share your moments with reviews, photos, and videos',
    image: require('../../../../assets/illustration-reviews.png'),
    containerStyle: {
      borderRadius: 120,
      width: '80%',
      height: '35%',
    },
  },
  {
    id: 3,
    title: 'Easily grow and promote all your businesses',
    image: require('../../../../assets/illustration-business.png'),
    containerStyle: {
      borderRadius: 100,
      width: '75%',
      height: '32%',
    },
  },
  {
    id: 4,
    title: 'Book a table and create lasting memories',
    image: require('../../../../assets/illustration-booking.png'),
    containerStyle: {
      borderRadius: 150,
      width: '80%',
      height: '55%',
    },
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setOnboardingCompleted } = useUIStore();
  const { height } = useWindowDimensions();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setOnboardingCompleted(true);
    onComplete();
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Dark Purple to Black Gradient */}
      <LinearGradient
        colors={['rgba(69, 48, 99, 0.86)', '#000000']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          {/* Header with Logo and Skip Button */}
          <View className="flex-row justify-between items-center px-6 pt-2 pb-6">
            {/* JAW Logo - centered */}
            <View className="absolute left-0 right-0 items-center z-0">
              <Text className="text-[40px] font-bold text-white tracking-[2px] italic">
                JAW
              </Text>
            </View>
            
            {/* Skip Button - positioned at top right */}
            <View className="flex-1" />
            <TouchableOpacity 
              onPress={handleSkip}
              className="z-10 py-2 px-1"
            >
              <Text className="text-[17px] text-white font-normal">Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Title - positioned in upper-middle area */}
          <View 
            className="px-[37.5px]"
            style={{ marginTop: height * 0.15 }}
          >
            <Text className="text-[28px] font-semibold text-white text-center leading-9 max-w-[300px] self-center">
              {currentItem.title}
            </Text>
          </View>

          {/* Illustration Container - centered */}
          <View className="flex-1 justify-center items-center px-6 -mt-5">
            <View 
              className="justify-center items-center"
              style={currentItem.containerStyle}
            >
              <Image
                source={currentItem.image}
                className="w-[90%] h-[90%]"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Bottom Section */}
          <View className="px-8 pb-10">
            {/* Pagination Dots */}
            <View className="flex-row justify-center mb-6">
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentIndex
                      ? 'bg-white'
                      : 'bg-transparent border border-white/50'
                  }`}
                />
              ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              className="bg-[#8B5DFF] py-[18px] rounded-xl shadow-lg shadow-[#8B5DFF]/30"
            >
              <Text className="text-white text-[17px] font-semibold text-center">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
