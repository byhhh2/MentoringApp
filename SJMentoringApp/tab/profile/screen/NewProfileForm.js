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

const NewProfileForm = () => {
  //const navigation = useNavigation();

  const [gender, setGender] = useState('여성');

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>성별을 선택해주세요.</Text>
        <View style={styles.gender_selector}>
          <TouchableOpacity
            onPress={() => {
              setGender('여성');
            }}
            activeOpacity={1}>
            <View
              style={gender == '여성' ? styles.selected : styles.none_selected}>
              <Text style={styles.gender_text}>여성</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setGender('남성');
            }}
            activeOpacity={1}>
            <View
              style={gender == '남성' ? styles.selected : styles.none_selected}>
              <Text style={styles.gender_text}>남성</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>자신을 한 문장으로 소개해보세요.</Text>
        <TextInput style={styles.text_input}></TextInput>
      </View>

      <TouchableOpacity style={styles.save_button} activeOpacity={1}>
        <View>
          <Text style={styles.save_text}>저장</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDCBD',
    padding: '6%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    color: '#498C5A',
    fontFamily: 'GmarketSansTTFMedium',
  },
  gender_selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignSelf: 'stretch',
  },
  none_selected: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: 'white',
  },
  selected: {
    width: 100,
    height: 60,
    backgroundColor: '#498C5A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderColor: '#498C5A',
  },
  text_input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    color: '#498C5A',
  },
  form: {
    padding: '6%',
    alignItems: 'center',
    height: '40%',
    width: '100%',
    //backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  gender_text: {
    color: 'white',
    fontFamily: 'GmarketSansTTFBold',
  },
  save_button: {
    backgroundColor: '#498C5A',
    width: '100%',
    height: '8%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save_text: {
    color: 'white',
    fontFamily: 'GmarketSansTTFBold',
  },
});

export default NewProfileForm;
