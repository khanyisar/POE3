import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage',
          tabBarIcon: ({ color }) => <Feather name="book" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
