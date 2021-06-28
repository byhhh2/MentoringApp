import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import UploadScreen from '../screen/UploadScreen';
import Contents from '../../home/components/Contents';

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
    </Stack.Navigator>
  );
};

export default UploadStack;
