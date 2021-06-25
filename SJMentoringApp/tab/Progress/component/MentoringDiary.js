import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class MentoringDiary extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoView}>
          <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: '2%'}}>
            📝 {this.props.route.params.lecture}
          </Text>
          <Text style={{fontSize: 16}}>
            🐥 멘토 : {this.props.route.params.mentor}
          </Text>
          <Text style={{marginBottom: '3%', fontSize: 16}}>
            🐣 멘티 : {this.props.route.params.mentee}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {this.props.route.params.finished
              ? '멘토링 완료'
              : this.props.route.params.period}
          </Text>
        </View>
        <View style={styles.whiteView}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>💡 21.06.01</Text>
          <Text style={{paddingLeft: '5%', fontSize: 17, marginBottom: '2%'}}>
            자료구조 복습
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>💡 21.06.02</Text>
          <Text style={{paddingLeft: '5%', fontSize: 17, marginBottom: '2%'}}>
            백준 문제 풀어보기
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  whiteView: {
    backgroundColor: 'white',
    height: '75%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  infoView: {
    height: '19%',
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '2%',
    display: 'flex',
    alignItems: 'center',
  },
});
