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
 * TimePick Modal
 * 21.06.17 by 예리
 */
export default class TimeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {timeModalVisible: false, time: new Date(), setTime: false};
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            timeModalVisible: !this.state.timeModalVisible,
            setTime: false,
          });
        }}>
        {this.state.setTime ? (
          <Text
            style={{
              color: 'black',
              fontSize: 18,
            }}>{`${this.state.time.getHours()}시 ${this.state.time.getMinutes()}분`}</Text>
        ) : (
          <Text style={{color: 'gray'}}>여기를 클릭하세요.</Text>
        )}

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
                <DatePicker
                  date={this.state.time}
                  mode={'time'}
                  onDateChange={(date) => {
                    this.setState({time: date});
                  }}
                />
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {
                    this.setState({
                      timeModalVisible: !this.state.timeModalVisible,
                      setTime: true,
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
    height: '50%',
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
