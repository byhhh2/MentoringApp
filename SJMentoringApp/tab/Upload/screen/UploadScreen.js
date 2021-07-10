import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//Components
import UploadInput from '../component/UploadInput';

//axios
import axios from 'axios';

export default class UploadScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      value: '',
      selectedLevel: '',
      selectedDays: [],
      lecture: '',
      time: '',
      start: '',
      end: '',
      uploaded: false,
    };
    this.getLevelInfo = this.getLevelInfo.bind(this);
    this.getDaysInfo = this.getDaysInfo.bind(this);
    this.getLectureInfo = this.getLectureInfo.bind(this);
    this.getPeriodInfo = this.getPeriodInfo.bind(this);
    this.getTimeInfo = this.getTimeInfo.bind(this);
    this.upload = this.upload.bind(this);
    this.checkInfo = this.checkInfo.bind(this);
  }
  getLevelInfo(lev) {
    let level = '';
    if (lev[0]) level = '상';
    else if (lev[1]) level = '중';
    else level = '하';
    //console.log(level);
    this.setState({selectedLevel: level});
  }
  getDaysInfo(days) {
    let array = days.filter((x) => {
      return x != false;
    });
    //console.log(array);
    this.setState({selectedDays: array});
  }
  getLectureInfo(lec) {
    //console.log(lec);
    this.setState({lecture: lec});
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
  upload(role, lecture, level, start, end, time, day, text) {
    axios
      .post(
        `${axios.defaults.baseURL}/post`,
        {
          role: role,
          subject: lecture,
          level: level,
          start_date: start,
          end_date: end,
          time: time,
          day: day,
          content: text,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data.data[0]);
        this.props.navigation.navigate('업로드한 게시물', {
          user_info: {
            name: this.props.name,
            level: this.state.selectedLevel,
            subject: this.state.lecture,
            role: this.state.selected,
            start_date: this.state.start,
            end_date: this.state.end,
            time: this.state.time,
            day: this.state.selectedDays,
            content: this.state.value,
            id: response.data.data[0].id,
            is_matched: response.data.data[0].is_matched,
          },
        });
        this.setState({uploaded: true, selected: 0, value: ''});
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error);
      });
  }
  checkInfo(role, lecture, level, start, end, time, day, text) {
    if (
      role === 0 ||
      lecture === '' ||
      level === '' ||
      start === '' ||
      end === '' ||
      time === '' ||
      day.length === 0 ||
      text === ''
    ) {
      ToastAndroid.showWithGravity(
        '게시물 정보를 모두 입력하세요.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      this.upload(role, lecture, level, start, end, time, day, text);
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.settingView}>
          <TouchableOpacity
            style={
              this.state.selected == 1
                ? [styles.BtnSelected, styles.settingLeftBtn]
                : styles.settingLeftBtn
            }
            onPress={() => {
              this.setState({selected: 1});
            }}>
            <Text style={styles.buttonText}>멘토</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.selected == 2
                ? [styles.BtnSelected, styles.settingRightBtn]
                : styles.settingRightBtn
            }
            onPress={() => {
              this.setState({selected: 2});
            }}>
            <Text style={styles.buttonText}>멘티</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.uploadView}>
          <UploadInput
            type={'과목'}
            info={this.getLectureInfo}
            refresh={this.state.uploaded}
          />
          <UploadInput
            type={'수준'}
            info={this.getLevelInfo}
            refresh={this.state.uploaded}
          />
          <UploadInput
            type={'요일'}
            info={this.getDaysInfo}
            refresh={this.state.uploaded}
          />
          <UploadInput
            type={'시간대'}
            info={this.getTimeInfo}
            refresh={this.state.uploaded}
          />
          <UploadInput
            type={'기간'}
            info={this.getPeriodInfo}
            refresh={this.state.uploaded}
          />
          <View style={styles.inputAreaView}>
            <Text style={[styles.text, {fontSize: 19}]}>하고 싶은 말 </Text>
            <TextInput
              placeholder={'하고 싶은 말을 입력하세요.'}
              multiline={true}
              style={{
                paddingLeft: '3%',
                paddingRight: '3%',
                height: '70%',
                marginTop: '3%',
                fontFamily: 'GmarketSansTTFMedium',
                fontSize: 16,
                color: 'gray',
              }}
              value={this.state.value}
              onChangeText={(text) => this.setState({value: text})}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              /*this.upload(
                this.state.selected,
                this.state.lecture,
                this.state.selectedLevel,
                this.state.start,
                this.state.end,
                this.state.time,
                this.state.selectedDays,
                this.state.value,
              );*/
              this.checkInfo(
                this.state.selected,
                this.state.lecture,
                this.state.selectedLevel,
                this.state.start,
                this.state.end,
                this.state.time,
                this.state.selectedDays,
                this.state.value,
              );
              this.setState({uploaded: true});
            }}>
            <Text style={[styles.text, {fontSize: 17}]}>등록하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GmarketSansTTFMedium',
  },
  bold: {
    fontFamily: 'GmarketSansTTFBold',
  },
  container: {
    height: 630,
    backgroundColor: 'white',
  },
  settingView: {
    marginTop: '2%',
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: '2%',
  },
  settingLeftBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#AFDCBD',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
    width: '45%',
    height: '100%',
  },
  BtnSelected: {
    backgroundColor: '#AFDCBD',
  },
  settingRightBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#AFDCBD',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 2,
    width: '45%',
    height: '100%',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'GmarketSansTTFMedium',
  },
  uploadView: {
    height: '70%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputAreaView: {
    height: '35%',
    display: 'flex',
    //alignItems: 'center',
    paddingTop: '3%',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 2,
  },
  btnView: {
    height: '17%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#AFDCBD',
    width: '82%',
    height: '42%',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
