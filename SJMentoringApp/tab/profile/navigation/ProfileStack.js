import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProfileScreen from '../screen/ProfileScreen';
import MyContentsList from '../screen/MyContentsList';
import Contents from '../../home/components/Contents';

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
      <Stack.Screen
        name="내 게시물"
        component={MyContentsList}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
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

export default ProfileStack;
