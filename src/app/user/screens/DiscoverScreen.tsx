import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Search, ScanBarcode } from 'lucide-react-native';
import { Restaurant } from '../../../types/models';
import { RestaurantCard } from '../components/RestaurantCard';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Restaurant name',
    description: 'Modern fusion cuisine with local ingredients',
    cuisineTypes: ['Modern', 'Fusion'],
    address: '123 Gourmet Street',
    city: 'Sophie, Tanger',
    phone: '+212 612345678',
    email: 'contact@restaurant.com',
    rating: 2,
    reviewCount: 45,
    priceRange: 3,
    images: [],
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200',
    amenities: [],
    businessHours: {},
    isVerified: true,
    createdAt: new Date().toISOString(),
    location: { latitude: 35.7595, longitude: -5.8340 },
  },
  {
    id: '2',
    ownerId: '1',
    name: 'Restaurant name',
    description: 'Traditional Moroccan cuisine',
    cuisineTypes: ['Moroccan'],
    address: '456 Heritage Road',
    city: 'Sophie, Tanger',
    phone: '+212 612345679',
    email: 'contact@restaurant2.com',
    rating: 3,
    reviewCount: 32,
    priceRange: 2,
    images: [],
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=200',
    amenities: [],
    businessHours: {},
    isVerified: true,
    createdAt: new Date().toISOString(),
    location: { latitude: 35.7595, longitude: -5.8340 },
  },
];

const categories = ['cafe', 'Food', 'Morocco Way', 'More'];

export const DiscoverScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route.params?.category || 'cafe');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(restaurantId)) {
        newFavorites.delete(restaurantId);
      } else {
        newFavorites.add(restaurantId);
      }
      return newFavorites;
    });
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    navigation.navigate('VenueDetails', { restaurant });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={searchText || "Cafe..."}
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.scanButton}>
          <ScanBarcode size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={mockRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => handleRestaurantPress(item)}
            onFavoritePress={() => toggleFavorite(item.id)}
            isFavorite={favorites.has(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  scanButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScroll: {
    maxHeight: 60,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#8B5DFF',
  },
  categoryChipText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#fff',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});
