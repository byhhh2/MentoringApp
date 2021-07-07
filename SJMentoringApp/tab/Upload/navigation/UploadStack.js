import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import UploadScreen from '../screen/UploadScreen';
import Contents from '../../home/components/Contents';
import UpdatePost from '../../home/components/UpdatePost';
import HomeScreen from '../../home/screen/HomeScreen';
import HomeStack from '../../home/navigation/HomeStack';

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
            fontFamily: 'GmarketSansTTFBold',
          },
          headerTintColor: '#498C5A',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
        }}>
        {({navigation}) => (
          <UploadScreen
            TabNavigation={props.TabNavigation}
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
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFBold',
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
            fontFamily: 'GmarketSansTTFBold',
            marginLeft: '20%',
          },
        }}
      />
      {/*<Stack.Screen
        name="Home"
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
        </Stack.Screen>*/}
    </Stack.Navigator>
  );
};

export default UploadStack;
