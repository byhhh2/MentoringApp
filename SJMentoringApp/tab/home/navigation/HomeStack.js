import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, Text, View} from 'react-native';
//Screen
import HomeScreen from '../screen/HomeScreen';
import Contents from '../components/Contents';
import FindList from '../components/FindList';
import UpdatePost from '../components/UpdatePost';

import Chat from '../../Chat/component/Chat';
import OtherProfileScreen from '../../profile/screen/OtherProfileScreen';

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
        {({navigation}) => (
          <HomeScreen
            navigation={navigation}
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
          title: '검색 목록',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'GmarketSansTTFMedium',
            marginLeft: '27%',
          },
        }}
      />
      <Stack.Screen
        name="수정하기"
        component={UpdatePost}
        options={{
          title: '게시물 수정하기',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            fontFamily: 'GmarketSansTTFMedium',
            marginLeft: '20%',
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="채팅방"
        component={Chat}
        options={{
          //headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            marginRight: 60,
            color: 'black',
            fontFamily: 'GmarketSansTTFMedium',
          },
          headerTintColor: '#498C5A',
        }}
      />
      <Stack.Screen
        name="상대 프로필"
        component={OtherProfileScreen}
        options={{
          //headerLeft: null,
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            marginRight: 60,
            color: 'black',
            fontFamily: 'GmarketSansTTFMedium',
          },
          headerTintColor: '#498C5A',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
