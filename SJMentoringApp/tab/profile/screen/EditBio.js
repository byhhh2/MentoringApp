import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const EditBio = (props) => {
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
        <TextInput style={styles.textInput} multiline={true} />
        <TouchableOpacity
          onPress={() => {
            props.setFlag(!props.flag);
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
    //backgroundColor: 'white',
    backgroundColor: '#AFDCBD',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  doneText: {
    color: 'white',
    fontSize: 18,
    margin: 40,
    fontWeight: 'bold',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    margin: 40,
    fontWeight: 'bold',
  },
  textInput: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    //borderWidth: 2,
    borderRadius: 10,
    borderColor: '#498C5A',
    padding: 10,
    color: '#498C5A',
  },
});

export default EditBio;
