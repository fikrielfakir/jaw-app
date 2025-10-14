import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-4 pb-8">
              {/* Header with Back Button */}
              <View className="flex-row items-center mb-8">
                <TouchableOpacity 
                  onPress={() => {
                    if (onBackToWelcome) {
                      onBackToWelcome();
                    } else {
                      navigation?.goBack();
                    }
                  }}
                  className="mr-4"
                >
                  <Text className="text-white text-2xl">←</Text>
                </TouchableOpacity>
              </View>

              {/* JAW Logo */}
              <Text className="text-[40px] font-bold text-white text-center mb-6 tracking-[2px] italic">
                JAW
              </Text>

              {/* Title */}
              <Text className="text-[28px] font-bold text-white mb-2">
                Register Restaurant
              </Text>

              {/* Subtitle */}
              <Text className="text-[15px] text-white/60 mb-8">
                Enter your restaurant details to submit a request
              </Text>

              {/* Restaurant Name */}
              <Text className="text-white text-[15px] mb-2">Restaurant Name</Text>
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                placeholder="eg Romanes"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px] mb-4"
              />

              {/* Email and Phone in a row */}
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-white text-[15px] mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemple@gmail.com"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px]"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-[15px] mb-2">Phone</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+21261234567"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="phone-pad"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px]"
                  />
                </View>
              </View>

              {/* Address */}
              <Text className="text-white text-[15px] mb-2">Address</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="eg 123 Main st, City"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px] mb-4"
              />

              {/* Type */}
              <Text className="text-white text-[15px] mb-2">Type</Text>
              <View className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 mb-4 flex-row justify-between items-center">
                <Text className="text-white/40 text-[15px]">
                  {type || 'Select Type'}
                </Text>
                <Text className="text-white/40 text-[15px]">▼</Text>
              </View>

              {/* Cuisine Type */}
              <Text className="text-white text-[15px] mb-2">Cuisine type</Text>
              <TextInput
                value={cuisineType}
                onChangeText={setCuisineType}
                placeholder="eg Italian, Mexican"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px] mb-4"
              />

              {/* About Your Business */}
              <Text className="text-white text-[15px] mb-2">About your business</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description your restaurant"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-[15px] mb-8"
                style={{ minHeight: 120 }}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#8B5DFF] py-[18px] rounded-xl"
              >
                <Text className="text-white text-[17px] font-semibold text-center">
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
