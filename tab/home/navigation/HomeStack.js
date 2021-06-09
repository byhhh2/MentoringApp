import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import HomeScreen from '../screen/HomeScreen';

const Stack = createStackNavigator();
/**
 * HomeStack Navigation
 * Home에서 쓰이는 화면들 Stack
 * by 예리
 * 21.06.09
 */

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: null,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
