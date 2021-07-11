import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BackHandler, Alert} from 'react-native';

//Screen
import ProgScreen from '../screen/ProgScreen';
import Matching from '../component/Matching';
import MentoringDiary from '../component/MentoringDiary';
import Review from '../screen/Review';

const Stack = createStackNavigator();

const ProgStack = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('알림', '정말로 앱을 종료하시겠습니까?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
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
