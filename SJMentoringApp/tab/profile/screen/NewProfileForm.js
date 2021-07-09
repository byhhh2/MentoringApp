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
import axios from 'axios';
//redux
import {connect} from 'react-redux';

import {initId, initName} from '../../../redux/action';

const NewProfileForm = (props) => {
  const [gender, setGender] = useState('여성');
  const [bio, setBio] = useState('');

  const initProfile = () => {
    axios
      .put(
        `${axios.defaults.baseURL}/profile/${props.route.params.student_id}`,
        {
          gender: gender,
          bio: bio,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log('프로필 저장 완료');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <TextInput
          style={styles.text_input}
          multiline={true}
          value={bio}
          onChangeText={(text) => {
            setBio(text);
          }}></TextInput>
      </View>

      <TouchableOpacity
        style={styles.save_button}
        onPress={() => {
          initProfile();
          props.dispatchInitUser(props.route.params.student_id);
          props.dispatchInitUserName(props.route.params.name);
          props.navigation.navigate('Home', {
            student_id: props.route.params.student_id,
            major: props.route.params.major,
            name: props.route.params.name,
          });
        }}>
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
    fontFamily: 'GmarketSansTTFMedium',
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
    fontFamily: 'GmarketSansTTFMedium',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  user_id: state.userReducer.user_id,
  user_name: state.userReducer.user_name,
});

const mapDispatchToProps = {
  dispatchInitUser: (user_id) => initId(user_id),
  dispatchInitUserName: (user_name) => initName(user_name),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProfileForm);
