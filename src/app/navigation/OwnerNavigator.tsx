import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { LayoutDashboard, Calendar, Store } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

// Placeholder screens for restaurant owners
const DashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Restaurant Dashboard</Text>
  </View>
);

const BookingsManagementScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Manage Bookings</Text>
  </View>
);

const RestaurantProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Restaurant Profile</Text>
  </View>
);

export const OwnerNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8B5DFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingsManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />
        }}
      />
      <Tab.Screen 
        name="Restaurant" 
        component={RestaurantProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Store size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};