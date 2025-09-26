import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useUIStore } from '@/store/uiStore';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  id: number;
  title: string;
  image: any;
  containerStyle: any;
}

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    title: 'Discover the perfect vibe\nfor every occasion',
    image: require('../../../../assets/illustration-dining.png'),
    containerStyle: {
      backgroundColor: '#8B5DFF',
      borderRadius: 150,
      width: width * 0.85,
      height: height * 0.4,
    },
  },
  {
    id: 2,
    title: 'Share your moments with\nreviews, photos, and videos',
    image: require('../../../../assets/illustration-reviews.png'),
    containerStyle: {
      backgroundColor: '#F5E6D3',
      borderRadius: 120,
      width: width * 0.8,
      height: height * 0.35,
    },
  },
  {
    id: 3,
    title: 'Easily grow and promote all\nyour businesses',
    image: require('../../../../assets/illustration-business.png'),
    containerStyle: {
      backgroundColor: '#F5E6D3',
      borderRadius: 100,
      width: width * 0.75,
      height: height * 0.32,
    },
  },
  {
    id: 4,
    title: 'Book a table and create\nlasting memories',
    image: require('../../../../assets/illustration-booking.png'),
    containerStyle: {
      backgroundColor: '#B8E6FF',
      borderRadius: 150,
      width: width * 0.8,
      height: width * 0.8,
    },
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
      
      {/* Dark Purple Gradient Background */}
      <LinearGradient
        colors={['#4A4A6A', '#5B5B7A', '#4A4A6A']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 24,
          }}>
            {/* JAW Logo */}
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Inter',
                letterSpacing: 3,
                fontStyle: 'italic',
              }}>
                JAW
              </Text>
            </View>
            
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

          {/* Title */}
          <View style={{
            paddingHorizontal: 24,
            marginBottom: 40,
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              lineHeight: 36,
              fontFamily: 'Inter',
            }}>
              {currentItem.title}
            </Text>
          </View>

          {/* Illustration Container */}
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}>
            <View style={[
              currentItem.containerStyle,
              {
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }
            ]}>
              <Image
                source={currentItem.image}
                style={{
                  width: '90%',
                  height: '90%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>

          {/* Bottom Section */}
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
      </LinearGradient>
    </View>
  );
};