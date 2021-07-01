import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import logo from '../../image/로고white.png';
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
    this.signin = this.signin.bind(this);
  }
  signin(id, pwd) {
    axios
      .post(`http://34.64.111.90:8080/api/v1/signin`, {
        student_id: id,
        password: pwd,
      })
      .then((response) => {
        const student_id = response.data.data[0].student_id;
        const major = response.data.data[0].major;
        const name = response.data.data[0].name;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = token;
        this.props.navigation.navigate('Home', {
          student_id: student_id,
          major: major,
          name: name,
        });
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error);
        ToastAndroid.showWithGravityAndOffset(
          '아이디와 비밀번호를 다시 입력하세요',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          480,
        );
        this.setState({id: '', pwd: ''});
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
            <Image
              source={require('../../image/로고black.png')}
              style={{width: 90, height: 130}}
            />
            <Text style={styles.title}>멘 토 스</Text>
            <Text
              style={{
                fontSize: 16,
                color: '#AFDCBD',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'GMarketSansTTFMedium',
              }}>
              Sejong University {'\n'} Mentoring Matching Service
            </Text>
          </View>
          <View style={styles.login}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                value={this.state.id}
                placeholder={'세종대학교 포털 아이디를 입력하세요.'}
                onChangeText={(num) => {
                  this.setState({id: num});
                }}
              />
              <TextInput
                style={styles.textInput}
                value={this.state.pwd}
                secureTextEntry={true}
                placeholder={'비밀번호를 입력하세요.'}
                onChangeText={(password) => {
                  this.setState({pwd: password});
                }}
              />
            </View>
            <TouchableOpacity
              style={
                this.state.id && this.state.pwd
                  ? styles.loginBtn
                  : styles.loginBtnDisabled
              }
              disabled={this.state.id && this.state.pwd ? false : true}
              onPress={() => {
                this.signin(this.state.id, this.state.pwd);
                //this.props.navigation.navigate('Home');
              }}>
              <Text style={{fontSize: 16}}>로그인</Text>
            </TouchableOpacity>
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
    marginBottom: '4%',
    //marginTop: '1%',
    color: '#AFDCBD',
    fontFamily: 'GMarketSansTTFBold',
  },
  login: {
    width: '100%',
    height: '60%',
    borderRadius: 50,
    //marginTop: '3%',
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
  loginBtn: {
    width: '80%',
    height: '13%',
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginBtnDisabled: {
    width: '80%',
    height: '13%',
    backgroundColor: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
