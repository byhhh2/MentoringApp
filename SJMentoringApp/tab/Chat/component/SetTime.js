import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';

/**
 * TimePick Modal
 * by 예리
 */
export default class SetTime extends Component {
  constructor(props) {
    super(props);
    this.state = {timeModalVisible: false, time: new Date(), setTime: false};
  }
  render() {
    return (
      <View style={styles.setView}>
        <Text style={{fontSize: 18, marginBottom: '2%'}}>
          ✔ 시간대 설정하기
        </Text>
        <TouchableOpacity
          style={styles.modalBtn}
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
                fontWeight: 'bold',
              }}>{`${this.state.time.getHours()}시 ${this.state.time.getMinutes()}분`}</Text>
          ) : (
            <Text>시간대를 설정하려면 터치하세요.</Text>
          )}
        </TouchableOpacity>
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
                  style={styles.Btn}
                  onPress={() => {
                    this.setState({
                      timeModalVisible: !this.state.timeModalVisible,
                      setTime: true,
                    });
                    this.props.info(this.state.time);
                  }}>
                  <Text>확인</Text>
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
  modalBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCenter: {
    backgroundColor: 'white',
    height: '45%',
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
