import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Stacks
import HomeStack from './home/navigation/HomeStack';
import ProfileStack from './profile/navigation/ProfileStack';

//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        inactiveTintColor: 'black',
        activeTintColor: 'black',
      }}>
      <Tab.Screen
        name="홈"
        component={HomeStack}
        options={{
          /**
           * Bottom Tab Icon
           * 21.06.10 by 예리
           */
          tabBarIcon: () => {
            return (
              <Ionicons name={'ios-home'} size={30} style={{color: 'black'}} />
            );
          },
        }}
      />
      <Tab.Screen
        name="프로필"
        component={ProfileStack}
        options={{
          tabBarIcon: () => {
            return (
              <Ionicons
                name={'ios-person-circle-sharp'}
                size={30}
                style={{color: 'black'}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavi;
