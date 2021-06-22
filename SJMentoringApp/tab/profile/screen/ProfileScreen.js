import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class ProfileScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>김멘토</Text>
          <Text>소개</Text>
          <Text>안녕하세용~~~</Text>
        </View>
        <View style={styles.manner}>
          <Text>매너온도</Text>
        </View>
        <View style={styles.list}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  profile: {
    marginTop: '5%',
    height: '20%',
    backgroundColor: 'orange',
  },
  manner: {
    height: '20%',
    backgroundColor: 'yellow',
  },
  list: {
    height: '57%',
    backgroundColor: 'pink',
  },
});
