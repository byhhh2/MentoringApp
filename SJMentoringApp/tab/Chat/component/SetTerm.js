import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

/**
 * DatePick Modal
 * by 예리
 */
export default class SetTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateModalVisible: false,
      start: null,
      end: null,
      setTime: false,
    };
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
    const minDate = new Date(); //today
    const maxDate = new Date(2021, 12, 31);
    let startDate = this.state.start ? new Date(this.state.start) : new Date();
    let endDate = this.state.end ? new Date(this.state.end) : new Date();
    return (
      <View style={styles.setView}>
        <Text style={[styles.text, {fontSize: 18, marginBottom: '2%'}]}>
          ✔ 기간 설정하기
        </Text>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => {
            this.setState({
              dateModalVisible: !this.state.dateModalVisible,
              setTime: false,
            });
          }}>
          {this.state.setTime ? (
            <Text
              style={[
                styles.bold,
                {
                  color: 'black',
                  fontSize: 15,
                },
              ]}>
              {`${startDate.getFullYear()}년 ${
                startDate.getMonth() + 1
              }월 ${startDate.getDate()}일 - ${endDate.getFullYear()}년 ${
                endDate.getMonth() + 1
              }월 ${endDate.getDate()}일`}
            </Text>
          ) : (
            <Text style={styles.text}>기간을 설정하려면 터치하세요.</Text>
          )}
        </TouchableOpacity>

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
                  selectedDayColor="#AFDCBD"
                  selectedDayTextColor="green"
                  onDateChange={this.onDateChange}
                />
                <TouchableOpacity
                  style={styles.Btn}
                  onPress={() => {
                    this.setState({
                      dateModalVisible: !this.state.dateModalVisible,
                      setTime: true,
                    });
                    this.props.info(startDate, endDate);
                  }}>
                  <Text style={styles.bold}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </View>
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
  Btn: {
    marginTop: '7%',
    backgroundColor: '#AFDCBD',
    borderRadius: 30,
    width: 200,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setView: {
    height: '10%',
    width: '90%',
    paddingLeft: '3%',
    paddingRight: '3%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  modalBtn: {
    height: '50%',
    width: '100%',
    paddingLeft: '7%',
    display: 'flex',
    justifyContent: 'center',
  },
});
