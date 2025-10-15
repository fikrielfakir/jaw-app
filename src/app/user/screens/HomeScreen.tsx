import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SlidersHorizontal, MapPin } from 'lucide-react-native';

const categories = [
  { id: 'cafe', name: 'Cafe', image: '☕', position: { top: 60, left: '42%' } as const },
  { id: 'morocco', name: 'Morocco Way', image: '🍽️', position: { top: 160, left: '8%' } as const },
  { id: 'fine-dining', name: 'Fine Dining', image: '🍷', position: { top: 160, right: '8%' } as const },
  { id: 'dance', name: 'Dance', image: '💃', position: { bottom: 160, left: '8%' } as const },
  { id: 'lounge', name: 'Loung & Pub', image: '🍺', position: { bottom: 160, right: '8%' } as const },
  { id: 'chiringuito', name: 'Chiringuito', image: '🏖️', position: { bottom: 60, left: '35%' } as const },
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
        colors={['#6B46C1', '#553C9A', '#3D2C6B']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>שבת</Text>
        </View>

        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color="#fff" />
            <Text style={styles.filterText}>Filter Distance</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationButton}>
            <MapPin size={16} color="#fff" />
            <Text style={styles.locationText}>Tanger, Morocco</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Choose Category</Text>

        <View style={styles.categoriesContainer}>
          <View style={styles.bottleDecoration} />
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                {
                  position: 'absolute',
                  ...category.position,
                },
                selectedCategory === category.id && styles.categorySelected,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <View style={styles.categoryCircle}>
                <Text style={styles.categoryEmoji}>{category.image}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  categoriesContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 20,
  },
  bottleDecoration: {
    position: 'absolute',
    width: 60,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    top: '20%',
    left: '45%',
    transform: [{ translateX: -30 }],
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'transparent',
    shadowColor: '#8B5DFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  categorySelected: {
    transform: [{ scale: 1.1 }],
  },
  categoryEmoji: {
    fontSize: 48,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
