import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProfileScreen from '../screen/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="내 프로필"
        component={ProfileScreen}
        options={{
          headerLeft: null,
          headerTitleStyle: {
            alignSelf: 'center',
          },
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;