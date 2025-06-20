import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { localAssets } from '../resources/assets';
import BookmarksTab from './Tabs/BookmarksTab';
import HomeTab from './Tabs/HomeTab';
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let imageSource;

          if (route.name === 'Home') {
            imageSource = focused
              ? localAssets.home_filled    
              : localAssets.home;
          } else if (route.name === 'Bookmarks') {
            imageSource = focused
              ? localAssets.bookmark_filled
              : localAssets.bookmark;
          }

          return (
            <Image
              source={imageSource}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#000' : 'gray', 
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Bookmarks" component={BookmarksTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

