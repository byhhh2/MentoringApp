import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  _onPressFunc(matched) {
    if (!matched) {
      this.props.navigation.navigate('멘토링 신청서', {
        info: this.props.route.params.info,
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <View style={styles.fixedInfoView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginRight: '2%',
                  fontSize: 20,
                }}>
                {this.props.route.params.info.matched ? '매칭 완료' : '모집중'}
              </Text>
              <Text style={{fontSize: 20, marginRight: '3%'}}>
                {this.props.route.params.info.lecture}
              </Text>
              <Text
                style={{
                  color: '#498C5A',
                  marginRight: '1%',
                  fontWeight: 'bold',
                }}>
                {this.props.route.params.info.role}
              </Text>
              <Text>{this.props.route.params.info.name}</Text>
            </View>
            <View
              style={{
                height: '33%',
                paddingTop: '1%',
                paddingLeft: '1%',
                paddingRight: '1%',
              }}>
              <Text style={{color: 'gray'}}>
                {this.props.route.params.info.text}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40%',
              }}>
              <TouchableOpacity
                style={styles.mentoringBtn}
                onPress={() => {
                  this._onPressFunc(this.props.route.params.info.matched);
                }}>
                {this.props.route.params.info.role === '멘티' ? (
                  <Text style={{fontWeight: 'bold'}}>
                    멘토링 신청서 작성하기
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>멘토 프로필 보러가기</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 채팅화면 */}
        <View style style={styles.chatView}>
          <Text style={{textAlign: 'center', color: 'gray'}}>
            채팅을 통해서{'\n'}멘토 멘티 매칭을 이루어보세요 !
          </Text>
        </View>
        <View style={styles.textBox}>
          <TextInput style={styles.textInput} />
          <TouchableOpacity>
            <Text style={{color: '#498C5A', fontSize: 15, fontWeight: 'bold'}}>
              전송
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoBox: {
    marginTop: '1%',
    height: 120,
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  fixedInfoFiew: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: 400,
    height: 100,
  },
  mentoringBtn: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    //borderWidth: 1,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFDCBD',
    padding: '3%',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    borderStyle: 'dashed',
    width: '80%',
    marginRight: 20,
    padding: 15,
    fontSize: 15,
  },
});
