import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProgScreen from '../screen/ProgScreen';

const Stack = createStackNavigator();

const ProgStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProgScreen">
      <Stack.Screen
        name="📝 진행 중인 멘토링"
        component={ProgScreen}
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

export default ProgStack;
