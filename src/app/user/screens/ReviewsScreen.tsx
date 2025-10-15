import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Star, Send } from 'lucide-react-native';
import { Review } from '../../../types/models';

const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    rating: 2,
    comment: 'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page 😍',
    createdAt: '4d',
    user: {
      id: '1',
      email: 'mohamed@example.com',
      fullName: 'Mohamed Johnson',
      userType: 'diner',
      avatarUrl: 'https://i.pravatar.cc/100?img=1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '2',
    userId: '2',
    restaurantId: '1',
    rating: 2,
    comment: 'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page 😍',
    createdAt: '1w',
    user: {
      id: '2',
      email: 'user@example.com',
      fullName: 'Mohamed Johnson',
      userType: 'diner',
      avatarUrl: 'https://i.pravatar.cc/100?img=2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: '3',
    userId: '3',
    restaurantId: '1',
    rating: 2,
    comment: 'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page 😍',
    createdAt: '1m',
    user: {
      id: '3',
      email: 'user3@example.com',
      fullName: 'Mohamed Johnson',
      userType: 'diner',
      avatarUrl: 'https://i.pravatar.cc/100?img=3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

export const ReviewsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const renderStars = (currentRating: number, onPress?: (star: number) => void) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => onPress?.(i)}
          disabled={!onPress}
        >
          <Star
            size={onPress ? 32 : 16}
            color={i <= currentRating ? '#FFD700' : '#666'}
            fill={i <= currentRating ? '#FFD700' : 'transparent'}
          />
        </TouchableOpacity>
      );
    }
    
    return stars;
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <Image source={{ uri: item.user?.avatarUrl }} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item.user?.fullName}</Text>
          <Text style={styles.timeAgo}>{item.createdAt}</Text>
        </View>
        <Text style={styles.reviewText}>{item.comment}</Text>
        <View style={styles.reviewRating}>
          {renderStars(item.rating)}
        </View>
      </View>
    </View>
  );

  const handleSubmitReview = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
      </View>

      <FlatList
        data={mockReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        ListHeaderComponent={null}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.rateSection}>
        <Text style={styles.rateTitle}>Rate your experience</Text>
        <View style={styles.starsContainer}>
          {renderStars(rating, setRating)}
        </View>
        
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=10' }}
            style={styles.userAvatar}
          />
          <TextInput
            style={styles.input}
            placeholder="Share your thoughts..."
            placeholderTextColor="#666"
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmitReview}
          >
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 300,
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timeAgo: {
    fontSize: 14,
    color: '#666',
  },
  reviewText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 4,
  },
  rateSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    maxHeight: 80,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
