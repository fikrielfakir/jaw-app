import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bell, Heart, MessageCircle, Plus, Video, Image as ImageIcon, Pin } from 'lucide-react-native';
import { Restaurant } from '../../../types/models';

interface Chef {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  chef: Chef;
  restaurant: Restaurant;
  likes: number;
  comments: number;
  rating: number;
}

const mockChefs: Chef[] = [
  { id: '1', name: 'Mohamed', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Janes', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Moro', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Khaoula', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const mockPosts: Post[] = [
  {
    id: '1',
    chef: mockChefs[0],
    restaurant: {
      id: '1',
      ownerId: '1',
      name: 'Restaurant name',
      description: '',
      cuisineTypes: [],
      address: '',
      city: 'Sophie, Tanger',
      phone: '',
      email: '',
      rating: 4.9,
      reviewCount: 45,
      priceRange: 3,
      images: [],
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300',
      amenities: [],
      businessHours: {},
      isVerified: true,
      createdAt: new Date().toISOString(),
      location: { latitude: 0, longitude: 0 },
    },
    likes: 2000,
    comments: 23,
    rating: 4.9,
  },
];

export const FeedScreen = () => {
  const navigation = useNavigation<any>();
  const [showActions, setShowActions] = useState(false);

  const renderChefItem = ({ item }: { item: Chef }) => (
    <TouchableOpacity style={styles.chefItem}>
      <Image source={{ uri: item.avatar }} style={styles.chefAvatar} />
      <Text style={styles.chefName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.restaurant.coverImage }} style={styles.postImage} />
      
      <View style={styles.postContent}>
        <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
        <Text style={styles.restaurantLocation}>{item.restaurant.city}</Text>
        
        <View style={styles.postStats}>
          <View style={styles.statItem}>
            <Heart size={18} color="#fff" />
            <Text style={styles.statText}>{item.likes >= 1000 ? `${item.likes / 1000}k` : item.likes}</Text>
          </View>
          
          <View style={styles.statItem}>
            <MessageCircle size={18} color="#fff" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
          
          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ {item.restaurant.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=10' }}
            style={styles.profileAvatar}
          />
        </TouchableOpacity>
        
        <Text style={styles.logo}>שבת</Text>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#fff" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Best Chef</Text>
        
        <FlatList
          horizontal
          data={mockChefs}
          keyExtractor={(item) => item.id}
          renderItem={renderChefItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chefsContainer}
        />

        <FlatList
          data={mockPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          scrollEnabled={false}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowActions(!showActions)}
      >
        <Plus size={28} color="#fff" />
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actionsMenu}>
          <TouchableOpacity style={styles.actionItem}>
            <Video size={20} color="#fff" />
            <Text style={styles.actionText}>Start Live</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <ImageIcon size={20} color="#fff" />
            <Text style={styles.actionText}>Add Story</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionItem, styles.actionItemPrimary]}>
            <Pin size={20} color="#fff" />
            <Text style={styles.actionText}>Add PIN</Text>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#8B5DFF',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  chefsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  chefItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  chefAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#8B5DFF',
  },
  chefName: {
    color: '#fff',
    fontSize: 12,
  },
  postCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  postImage: {
    width: '100%',
    height: 220,
  },
  postContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  restaurantLocation: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
  },
  rating: {
    marginLeft: 'auto',
    backgroundColor: '#8B5DFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5DFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  actionsMenu: {
    position: 'absolute',
    bottom: 160,
    alignSelf: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 8,
    minWidth: 200,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  actionItemPrimary: {
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
});
