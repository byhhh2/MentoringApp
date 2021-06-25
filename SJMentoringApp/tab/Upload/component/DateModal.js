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
export default class DateModal extends Component {
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
      <TouchableOpacity
        onPress={() => {
          this.setState({
            dateModalVisible: !this.state.dateModalVisible,
            setTime: false,
          });
        }}>
        {this.state.setTime ? (
          <Text
            style={{
              color: 'black',
              fontSize: 15,
            }}>
            {`${startDate.getFullYear()}년 ${startDate.getMonth()}월 ${startDate.getDate()}일 - ${endDate.getFullYear()}년 ${endDate.getMonth()}월 ${endDate.getDate()}일`}
          </Text>
        ) : (
          <Text style={{color: 'gray'}}>여기를 클릭하세요.</Text>
        )}

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
                  style={styles.modalBtn}
                  onPress={() => {
                    this.setState({
                      dateModalVisible: !this.state.dateModalVisible,
                      setTime: true,
                    });
                    this.props.info(startDate, endDate);
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

const styles = StyleSheet.create({
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
});
