import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ViewStyle, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal, MapPin, Home, Search, Heart, Calendar, User } from 'lucide-react-native';

const categories = [
  { 
    id: 'cafe', 
    name: 'Cafe', 
    image: require('../../../../attached_assets/Group 160_1761523631030.png'),
    position: { top: 50, left: '50%', marginLeft: -65 }
  },
  { 
    id: 'morocco', 
    name: 'Morocco Way', 
    image: require('../../../../attached_assets/Group 165_1761523631033.png'),
    position: { top: 170, left: '8%' }
  },
  { 
    id: 'fine-dining', 
    name: 'Fine Dining', 
    image: require('../../../../attached_assets/Group 161_1761523631031.png'),
    position: { top: 170, right: '8%' }
  },
  { 
    id: 'dance', 
    name: 'Dance', 
    image: require('../../../../attached_assets/Group 164_1761523631032.png'),
    position: { bottom: 140, left: '8%' }
  },
  { 
    id: 'lounge', 
    name: 'Loung & Pub', 
    image: require('../../../../attached_assets/Group 162_1761523631031.png'),
    position: { bottom: 20, right: '8%' }
  },
  { 
    id: 'chiringuito', 
    name: 'Chiringuito', 
    image: require('../../../../attached_assets/Group 163_1761523631032.png'),
    position: { bottom: 20, left: '50%', marginLeft: -65 }
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
          <Image 
            source={require('../../../../attached_assets/Vector_1761523631033.png')}
            style={styles.bottleDecoration}
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
                selectedCategory === category.id && styles.categorySelected,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Image 
                source={category.image} 
                style={styles.categoryImage}
                resizeMode="contain"
              />
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
  categorySelected: {
    transform: [{ scale: 1.05 }],
  },
  categoryImage: {
    width: 130,
    height: 130,
  },
});
