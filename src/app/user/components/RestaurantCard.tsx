import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { Restaurant } from '../../../types/models';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  onFavoritePress: () => void;
  isFavorite?: boolean;
}

export const RestaurantCard = ({ 
  restaurant, 
  onPress, 
  onFavoritePress,
  isFavorite = false 
}: RestaurantCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i < fullStars ? '#FFD700' : '#666'}
          fill={i < fullStars ? '#FFD700' : 'transparent'}
        />
      );
    }
    
    return stars;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: restaurant.coverImage || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.location}>{restaurant.city}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStars(restaurant.rating)}
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={onFavoritePress}
      >
        <Heart
          size={24}
          color={isFavorite ? '#8B5DFF' : '#fff'}
          fill={isFavorite ? '#8B5DFF' : 'transparent'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 93, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 160,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 93, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
