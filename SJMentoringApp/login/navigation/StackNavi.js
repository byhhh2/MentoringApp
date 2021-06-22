import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import Login from '../screen/Login';
import BottomTabNavi from '../../tab/BottomTabNavi';

const Stack = createStackNavigator();
/**
 * Login->Home Stack Navigation
 * by 예리
 * 21.06.09
 */

const StackNavi = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavi}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavi;
