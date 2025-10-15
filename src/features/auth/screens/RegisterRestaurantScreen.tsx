import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            {/* Header with Back Button */}
            <View className="flex-row items-center pt-3 pb-3 px-5">
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
            <View className="items-center mb-4">
              <Image
                source={require('../../../../attached_assets/Profile Restaurent Booking_1760530725671.png')}
                className="h-[40px]"
                resizeMode="contain"
                style={{ width: 100 }}
              />
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-white text-center mb-2 px-5">
              Register Restaurant
            </Text>

            {/* Subtitle */}
            <Text className="text-sm text-white/70 text-center mb-6 px-5">
              Enter your restaurant details to submit a request
            </Text>

            {/* Scrollable Form */}
            <ScrollView 
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Restaurant Name */}
              <Text className="text-white text-sm mb-2">
                Restaurant Name
              </Text>
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                placeholder="eg Romanes"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3 mb-4"
                style={{ fontSize: 15 }}
              />

              {/* Email and Phone Row */}
              <View className="flex-row mb-4" style={{ gap: 12 }}>
                <View className="flex-1">
                  <Text className="text-white text-sm mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemple@gmail.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3"
                    style={{ fontSize: 15 }}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-sm mb-2">Phone</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+21261234567"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="phone-pad"
                    className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3"
                    style={{ fontSize: 15 }}
                  />
                </View>
              </View>

              {/* Address */}
              <Text className="text-white text-sm mb-2">
                Address
              </Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="eg 123 Main st, City"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3 mb-4"
                style={{ fontSize: 15 }}
              />

              {/* Type Dropdown */}
              <Text className="text-white text-sm mb-2">
                Type
              </Text>
              <TouchableOpacity 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center"
              >
                <Text className="text-white/40" style={{ fontSize: 15 }}>
                  {type || 'Select Type'}
                </Text>
                <Text className="text-white/40" style={{ fontSize: 14 }}>▼</Text>
              </TouchableOpacity>

              {/* Cuisine Type */}
              <Text className="text-white text-sm mb-2">
                Cuisine type
              </Text>
              <TextInput
                value={cuisineType}
                onChangeText={setCuisineType}
                placeholder="eg Italian, Mexican"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3 mb-4"
                style={{ fontSize: 15 }}
              />

              {/* About Your Business */}
              <Text className="text-white text-sm mb-2">
                About your business
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description your restaurant"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                className="bg-white/10 border border-white/20 rounded-xl text-white px-4 py-3 mb-6"
                style={{ 
                  fontSize: 15,
                  minHeight: 100,
                }}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#8B5DFF] rounded-xl py-4 mb-6"
              >
                <Text className="text-white text-lg font-semibold text-center">
                  Submit
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
