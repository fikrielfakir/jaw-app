import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface RegisterRestaurantScreenProps {
  navigation?: any;
  onBackToWelcome?: () => void;
}

export const RegisterRestaurantScreen: React.FC<RegisterRestaurantScreenProps> = ({ navigation, onBackToWelcome }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Submitting restaurant registration...');
  };

  const isSmallScreen = SCREEN_WIDTH < 375;
  const horizontalPadding = SCREEN_WIDTH * 0.05;
  const maxWidth = Math.min(SCREEN_WIDTH - (horizontalPadding * 2), 500);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['rgba(69, 48, 99, 0.86)', '#000000']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              paddingHorizontal: horizontalPadding,
              paddingTop: Platform.OS === 'ios' ? 8 : 16,
              paddingBottom: 32,
              alignItems: 'center',
            }}
          >
            <View style={{ width: '100%', maxWidth }}>
              {/* Header with Back Button */}
              <View className="flex-row items-center mb-6">
                <TouchableOpacity 
                  onPress={() => {
                    if (onBackToWelcome) {
                      onBackToWelcome();
                    } else {
                      navigation?.goBack();
                    }
                  }}
                  className="p-2 -ml-2"
                >
                  <Text className="text-white text-2xl">←</Text>
                </TouchableOpacity>
              </View>

              {/* JAW Logo */}
              <Text 
                className="font-bold text-white text-center tracking-[2px] italic"
                style={{ fontSize: isSmallScreen ? 32 : 40, marginBottom: 20 }}
              >
                JAW
              </Text>

              {/* Title */}
              <Text 
                className="font-bold text-white mb-2"
                style={{ fontSize: isSmallScreen ? 24 : 28 }}
              >
                Register Restaurant
              </Text>

              {/* Subtitle */}
              <Text 
                className="text-white/60 mb-6"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                Enter your restaurant details to submit a request
              </Text>

              {/* Restaurant Name */}
              <Text 
                className="text-white mb-2"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                Restaurant Name
              </Text>
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                placeholder="eg Romanes"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white mb-4"
                style={{ 
                  paddingHorizontal: 16, 
                  paddingVertical: isSmallScreen ? 12 : 16,
                  fontSize: isSmallScreen ? 14 : 15,
                }}
              />

              {/* Email and Phone in a row */}
              <View className="flex-row mb-4" style={{ gap: 12 }}>
                <View className="flex-1">
                  <Text 
                    className="text-white mb-2"
                    style={{ fontSize: isSmallScreen ? 14 : 15 }}
                  >
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemple@gmail.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-white/10 border border-white/20 rounded-xl text-white"
                    style={{ 
                      paddingHorizontal: 16, 
                      paddingVertical: isSmallScreen ? 12 : 16,
                      fontSize: isSmallScreen ? 14 : 15,
                    }}
                  />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-white mb-2"
                    style={{ fontSize: isSmallScreen ? 14 : 15 }}
                  >
                    Phone
                  </Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+21261234567"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="phone-pad"
                    className="bg-white/10 border border-white/20 rounded-xl text-white"
                    style={{ 
                      paddingHorizontal: 16, 
                      paddingVertical: isSmallScreen ? 12 : 16,
                      fontSize: isSmallScreen ? 14 : 15,
                    }}
                  />
                </View>
              </View>

              {/* Address */}
              <Text 
                className="text-white mb-2"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                Address
              </Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="eg 123 Main st, City"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white mb-4"
                style={{ 
                  paddingHorizontal: 16, 
                  paddingVertical: isSmallScreen ? 12 : 16,
                  fontSize: isSmallScreen ? 14 : 15,
                }}
              />

              {/* Type */}
              <Text 
                className="text-white mb-2"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                Type
              </Text>
              <View 
                className="bg-white/10 border border-white/20 rounded-xl mb-4 flex-row justify-between items-center"
                style={{ 
                  paddingHorizontal: 16, 
                  paddingVertical: isSmallScreen ? 12 : 16,
                }}
              >
                <Text 
                  className="text-white/40"
                  style={{ fontSize: isSmallScreen ? 14 : 15 }}
                >
                  {type || 'Select Type'}
                </Text>
                <Text 
                  className="text-white/40"
                  style={{ fontSize: isSmallScreen ? 14 : 15 }}
                >
                  ▼
                </Text>
              </View>

              {/* Cuisine Type */}
              <Text 
                className="text-white mb-2"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                Cuisine type
              </Text>
              <TextInput
                value={cuisineType}
                onChangeText={setCuisineType}
                placeholder="eg Italian, Mexican"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white mb-4"
                style={{ 
                  paddingHorizontal: 16, 
                  paddingVertical: isSmallScreen ? 12 : 16,
                  fontSize: isSmallScreen ? 14 : 15,
                }}
              />

              {/* About Your Business */}
              <Text 
                className="text-white mb-2"
                style={{ fontSize: isSmallScreen ? 14 : 15 }}
              >
                About your business
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description your restaurant"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-white/10 border border-white/20 rounded-xl text-white mb-6"
                style={{ 
                  paddingHorizontal: 16, 
                  paddingVertical: 16,
                  fontSize: isSmallScreen ? 14 : 15,
                  minHeight: isSmallScreen ? 100 : 120,
                }}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#8B5DFF] rounded-xl"
                style={{ paddingVertical: isSmallScreen ? 16 : 18 }}
              >
                <Text 
                  className="text-white font-semibold text-center"
                  style={{ fontSize: isSmallScreen ? 16 : 17 }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
