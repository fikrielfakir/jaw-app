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

interface RegisterRestaurantScreenProps {
  navigation?: any;
}

export const RegisterRestaurantScreen: React.FC<RegisterRestaurantScreenProps> = ({ navigation }) => {
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
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-4 pb-8">
            {/* Back Button */}
            <TouchableOpacity 
              onPress={() => navigation?.goBack()}
              className="mb-6"
            >
              <Text className="text-white text-2xl">←</Text>
            </TouchableOpacity>

            {/* JAW Logo */}
            <Text className="text-[40px] font-bold text-white text-center mb-8 tracking-[2px] italic" style={{ fontFamily: 'Inter' }}>
              JAW
            </Text>

            {/* Title */}
            <Text className="text-[28px] font-bold text-white mb-2" style={{ fontFamily: 'Inter' }}>
              Register Restaurant
            </Text>

            {/* Subtitle */}
            <Text className="text-[15px] text-white/60 mb-8" style={{ fontFamily: 'Inter' }}>
              Enter your restaurant details to submit a request
            </Text>

            {/* Restaurant Name */}
            <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Restaurant Name</Text>
            <TextInput
              value={restaurantName}
              onChangeText={setRestaurantName}
              placeholder="eg Romanes"
              placeholderTextColor="#A0A0A0"
              className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px] mb-4"
              style={{ fontFamily: 'Inter' }}
            />

            {/* Email and Phone in a row */}
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1">
                <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="exemple@gmail.com"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px]"
                  style={{ fontFamily: 'Inter' }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+21261234567"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="phone-pad"
                  className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px]"
                  style={{ fontFamily: 'Inter' }}
                />
              </View>
            </View>

            {/* Address */}
            <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="eg 123 Main st, City"
              placeholderTextColor="#A0A0A0"
              className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px] mb-4"
              style={{ fontFamily: 'Inter' }}
            />

            {/* Type */}
            <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Type</Text>
            <View className="bg-white rounded-xl px-4 py-4 mb-4 flex-row justify-between items-center">
              <Text className="text-[#A0A0A0] text-[15px]" style={{ fontFamily: 'Inter' }}>
                {type || 'Select Type'}
              </Text>
              <Text className="text-[#A0A0A0] text-[15px]">▼</Text>
            </View>

            {/* Cuisine Type */}
            <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>Cuisine type</Text>
            <TextInput
              value={cuisineType}
              onChangeText={setCuisineType}
              placeholder="eg Italian, Mexican"
              placeholderTextColor="#A0A0A0"
              className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px] mb-4"
              style={{ fontFamily: 'Inter' }}
            />

            {/* About Your Business */}
            <Text className="text-white text-[15px] mb-2" style={{ fontFamily: 'Inter' }}>About your business</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description your restaurant"
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="bg-white rounded-xl px-4 py-4 text-[#666666] text-[15px] mb-8"
              style={{ minHeight: 120, fontFamily: 'Inter' }}
            />

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#8B5DFF] py-[18px] rounded-xl"
            >
              <Text className="text-white text-[17px] font-semibold text-center" style={{ fontFamily: 'Inter' }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
