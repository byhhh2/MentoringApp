import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import HomeScreen from '../screen/HomeScreen';
import Contents from '../components/Contents';
import FindList from '../components/FindList';
import {TouchableOpacity, Text, View, Modal} from 'react-native';

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
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                marginRight: 5,
                display: 'flex',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 18, color: 'black'}}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 18, color: 'red', fontWeight: 'bold'}}>
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          ),
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
