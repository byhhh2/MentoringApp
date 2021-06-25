import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

/**
 * Login Screen by 예리
 * 21.06.09
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pwd: '',
    };
  }
  signin(id, pwd) {
    axios
      .post(`http://34.64.111.90:8080/api/v1/signin`, {
        student_id: id,
        password: pwd,
      })
      .then((response) => {
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = token;
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error);
      });
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.centerView}>
          <View
            style={{
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>멘 토 스</Text>
            <Text
              style={{
                fontSize: 16,
                color: '#AFDCBD',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Sejong University {'\n'} Mentoring Matching Service
            </Text>
          </View>
          <View style={styles.login}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder={'세종대학교 포털 아이디를 입력하세요.'}
                onChangeText={(num) => {
                  this.setState({id: num});
                }}
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'비밀번호를 입력하세요.'}
                onChangeText={(password) => {
                  this.setState({pwd: password});
                }}
              />
            </View>
            <Button
              title="로그인"
              color="#AFDCBD"
              onPress={() => {
                this.signin(this.state.id, this.state.pwd);
                //this.props.navigation.navigate('Home');
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 730,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    width: '80%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: '7%',
    marginTop: '8%',
    color: '#AFDCBD',
  },
  login: {
    width: '100%',
    height: '60%',
    borderRadius: 50,
    marginTop: '20%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputView: {
    width: '85%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  textInput: {
    paddingLeft: '3%',
    backgroundColor: 'white',
    borderColor: '#AFDCBD',
    borderBottomWidth: 1,
  },
});
