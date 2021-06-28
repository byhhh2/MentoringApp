import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, Text, View} from 'react-native';
//Screen
import HomeScreen from '../screen/HomeScreen';
import Contents from '../components/Contents';
import FindList from '../components/FindList';

const Stack = createStackNavigator();

const HomeStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Home"
        //component={HomeScreen}
        options={{
          headerLeft: null,
          headerShown: false,
        }}>
        {() => (
          <HomeScreen
            student_id={props.student_id}
            major={props.major}
            name={props.name}
          />
        )}
      </Stack.Screen>
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
      <Stack.Screen
        name="FindList"
        component={FindList}
        options={{
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
