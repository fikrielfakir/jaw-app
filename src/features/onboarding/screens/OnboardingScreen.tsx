import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUIStore } from '@/store/uiStore';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  id: number;
  backgroundImage: any;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    backgroundImage: require('../../../../assets/onboarding-1.png'),
  },
  {
    id: 2,
    backgroundImage: require('../../../../assets/onboarding-2.png'),
  },
  {
    id: 3,
    backgroundImage: require('../../../../assets/onboarding-3.png'),
  },
  {
    id: 4,
    backgroundImage: require('../../../../assets/onboarding-4.png'),
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setOnboardingCompleted } = useUIStore();

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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Full screen background image */}
      <ImageBackground
        source={currentItem.backgroundImage}
        style={{ 
          flex: 1,
          width: width,
          height: height,
        }}
        resizeMode="cover"
      >
        {/* Overlay for interactive elements */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header with Skip button */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 24,
          }}>
            {/* Skip Button */}
            <TouchableOpacity onPress={handleSkip}>
              <Text style={{
                fontSize: 16,
                color: 'white',
                fontFamily: 'Inter',
                opacity: 0.9,
              }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          {/* Spacer to push bottom content down */}
          <View style={{ flex: 1 }} />

          {/* Bottom Section with pagination and next button */}
          <View style={{
            paddingHorizontal: 24,
            paddingBottom: 50,
          }}>
            {/* Pagination Dots */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 32,
            }}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.4)',
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: '#8B5DFF',
                paddingVertical: 18,
                borderRadius: 12,
                shadowColor: '#8B5DFF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
                fontFamily: 'Inter',
              }}>
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};