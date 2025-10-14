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
  KeyboardAvoidingView,
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
  const isMediumScreen = SCREEN_WIDTH < 414;

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
            <View className="flex-1 px-5">
              {/* Header with Back Button */}
              <View className="flex-row items-center pt-2 pb-2">
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
                  <Text className="text-white text-xl">←</Text>
                </TouchableOpacity>
              </View>

              {/* JAW Logo */}
              <Text 
                className="font-bold text-white text-center tracking-[2px] italic mb-2"
                style={{ fontSize: isSmallScreen ? 24 : 28 }}
              >
                JAW
              </Text>

              {/* Title */}
              <Text 
                className="font-bold text-white text-center mb-1"
                style={{ fontSize: isSmallScreen ? 18 : 20 }}
              >
                Register Restaurant
              </Text>

              {/* Subtitle */}
              <Text 
                className="text-white/60 text-center mb-3"
                style={{ fontSize: isSmallScreen ? 11 : 12 }}
              >
                Enter your restaurant details to submit a request
              </Text>

              {/* Form Fields */}
              <View className="flex-1">
                {/* Restaurant Name */}
                <Text className="text-white mb-1" style={{ fontSize: 12 }}>
                  Restaurant Name
                </Text>
                <TextInput
                  value={restaurantName}
                  onChangeText={setRestaurantName}
                  placeholder="eg Romanes"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  className="bg-white/10 border border-white/20 rounded-lg text-white mb-2"
                  style={{ paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 }}
                />

                {/* Email and Phone */}
                <View className="flex-row mb-2" style={{ gap: 8 }}>
                  <View className="flex-1">
                    <Text className="text-white mb-1" style={{ fontSize: 12 }}>Email</Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="exemple@gmail.com"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="bg-white/10 border border-white/20 rounded-lg text-white"
                      style={{ paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 }}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white mb-1" style={{ fontSize: 12 }}>Phone</Text>
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="+21261234567"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      keyboardType="phone-pad"
                      className="bg-white/10 border border-white/20 rounded-lg text-white"
                      style={{ paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 }}
                    />
                  </View>
                </View>

                {/* Address */}
                <Text className="text-white mb-1" style={{ fontSize: 12 }}>Address</Text>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="eg 123 Main st, City"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  className="bg-white/10 border border-white/20 rounded-lg text-white mb-2"
                  style={{ paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 }}
                />

                {/* Type and Cuisine Type */}
                <View className="flex-row mb-2" style={{ gap: 8 }}>
                  <View className="flex-1">
                    <Text className="text-white mb-1" style={{ fontSize: 12 }}>Type</Text>
                    <View className="bg-white/10 border border-white/20 rounded-lg flex-row justify-between items-center" style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                      <Text className="text-white/40" style={{ fontSize: 13 }}>
                        {type || 'Select Type'}
                      </Text>
                      <Text className="text-white/40" style={{ fontSize: 13 }}>▼</Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white mb-1" style={{ fontSize: 12 }}>Cuisine type</Text>
                    <TextInput
                      value={cuisineType}
                      onChangeText={setCuisineType}
                      placeholder="eg Italian, Mexican"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      className="bg-white/10 border border-white/20 rounded-lg text-white"
                      style={{ paddingHorizontal: 12, paddingVertical: 10, fontSize: 13 }}
                    />
                  </View>
                </View>

                {/* About Your Business */}
                <Text className="text-white mb-1" style={{ fontSize: 12 }}>About your business</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description your restaurant"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  className="bg-white/10 border border-white/20 rounded-lg text-white mb-3"
                  style={{ 
                    paddingHorizontal: 12, 
                    paddingVertical: 10,
                    fontSize: 13,
                    height: 60,
                  }}
                />

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-[#8B5DFF] rounded-xl"
                  style={{ paddingVertical: 14, marginBottom: 8 }}
                >
                  <Text className="text-white font-semibold text-center" style={{ fontSize: 16 }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};
