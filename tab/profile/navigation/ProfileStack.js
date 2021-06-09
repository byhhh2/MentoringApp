import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProfileScreen from '../screen/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
