import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal, MapPin, Home, Search, Heart, Calendar, User } from 'lucide-react-native';

const categories = [
  { 
    id: 'cafe', 
    name: 'Cafe', 
    image: require('../../../../attached_assets/stock_images/coffee_cup_on_table__abd66cb7.jpg'),
    position: { top: 50, left: '42%' },
    hasGlow: true
  },
  { 
    id: 'morocco', 
    name: 'Morocco Way', 
    image: require('../../../../attached_assets/stock_images/moroccan_food_tagine_0769b13f.jpg'),
    position: { top: 180, left: '12%' }
  },
  { 
    id: 'fine-dining', 
    name: 'Fine Dining', 
    image: require('../../../../attached_assets/stock_images/fine_dining_restaura_e3e81472.jpg'),
    position: { top: 180, right: '12%' }
  },
  { 
    id: 'dance', 
    name: 'Dance', 
    image: require('../../../../attached_assets/stock_images/dancing_nightclub_pe_6f2cc80d.jpg'),
    position: { bottom: 180, left: '12%' }
  },
  { 
    id: 'lounge', 
    name: 'Loung & Pub', 
    image: require('../../../../attached_assets/stock_images/pub_bar_interior_bot_d7aafd62.jpg'),
    position: { bottom: 60, right: '12%' }
  },
  { 
    id: 'chiringuito', 
    name: 'Chiringuito', 
    image: require('../../../../attached_assets/stock_images/beach_bar_chiringuit_ca707799.jpg'),
    position: { bottom: 60, left: '35%' }
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
      <LinearGradient
        colors={['#4A3168', '#3D2854', '#2D1F40']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>שבת</Text>
        </View>

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

        <Text style={styles.title}>Choose Category</Text>

        <View style={styles.categoriesContainer}>
          <LinearGradient
            colors={['rgba(138, 93, 255, 0.3)', 'rgba(138, 93, 255, 0.1)', 'transparent']}
            style={styles.bottleDecoration}
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
              <View style={[
                styles.categoryCircle,
                category.hasGlow && styles.categoryGlow
              ]}>
                <Image 
                  source={category.image} 
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Home size={24} color="#fff" fill="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Search size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Heart size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Calendar size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <User size={24} color="#fff" />
          </TouchableOpacity>
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
    marginBottom: 25,
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
    marginBottom: 35,
  },
  categoriesContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 80,
  },
  bottleDecoration: {
    position: 'absolute',
    width: 65,
    height: 320,
    borderRadius: 32,
    top: '18%',
    left: '50%',
    transform: [{ translateX: -32.5 }],
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryCircle: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  categoryGlow: {
    shadowColor: '#8B5DFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 12,
  },
  categorySelected: {
    transform: [{ scale: 1.08 }],
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingBottom: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    padding: 8,
  },
});
