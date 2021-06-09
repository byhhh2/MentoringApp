import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Stacks
import HomeStack from './home/navigation/HomeStack';
import ProfileStack from './profile/navigation/ProfileStack';

const Tab = createBottomTabNavigator();
/**
 * Bottom Tab Navigation
 * Home, Profile 추가
 * by 예리
 * 21.06.09
 */
const BottomTabNavi = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#AFDCBD',
        activeBackgroundColor: '#99bfa5',
      }}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavi;
