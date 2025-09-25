import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

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
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Bookings" component={BookingsManagementScreen} />
      <Tab.Screen name="Restaurant" component={RestaurantProfileScreen} />
    </Tab.Navigator>
  );
};