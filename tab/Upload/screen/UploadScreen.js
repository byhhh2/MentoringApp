import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import CalendarPicker from 'react-native-calendar-picker';

/**
 * upload form
 * 21.06.16 by 예리
 */

export default class UploadScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }
  render() {
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
          <Input type={'과목'} />
          <Input type={'수준'} />
          <Input type={'요일'} />
          <Input type={'시간대'} />
          <Input type={'기간'} />
          <View style={styles.inputAreaView}>
            <Text style={{fontSize: 19}}>하고 싶은 말 : </Text>
            <TextInput
              placeholder={'하고 싶은 말을 입력하세요.'}
              style={{
                paddingLeft: '3%',
                paddingRight: '3%',
                height: '70%',
                marginTop: '3%',
              }}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{fontSize: 17}}>등록하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

/**
 * TimePick Modal
 * 21.06.17 by 예리
 */
class TimeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {timeModalVisible: false, date: new Date()};
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({timeModalVisible: !this.state.timeModalVisible});
        }}>
        <Text style={{color: 'gray'}}>여기를 클릭하세요.</Text>
        {this.state.timeModalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.timeModalVisible}
            onRequestClose={() => {
              this.setState({
                timeModalVisible: !this.state.timeModalVisible,
              });
            }}>
            <View style={styles.modalBack}>
              <View style={styles.modalCenter}>
                <DatePicker date={this.state.date} mode={'time'} />
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {
                    this.setState({
                      timeModalVisible: !this.state.timeModalVisible,
                    });
                  }}>
                  <Text>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  }
}

/**
 * DatePick Modal
 * 21.06.17 by 예리
 */
class DateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {dateModalVisible: false, start: null, end: null};
    this.onDateChange = this.onDateChange.bind(this);
  }
  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({end: date});
    } else {
      this.setState({start: date, end: null});
    }
  }
  render() {
    const minDate = new Date();
    const maxDate = new Date(2021, 12, 31);
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({dateModalVisible: !this.state.dateModalVisible});
        }}>
        <Text style={{color: 'gray'}}>여기를 클릭하세요.</Text>
        {this.state.dateModalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.dateModalVisible}
            onRequestClose={() => {
              this.setState({
                dateModalVisible: !this.state.dateModalVisible,
              });
            }}>
            <View style={styles.modalBack}>
              <View style={styles.modalCenter}>
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={true}
                  minDate={minDate}
                  maxDate={maxDate}
                  //todayBackgroundColor="orange"
                  selectedDayColor="#AFDCBD"
                  selectedDayTextColor="green"
                  onDateChange={this.onDateChange}
                />
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {
                    this.setState({
                      dateModalVisible: !this.state.dateModalVisible,
                    });
                  }}>
                  <Text>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  }
}

/**
 * Level Button
 * 21.06.17 by 예리
 */
class Level extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.click[this.props.id]
            ? styles.levelButtonSelected
            : styles.levelButton
        }
        onPress={() => this.props.callback(this.props.id)}>
        <Text style={{fontSize: 17}}>{this.props.level}</Text>
      </TouchableOpacity>
    );
  }
}

/**
 * Days Button
 * 21.06.17 by 예리
 */
class Days extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={
          this.props.click[this.props.id]
            ? styles.daysButtonSelected
            : styles.daysButton
        }
        onPress={() => this.props.callback(this.props.id)}>
        <Text style={{fontSize: 17}}>{this.props.day}</Text>
      </TouchableOpacity>
    );
  }
}

/**
 * Inputs
 * 21.06.17 by 예리
 */
const buttons = ['상', '중', '하'];
const days = ['월', '화', '수', '목', '금', '토', '일'];
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: [false, false, false],
      selectedDays: [false, false, false, false, false, false, false],
    };
  }
  inputType(type) {
    switch (type) {
      case '과목':
        return <TextInput placeholder={`과목을 입력하세요.`} />;
        break;
      case '수준':
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
            }}>
            {buttons.map((type, i) => (
              <Level
                level={type}
                key={i}
                id={i}
                callback={(id) => {
                  let array = this.state.selectedLevel;
                  if (array[id] == false) array[id] = !array[id];
                  for (let j = 0; j < 3; j++) {
                    if (id != j) {
                      if (array[j]) array[j] = false;
                    } else {
                      array[j] = true;
                    }
                  }
                  this.setState({selectedLevel: array});
                }}
                click={this.state.selectedLevel}
              />
            ))}
          </View>
        );
        break;
      case '기간':
        return <DateModal />;
        break;
      case '시간대':
        return <TimeModal />;
        break;
      case '요일':
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              flex: 1,
            }}>
            {days.map((type, i) => (
              <Days
                day={type}
                key={i}
                id={i}
                callback={(id) => {
                  let array = this.state.selectedDays;
                  array[id] = !array[id];
                  this.setState({selectedDays: array});
                }}
                click={this.state.selectedDays}
              />
            ))}
          </View>
        );
    }
  }
  render() {
    return (
      <View style={styles.inputView}>
        <Text style={{fontSize: 19}}>{this.props.type} : </Text>
        {this.inputType(this.props.type)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 630,
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
    fontWeight: 'bold',
  },
  uploadView: {
    height: '70%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  inputView: {
    height: '13%',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  inputAreaView: {
    height: '35%',
    display: 'flex',
    //alignItems: 'center',
    paddingTop: '3%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
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
  modalBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCenter: {
    backgroundColor: 'white',
    height: '60%',
    paddingTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  modalBtn: {
    marginTop: '7%',
    backgroundColor: '#AFDCBD',
    borderRadius: 30,
    width: 200,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButton: {
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '25%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
  levelButtonSelected: {
    backgroundColor: '#AFDCBD',
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '25%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
  daysButton: {
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '12%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
  daysButtonSelected: {
    backgroundColor: '#AFDCBD',
    borderColor: '#AFDCBD',
    borderWidth: 2,
    width: '12%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingBottom: '2%',
  },
});
