import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ChatScreen from '../screen/ChatScreen';

//Component
import Chat from '../component/Chat';

import ChatTest from '../component/ChatTest';

import Matching from '../../Progress/component/Matching';

import OtherProfileScreen from '../../profile/screen/OtherProfileScreen';

import MentoringDiary from '../../Progress/component/MentoringDiary';

const Stack = createStackNavigator();

const ChatStack = (props) => {
  //console.log(props);

  return (
    <Stack.Navigator initialRouteName="채팅">
      {/* ChatScreen */}
      <Stack.Screen
        name="ChatTest"
        component={ChatTest}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFBold',
          },
          headerTintColor: '#498C5A',
        }}
      />

      <Stack.Screen
        name="채팅"
        //component={ChatScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFMedium',
          },
          headerTintColor: '#498C5A',
        }}>
        {({navigation}) => (
          <ChatScreen
            navigation={navigation}
            name={props.name}
            student_id={props.student_id}
          />
        )}
      </Stack.Screen>
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
        name="멘토링 신청서"
        component={Matching}
        options={{
          //headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFBold',
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
            //alignSelf: 'center',
            marginLeft: 50,
            fontFamily: 'GmarketSansTTFMedium',
          },
          headerTintColor: '#498C5A',
        }}
      />
      <Stack.Screen
        name="멘토링 일지"
        component={MentoringDiary}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFBold',
          },
          headerTintColor: '#498C5A',
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
