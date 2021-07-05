import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import SetTime from '../../Chat/component/SetTime';
import SetTerm from '../../Chat/component/SetTerm';
import SetDay from '../../Chat/component/SetDay';

let ARRAY = [];
export default class Matching extends Component {
  constructor(props) {
    super(props);
    this.state = {time: '', start: '', end: '', selectedDays: []};
    this.getPeriodInfo = this.getPeriodInfo.bind(this);
    this.getTimeInfo = this.getTimeInfo.bind(this);
    this.getDaysInfo = this.getDaysInfo.bind(this);
    this.matchingComplete = this.matchingComplete.bind(this);
  }
  getTimeInfo(time) {
    let tmp = new Date();
    let stringTime = '';
    tmp = time;
    stringTime = `${tmp.getHours()}:${tmp.getMinutes()}`;
    //console.log(stringTime);
    this.setState({time: stringTime});
  }
  getPeriodInfo(start, end) {
    let tmpStart = new Date();
    let tmpEnd = new Date();
    let stringStart = '';
    let stringEnd = '';
    tmpStart = start;
    tmpEnd = end;
    stringStart = `${tmpStart.getFullYear()}-${
      tmpStart.getMonth() + 1
    }-${tmpStart.getDate()}`;
    stringEnd = `${tmpEnd.getFullYear()}-${
      tmpEnd.getMonth() + 1
    }-${tmpEnd.getDate()}`;
    //console.log(stringStart, stringEnd);
    this.setState({start: stringStart, end: stringEnd});
  }
  getDaysInfo(days) {
    ARRAY = days.filter((x) => {
      return x != false;
    });
  }
  matchingComplete() {
    if (
      this.state.time === '' ||
      this.state.start === '' ||
      this.state.end === '' ||
      ARRAY === []
    ) {
      ToastAndroid.showWithGravityAndOffset(
        '요일, 시간대, 기간을 모두 설정하세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,
        300,
      );
    } else {
      axios
        .post(
          `http://34.64.111.90:8080/api/v1/mentoring/${this.props.route.params.info.id}`,
          {
            mentor: this.props.route.params.info.name,
            mentee: '김멘티',
            subject: this.props.route.params.info.lecture,
            start_date: this.state.start,
            end_date: this.state.end,
            time: this.state.time,
            day: ARRAY,
          },
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log('wrong!');
          console.log(error.response);
        });
    }
  }
  render() {
    console.log(this.props.route.params);
    return (
      <View style={styles.container}>
        <View style={styles.bigView}>
          <View style={styles.lectureView}>
            <Text style={{fontSize: 27, fontWeight: 'bold'}}>
              📝 {this.props.route.params.info.subject}
            </Text>
          </View>
          <View style={styles.roleView}>
            <Text style={{fontSize: 22}}>
              멘토 : {this.props.route.params.info.room_name}
            </Text>
            <Text style={{fontSize: 22}}>멘티 : 김예리</Text>
          </View>
          <View style={styles.infoView}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', marginBottom: '1%'}}>
              요일, 시간대, 기간을 픽스해주세요 !
            </Text>
            <Image
              source={require('../../../image/borderPink.jpg')}
              style={{height: '15%', width: '93%'}}
            />
          </View>
          <SetDay info={this.getDaysInfo} />
          <SetTime info={this.getTimeInfo} />
          <SetTerm info={this.getPeriodInfo} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.matchingComplete();
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              멘토링 매칭 완료
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
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigView: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
  },
  lectureView: {
    height: '9%',
    width: '90%',
    marginTop: '3%',
    borderBottomWidth: 2,
    borderBottomColor: '#AFDCBD',
    borderRadius: 20,
    marginBottom: '3%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '7%',
    paddingRight: '7%',
    //justifyContent: 'center',
    //flexDirection: 'row',
  },
  roleView: {
    height: '15%',
    width: '90%',
    //flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoView: {
    height: '8%',
    width: '80%',
    marginTop: '3%',
    //backgroundColor: '#AFDCBD',
    borderRadius: 10,
    marginBottom: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: '8%',
    width: '80%',
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
