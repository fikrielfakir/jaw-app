import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Star, MapPin, Phone, Globe, Share2 } from 'lucide-react-native';
import { Restaurant } from '../../../types/models';

interface MenuItem {
  id: string;
  name: string;
  prepTime: number;
  rating: number;
  price: number;
  image: string;
}

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Grilles Ocopus',
    prepTime: 30,
    rating: 4.7,
    price: 25,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=150',
  },
  {
    id: '2',
    name: 'Grilles Ocopus',
    prepTime: 30,
    rating: 4.7,
    price: 25,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150',
  },
  {
    id: '3',
    name: 'Grilles Ocopus',
    prepTime: 30,
    rating: 4.7,
    price: 25,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150',
  },
  {
    id: '4',
    name: 'Grilles Ocopus',
    prepTime: 30,
    rating: 4.7,
    price: 25,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=150',
  },
];

const venueImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&h=200',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=200',
];

export const VenueDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const restaurant: Restaurant = route.params?.restaurant;
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'bookings'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <View style={styles.menuMeta}>
          <Text style={styles.menuTime}>⏱ {item.prepTime} min</Text>
          <Text style={styles.menuRating}>⭐ {item.rating}</Text>
        </View>
        <Text style={styles.menuPrice}>${item.price}</Text>
      </View>
    </View>
  );

  const openBookingModal = () => {
    navigation.navigate('Booking', { restaurant });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: restaurant?.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400' }}
            style={styles.coverImage}
          />
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={20} color="#fff" />
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <Image
              source={{ uri: restaurant?.coverImage }}
              style={styles.logo}
            />
            <View style={styles.headerText}>
              <Text style={styles.restaurantName}>{restaurant?.name || 'Elfa Bistro'}</Text>
              <Text style={styles.restaurantType}>Restaurant</Text>
              <View style={styles.ratingRow}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Star size={16} color="#666" />
                <Star size={16} color="#666" />
                <Star size={16} color="#666" />
                <Text style={styles.ratingText}>{restaurant?.rating || '3.5'} ({restaurant?.reviewCount || 2})</Text>
              </View>
            </View>
          </View>

          <Text style={styles.address}>123 Gourmet Street,</Text>
          <Text style={styles.city}>Wazmize City</Text>

          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>
            {restaurant?.description || 'Modern fusion cuisine with local ingredients'}
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Text style={styles.favoriteButtonText}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton} onPress={openBookingModal}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'menu' && styles.tabActive]}
            onPress={() => setActiveTab('menu')}
          >
            <Text style={[styles.tabText, activeTab === 'menu' && styles.tabTextActive]}>
              Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookings' && styles.tabActive]}
            onPress={() => setActiveTab('bookings')}
          >
            <Text style={[styles.tabText, activeTab === 'bookings' && styles.tabTextActive]}>
              Bookings
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'overview' && (
          <View style={styles.overviewContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
              {venueImages.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapText}>Map View</Text>
            </View>

            <Text style={styles.sectionTitle}>Cuisine</Text>
            <View style={styles.cuisineContainer}>
              <View style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>Moroccan</Text>
              </View>
              <View style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>Western</Text>
              </View>
              <View style={styles.cuisineTag}>
                <Text style={styles.cuisineText}>Indonesian</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity style={styles.contactItem}>
              <Phone size={20} color="#8B5DFF" />
              <Text style={styles.contactText}>+212 6123456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Globe size={20} color="#8B5DFF" />
              <Text style={styles.contactText}>Visit Website</Text>
            </TouchableOpacity>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#8B5DFF" />
              <Text style={styles.contactText}>123 Gourmet Street</Text>
            </View>
          </View>
        )}

        {activeTab === 'menu' && (
          <View style={styles.menuContent}>
            <FlatList
              data={mockMenuItems}
              keyExtractor={(item) => item.id}
              renderItem={renderMenuItem}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.menuRow}
            />
          </View>
        )}

        {activeTab === 'bookings' && (
          <View style={styles.bookingsContent}>
            <Text style={styles.emptyText}>No bookings yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  imageContainer: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  shareButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 93, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  shareText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  restaurantType: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  address: {
    fontSize: 14,
    color: '#999',
  },
  city: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2a2a3e',
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5DFF',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5DFF',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#8B5DFF',
    fontWeight: '600',
  },
  overviewContent: {
    padding: 20,
  },
  galleryScroll: {
    marginBottom: 24,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  mapText: {
    color: '#666',
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  cuisineTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#8B5DFF',
  },
  cuisineText: {
    color: '#fff',
    fontSize: 14,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
  menuContent: {
    padding: 12,
  },
  menuRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  menuItem: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  menuImage: {
    width: '100%',
    height: 120,
  },
  menuInfo: {
    padding: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  menuMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  menuTime: {
    fontSize: 12,
    color: '#999',
  },
  menuRating: {
    fontSize: 12,
    color: '#999',
  },
  menuPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B5DFF',
  },
  bookingsContent: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});
