import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProgScreen from '../screen/ProgScreen';
import Matching from '../component/Matching';
import MentoringDiary from '../component/MentoringDiary';
import Review from '../screen/Review';

const Stack = createStackNavigator();

const ProgStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProgScreen">
      <Stack.Screen
        name="진행 중인 멘토링"
        component={ProgScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'GmarketSansTTFMedium',
          },
          headerTintColor: 'black',
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
      <Stack.Screen
        name="Review"
        component={Review}
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

export default ProgStack;
