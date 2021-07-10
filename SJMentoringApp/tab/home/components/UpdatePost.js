import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//Components
import UploadInput from '../../Upload/component/UploadInput';

//axios
import axios from 'axios';

export default class UploadScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      value: '',
      selectedLevel: '',
      selectedDays: [''],
      lecture: '',
      time: '',
      start: '',
      end: '',
    };
    this.getLevelInfo = this.getLevelInfo.bind(this);
    this.getDaysInfo = this.getDaysInfo.bind(this);
    this.getLectureInfo = this.getLectureInfo.bind(this);
    this.getPeriodInfo = this.getPeriodInfo.bind(this);
    this.getTimeInfo = this.getTimeInfo.bind(this);
    this.update = this.update.bind(this);
    this.setForUpdate = this.setForUpdate.bind(this);
  }
  componentDidMount() {
    this.setForUpdate(this.props.route.params);
  }

  setForUpdate({user_info}) {
    this.setState({
      selected: user_info.role,
      value: user_info.content,
      selectedLevel: user_info.level,
      selectedDays: user_info.day,
      lecture: user_info.subject,
      time: user_info.time,
      start: user_info.start_date,
      end: user_info.end_date,
    });
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
  update(role, lecture, level, start, end, time, day, text) {
    let dayArray = Array.from(day);
    dayArray = dayArray.filter((e) => e != ' ');
    if (start.length > 10 && end.length > 10) {
      start = `${new Date(start).getFullYear()}-${
        new Date(start).getMonth() + 1
      }-${new Date(start).getDate()}`;
      end = `${new Date(end).getFullYear()}-${
        new Date(end).getMonth() + 1
      }-${new Date(end).getDate()}`;
    }
    axios
      .put(
        `${axios.defaults.baseURL}/post/${this.props.route.params.user_info.id}`,
        {
          role: role,
          subject: lecture,
          level: level,
          start_date: start,
          end_date: end,
          time: time,
          day: dayArray,
          content: text,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data);
        if (
          response.data.message ===
          `Post ID: '${this.props.route.params.user_info.id}' has been updated successfully.`
        ) {
          this.props.navigation.navigate('업로드한 게시물', {
            user_info: {
              role: role,
              subject: lecture,
              level: level,
              start_date: start,
              end_date: end,
              time: time,
              day: dayArray,
              content: text,
              name: this.props.route.params.user_info.name,
              id: this.props.route.params.user_info.id,
              is_matched: this.props.route.params.user_info.is_matched,
              student_id: this.props.route.params.user_info.student_id,
            },
          });
        }
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  render() {
    console.log(this.props.route.params.user_info);
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.settingView}>
          <TouchableOpacity
            style={
              this.state.selected == 1
                ? styles.settingLeftBtnSelected
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
                ? styles.settingRightBtnSelected
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
            value={this.state.lecture}
          />
          <UploadInput
            type={'수준'}
            info={this.getLevelInfo}
            value={this.state.selectedLevel}
          />
          <UploadInput
            type={'요일'}
            info={this.getDaysInfo}
            value={this.state.selectedDays}
          />
          <UploadInput
            type={'시간대'}
            info={this.getTimeInfo}
            value={this.state.time}
          />
          <UploadInput
            type={'기간'}
            info={this.getPeriodInfo}
            startValue={this.state.start}
            endValue={this.state.end}
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
                textAlign: 'justify',
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
              this.update(
                this.state.selected,
                this.state.lecture,
                this.state.selectedLevel,
                this.state.start,
                this.state.end,
                this.state.time,
                this.state.selectedDays,
                this.state.value,
              );
            }}>
            <Text style={[styles.text, {fontSize: 17}]}>수정하기</Text>
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
  settingLeftBtnSelected: {
    backgroundColor: '#AFDCBD',
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
  settingRightBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#AFDCBD',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '45%',
    height: '100%',
  },
  settingRightBtnSelected: {
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#AFDCBD',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 0,
    width: '45%',
    height: '100%',
  },
  buttonText: {
    fontSize: 20,
    //fontWeight: 'bold',
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
