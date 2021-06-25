import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const Contents = (props) => {
  //console.log(props);
  //props.navigation.setOptions({tabBarVisible: false});
  //tabBarVisible = false;
  //const navigation = useNavigation();
  //   navigation.navigationOptions = ({navigation}) => {
  //     let tabBarVisible = true;

  //     let routeName = navigation.state.routes[navigation.state.index].routeName;

  //     if (routeName == 'Contents') {
  //       tabBarVisible = false;
  //     }

  //     return {
  //       tabBarVisible,
  //     };
  //   };
  useEffect(() => {
    //props.navigation.setOptions({tabBarVisible: false});
  });

  return (
    <View style={styles.container}>
      {/* user info */}
      <View style={styles.user_info_view}>
        <Text style={styles.green_font}>
          {props.route.params.user_info.subject}
          {'   ✔'}
        </Text>
        <Text style={styles.base_font}>
          {props.route.params.user_info.name}
          <Text style={styles.white_font}>
            {'     '}
            {/*{props.route.params.user_info.gender}*/}
            여성
          </Text>
        </Text>
      </View>
      {/* class info */}
      <View style={styles.base_view}>
        <View style={styles.flex_direction_row}>
          <Text style={styles.class_font}>
            {props.route.params.user_info.lecture}
          </Text>
          <Text style={styles.small_font}>수준</Text>
          <Text style={styles.green_font}>
            {props.route.params.user_info.level}
          </Text>
          <Text style={styles.small_font}>학점</Text>
          <Text style={styles.green_font}>
            {/*{props.route.params.user_info.score}*/}A
          </Text>
        </View>
        <View>
          <View style={styles.flex_direction_row}>
            <Text style={styles.green_font}>기간 </Text>
            <Text style={styles.small_font}>
              {props.route.params.user_info.start_date.toString().slice(0, 10)}~
              {props.route.params.user_info.end_date.toString().slice(0, 10)}
            </Text>
          </View>
          <View style={styles.flex_direction_row}>
            <Text style={styles.green_font}>시간 </Text>
            <Text style={styles.small_font}>
              {props.route.params.user_info.time}
            </Text>
          </View>
        </View>
      </View>
      {/* text */}
      <View style={styles.text_view}>
        <Text style={styles.base_font}>
          {props.route.params.user_info.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //margin: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  base_font: {
    fontSize: 20,
    margin: 10,
  },
  small_font: {
    fontSize: 18,
    margin: 10,
  },
  base_view: {
    //borderBottomColor: '#99BFA5',
    //borderBottomWidth: 1,
    padding: 20,
  },
  green_font: {
    fontSize: 20,
    color: '#498C5A',
    fontWeight: 'bold',
    margin: 10,
  },
  user_info_view: {
    backgroundColor: '#AFDCBD',
    //padding: 10,
    padding: 20,
    //alignItems: 'center',
  },
  flex_direction_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  class_font: {
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
  },
  pink_font: {
    color: '#F2BBBB',
    fontSize: 20,
    margin: 10,
  },
  white_font: {
    color: '#498C5A',
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
  },
  text_view: {
    padding: 20,
    borderRadius: 20,
    borderColor: '#498C5A',
    borderWidth: 1,
    //backgroundColor: '#F0F2AE',
    width: '97%',
    height: '40%',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Contents;
