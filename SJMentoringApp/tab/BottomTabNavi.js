import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Stacks
import HomeStack from './home/navigation/HomeStack';
import ProfileStack from './profile/navigation/ProfileStack';
import ProgStack from './Progress/navigation/ProgStack';
import ChatStack from './Chat/navigation/ChatStack';
import UploadStack from './Upload/navigation/UploadStack';

//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';

var student_id;

const Tab = createBottomTabNavigator();
const BottomTabNavi = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: '#AFDCBD',
        activeBackgroundColor: '#99bfa5',
        inactiveTintColor: 'black',
        activeTintColor: 'black',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="홈"
        //component={HomeStack}
        options={{
          unmountOnBlur: true, //홈 화면 올때마다 새로고침
          tabBarIcon: () => {
            return (
              <Ionicons name={'ios-home'} size={30} style={{color: 'black'}} />
            );
          },
        }}>
        {({navigation}) => {
          student_id = props.route.params.student_id;

          return (
            <HomeStack
              TabNavigation={navigation}
              student_id={props.route.params.student_id}
              major={props.route.params.major}
              name={props.route.params.name}
            />
          );
        }}
      </Tab.Screen>
      <Tab.Screen
        name="진행중"
        component={ProgStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => {
            return (
              <Ionicons
                name={'list-circle-sharp'}
                size={30}
                style={{color: 'black'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="업로드"
        //component={UploadStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => {
            return (
              <Ionicons
                name={'add-circle-sharp'}
                size={30}
                style={{color: 'black'}}
              />
            );
          },
        }}>
        {({navigation}) => (
          <UploadStack
            TabNavigation={navigation}
            student_id={props.route.params.student_id}
            major={props.route.params.major}
            name={props.route.params.name}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="채팅"
        component={ChatStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => {
            return (
              <Ionicons
                name={'chatbubbles-sharp'}
                size={30}
                style={{color: 'black'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="프로필"
        //component={ProfileStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => {
            return (
              <Ionicons
                name={'ios-person-circle-sharp'}
                size={30}
                style={{color: 'black'}}
              />
            );
          },
        }}>
        {({navigation}) => <ProfileStack student_id={student_id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavi;
