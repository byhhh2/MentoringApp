import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
axios.defaults.baseURL = 'http://34.133.177.64:8080/api/v1';
//redux
import {connect} from 'react-redux';
import {initId, initName} from '../../redux/action';

//component
//import NewProfileForm from '../../tab/profile/screen/NewProfileForm';

// import io from 'socket.io-client';

// const socket = io('http://34.64.111.90:8080/');
// socket.on('connect', () => {
//   console.log(socket.id);
//   console.log('connection');
//   //socket.emit('joinRoom', yh);
// });

/**
 * Login Screen by 예리
 * 21.06.09
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pwd: '',
      isLoading: false,
    };
    this.signin = this.signin.bind(this);
  }
  signin(id, pwd) {
    axios
      .post(`${axios.defaults.baseURL}/signin`, {
        student_id: id,
        password: pwd,
      })
      .then((response) => {
        const student_id = response.data.data[0].student_id;
        const major = response.data.data[0].major;
        const name = response.data.data[0].name;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = token;
        if (response.data.data[0].gender == null) {
          this.props.navigation.navigate('NewProfile', {
            student_id: student_id,
            major: major,
            name: name,
          });
        } else {
          this.props.navigation.navigate('Home', {
            student_id: student_id,
            major: major,
            name: name,
          });
          this.props.dispatchInitUser(student_id);
          this.props.dispatchInitUserName(name);
        }
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
        this.setState({id: '', pwd: '', isLoading: false});
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
              source={require('../../image/로고main.png')}
              style={{width: 90, height: 130}}
            />
            <Text style={styles.title}>멘 토 스</Text>
            <Text
              style={{
                fontSize: 16,
                color: '#AFDCBD',
                textAlign: 'center',
                fontFamily: 'GmarketSansTTFMedium',
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
            <View style={{height: '15%'}}>
              {this.state.isLoading ? (
                <ActivityIndicator size="small" color="#498C5A" />
              ) : (
                <></>
              )}
            </View>
            <TouchableOpacity
              style={
                this.state.id && this.state.pwd
                  ? styles.loginBtn
                  : [styles.loginBtn, styles.loginBtnDisabled]
              }
              disabled={this.state.id && this.state.pwd ? false : true}
              onPress={() => {
                this.signin(this.state.id, this.state.pwd);
                this.setState({isLoading: true});
                //this.props.navigation.navigate('Home');
              }}>
              <Text style={{fontSize: 16, fontFamily: 'GmarketSansTTFMedium'}}>
                로그인
              </Text>
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
    marginBottom: '4%',
    color: '#AFDCBD',
    fontFamily: 'GmarketSansTTFBold',
  },
  login: {
    width: '100%',
    height: '60%',
    borderRadius: 50,
    //marginTop: '3%',
    display: 'flex',
    //justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputView: {
    width: '85%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  textInput: {
    paddingLeft: '3%',
    backgroundColor: 'white',
    borderColor: '#AFDCBD',
    borderBottomWidth: 1,
    fontFamily: 'GmarketSansTTFMedium',
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
    backgroundColor: 'lightgray',
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
