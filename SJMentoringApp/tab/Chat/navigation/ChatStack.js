import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ChatScreen from '../screen/ChatScreen';

//Component
import Chat from '../component/Chat';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChatScreen">
      <Stack.Screen
        name="채팅"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
