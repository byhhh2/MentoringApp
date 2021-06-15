import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import UploadScreen from '../screen/UploadScreen';

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator initialRouteName="UploadScreen">
      <Stack.Screen
        name="게시글 업로드"
        component={UploadScreen}
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
