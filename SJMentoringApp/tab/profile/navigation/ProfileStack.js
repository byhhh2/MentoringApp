import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

//Screen
import ProfileScreen from '../screen/ProfileScreen';
import MyContentsList from '../screen/MyContentsList';
import Contents from '../../home/components/Contents';
import NewProfileForm from '../screen/NewProfileForm';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="내 프로필"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerLeft: null,
          headerTitleStyle: {
            alignSelf: 'center',
            marginLeft: 55,
          },
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerRight: () => (
            <View style={styles.edit}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewProfileForm')}>
                <Text
                  style={{fontSize: 17, color: '#498C5A', fontWeight: 'bold'}}>
                  편집
                </Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="내 게시물"
        component={MyContentsList}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
        }}
      />
      <Stack.Screen
        name="Contents"
        component={Contents}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NewProfileForm"
        component={NewProfileForm}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#AFDCBD',
          },
          headerTintColor: '#498C5A',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  edit: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default ProfileStack;
