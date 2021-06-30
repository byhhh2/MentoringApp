import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ChatScreen from '../screen/ChatScreen';

//Component
import Chat from '../component/Chat';

const Stack = createStackNavigator();

const ChatStack = (props) => {
  //console.log(props);

  return (
    <Stack.Navigator initialRouteName="ChatScreen">
      <Stack.Screen
        name="채팅"
        //component={ChatScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
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
          },
          headerTintColor: '#498C5A',
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
