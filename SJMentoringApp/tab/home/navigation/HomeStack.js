import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import HomeScreen from '../screen/HomeScreen';
import Contents from '../components/Contents';

const Stack = createStackNavigator();

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
      <Stack.Screen
        name="Contents"
        component={Contents}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
