import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import UploadScreen from '../screen/UploadScreen';
import Contents from '../../home/components/Contents';
import UpdatePost from '../../home/components/UpdatePost';
import HomeScreen from '../../home/screen/HomeScreen';

const Stack = createStackNavigator();

const UploadStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="UploadScreen">
      <Stack.Screen
        name="게시글 업로드"
        //component={UploadScreen}
        options={{
          headerLeft: null,
          headerTitleStyle: {
            alignSelf: 'center',
          },
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
        }}>
        {({navigation}) => (
          <UploadScreen
            navigation={navigation}
            student_id={props.student_id}
            major={props.major}
            name={props.name}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="업로드한 게시물"
        component={Contents}
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
        name="수정하기"
        component={UpdatePost}
        options={{
          title: '게시물 수정하기',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            fontWeight: 'bold',
            marginLeft: '20%',
          },
        }}
      />
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
    </Stack.Navigator>
  );
};

export default UploadStack;
