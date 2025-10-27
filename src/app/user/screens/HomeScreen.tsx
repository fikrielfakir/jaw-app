import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ViewStyle, StatusBar, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal, MapPin, Home, Search, Heart, Calendar, User } from 'lucide-react-native';

const categories = [
  { 
    id: 'cafe', 
    name: 'Cafe', 
    image: require('../../../../attached_assets/Ellipse 38_1761524812701.png'),
    position: { top: 50, left: '50%', marginLeft: -65 }
  },
  { 
    id: 'outdoor-dining', 
    name: 'Outdoor Dining', 
    image: require('../../../../attached_assets/Ellipse 39_1761524812702.png'),
    position: { top: 170, left: '8%' }
  },
  { 
    id: 'celebration', 
    name: 'Celebration', 
    image: require('../../../../attached_assets/Ellipse 40_1761524812703.png'),
    position: { top: 170, right: '8%' }
  },
  { 
    id: 'bar', 
    name: 'Bar', 
    image: require('../../../../attached_assets/Ellipse 41_1761524812704.png'),
    position: { bottom: 140, left: '8%' }
  },
  { 
    id: 'lounge', 
    name: 'Lounge & Pub', 
    image: require('../../../../attached_assets/Ellipse 42_1761524812705.png'),
    position: { bottom: 20, right: '8%' }
  },
  { 
    id: 'dining', 
    name: 'Fine Dining', 
    image: require('../../../../attached_assets/Ellipse 43_1761524812705.png'),
    position: { bottom: 20, left: '50%', marginLeft: -65 }
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigation.navigate('Discover', { category: categoryId });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <LinearGradient
        colors={['#3D2854', '#4A3168', '#5A3A7C']}
        style={styles.gradient}
      >
        {/* Logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>שבת</Text>
        </View>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={18} color="#fff" />
            <Text style={styles.filterText}>Filter Distance</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationButton}>
            <MapPin size={16} color="#fff" />
            <Text style={styles.locationText}>Tanger, Morocco</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Choose Category</Text>

        {/* Categories Container */}
        <View style={styles.categoriesContainer}>
          <Animated.Image 
            source={require('../../../../attached_assets/Vector_1761523631033.png')}
            style={[
              styles.bottleDecoration,
              { transform: [{ rotate: spin }] }
            ]}
            resizeMode="contain"
          />
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                {
                  position: 'absolute',
                  ...category.position,
                } as ViewStyle,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <View style={[
                styles.categoryShadowWrapper,
                selectedCategory === category.id && styles.categoryShadowWrapperActive,
              ]}>
                <View style={styles.categoryImageWrapper}>
                  <Image 
                    source={category.image} 
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  logo: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    gap: 7,
  },
  filterText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  categoriesContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottleDecoration: {
    position: 'absolute',
    width: 70,
    height: 360,
    top: '14%',
    left: '50%',
    marginLeft: -35,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryShadowWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  categoryShadowWrapperActive: {
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  categoryImageWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
});
