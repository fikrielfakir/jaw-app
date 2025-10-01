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
    title: 'Discover the perfect vibe for every occasion',
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
    title: 'Share your moments with reviews, photos, and videos',
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
    title: 'Easily grow and promote all your businesses',
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
    title: 'Book a table and create lasting memories',
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
    <View style={{ flex: 1, backgroundColor: '#2D2D4A' }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Dark Purple/Navy Background - matches design #2D2D4A to #3A3A5A gradient */}
      <LinearGradient
        colors={['#2D2D4A', '#3A3A5A', '#2D2D4A']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header with Logo and Skip Button */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 24,
          }}>
            {/* JAW Logo - centered */}
            <View style={{ 
              position: 'absolute',
              left: 0,
              right: 0,
              alignItems: 'center',
              zIndex: 0,
            }}>
              <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: 2,
                fontStyle: 'italic',
              }}>
                JAW
              </Text>
            </View>
            
            {/* Skip Button - positioned at top right (x: 311px from design) */}
            <View style={{ flex: 1 }} />
            <TouchableOpacity 
              onPress={handleSkip}
              style={{ 
                zIndex: 1,
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{
                fontSize: 17,
                color: '#FFFFFF',
                fontWeight: '400',
              }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title - positioned at y: 450px from design (approximated with flex) */}
          <View style={{
            paddingHorizontal: 37.5, // (375 - 300) / 2 for max-width: 300px centered
            marginTop: height * 0.15, // Position title in upper-middle area
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: '600',
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 36,
              maxWidth: 300,
              alignSelf: 'center',
            }}>
              {currentItem.title}
            </Text>
          </View>

          {/* Illustration Container - centered */}
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
            marginTop: -20,
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

          {/* Bottom Section - positioned at bottom */}
          <View style={{
            paddingHorizontal: 32,
            paddingBottom: 40,
          }}>
            {/* Pagination Dots - y: 780px from design (near bottom) */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentIndex ? '#FFFFFF' : 'transparent',
                    borderWidth: index === currentIndex ? 0 : 1,
                    borderColor: index === currentIndex ? 'transparent' : 'rgba(255, 255, 255, 0.5)',
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            {/* Next Button - positioned at bottom (y: 734px from design) */}
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
                color: '#FFFFFF',
                fontSize: 17,
                fontWeight: '600',
                textAlign: 'center',
              }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
