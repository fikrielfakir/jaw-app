import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Platform, useWindowDimensions, DimensionValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useUIStore } from '@/store/uiStore';

interface OnboardingData {
  id: number;
  title: string;
  image: any;
  containerStyle: {
    backgroundColor: string;
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
      backgroundColor: '#8B5DFF',
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
      backgroundColor: '#F5E6D3',
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
      backgroundColor: '#F5E6D3',
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
      backgroundColor: '#B8E6FF',
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Dark Purple/Navy Background - matches design #2D2D4A to #3A3A5A gradient */}
      <LinearGradient
        colors={['#2D2D4A', '#3A3A5A', '#2D2D4A']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header with Logo and Skip Button */}
          <View style={styles.header}>
            {/* JAW Logo - centered */}
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>JAW</Text>
            </View>
            
            {/* Skip Button - positioned at top right */}
            <View style={styles.spacer} />
            <TouchableOpacity 
              onPress={handleSkip}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Title - positioned in upper-middle area */}
          <View style={[styles.titleContainer, { marginTop: height * 0.15 }]}>
            <Text style={styles.title}>
              {currentItem.title}
            </Text>
          </View>

          {/* Illustration Container - centered */}
          <View style={styles.illustrationWrapper}>
            <View style={[
              styles.illustrationContainer,
              currentItem.containerStyle,
              Platform.select({
                web: {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                },
                default: {
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 8,
                },
              }),
            ]}>
              <Image
                source={currentItem.image}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Pagination Dots */}
            <View style={styles.dotsContainer}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={[
                styles.nextButton,
                Platform.select({
                  web: {
                    boxShadow: '0px 8px 16px rgba(139, 93, 255, 0.3)',
                  },
                  default: {
                    shadowColor: '#8B5DFF',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                  },
                }),
              ]}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D4A',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  spacer: {
    flex: 1,
  },
  skipButton: {
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  skipText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  titleContainer: {
    paddingHorizontal: 37.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    maxWidth: 300,
    alignSelf: 'center',
  },
  illustrationWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -20,
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '90%',
    height: '90%',
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  nextButton: {
    backgroundColor: '#8B5DFF',
    paddingVertical: 18,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
