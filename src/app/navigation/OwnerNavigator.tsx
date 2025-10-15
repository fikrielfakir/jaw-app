import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Home, Search, Plus, Calendar, UserCircle } from 'lucide-react-native';
import { FeedScreen } from '../owner/screens/FeedScreen';

const Tab = createBottomTabNavigator();

const DiscoverScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
    <Text style={{ color: '#fff' }}>Discover</Text>
  </View>
);

const AddScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
    <Text style={{ color: '#fff' }}>Add Content</Text>
  </View>
);

const BookingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
    <Text style={{ color: '#fff' }}>Manage Bookings</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0f' }}>
    <Text style={{ color: '#fff' }}>Owner Profile</Text>
  </View>
);

export const OwnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8B5DFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0a0a0f',
          borderTopColor: '#1a1a2e',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};
