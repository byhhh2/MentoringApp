import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import axios from 'axios';

const EditBio = (props) => {
  //console.log(props.prevBio);
  const [bio, setBio] = useState(props.prevBio);
  const editClick = () => {
    axios
      .put(
        `${axios.defaults.baseURL}/profile/${props.student_id}/bio`,
        {
          bio: bio,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        onPress={() => {
          props.setFlag(!props.flag);
        }}
      />
      <View style={styles.modal}>
        <Text style={styles.titleText}>소개글 변경</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={bio}
          onChangeText={(text) => {
            setBio(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (bio == null) {
              ToastAndroid.showWithGravityAndOffset(
                '소개를 입력하세요.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                480,
              );
            } else {
              props.setFlag(!props.flag);
              editClick();
              props.setBio(bio);
            }
          }}>
          <Text style={styles.doneText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//#AFDCBD

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  modal: {
    marginHorizontal: 20,
    borderRadius: 10,
    height: 'auto',
    alignItems: 'center',
    marginTop: '30%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'space-around',
    elevation: 20,
  },
  doneText: {
    color: '#498C5A',
    fontSize: 18,
    margin: 40,
    fontFamily: 'GmarketSansTTFMedium',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    margin: 40,
    fontFamily: 'GmarketSansTTFMedium',
  },
  textInput: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#498C5A',
    padding: 10,
    color: '#498C5A',
    fontFamily: 'GmarketSansTTFMedium',
  },
});

export default EditBio;
