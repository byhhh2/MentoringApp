import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class Chat extends Component {
  constructor(props) {
    super(props);
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
                  //color: '#498C5A',
                  marginRight: '2%',
                  fontSize: 20,
                }}>
                {this.props.route.params.matched ? '매칭 완료' : '모집중'}
              </Text>
              <Text style={{fontSize: 20, marginRight: '3%'}}>
                {this.props.route.params.lecture}
              </Text>
              <Text
                style={{
                  color: '#498C5A',
                  marginRight: '1%',
                  fontWeight: 'bold',
                }}>
                {this.props.route.params.role}
              </Text>
              <Text>{this.props.route.params.name}</Text>
            </View>
            <View
              style={{
                height: '33%',
                paddingTop: '1%',
                paddingLeft: '1%',
                paddingRight: '1%',
              }}>
              <Text style={{color: 'gray'}}>
                {this.props.route.params.text}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40%',
              }}>
              <TouchableOpacity style={styles.mentoringBtn}>
                {this.props.route.params.role === '멘티' ? (
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
        <View style={{flex: 1}}></View>
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
    height: '20%',
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
});
