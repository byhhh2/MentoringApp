import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';

/**
 * TimePick Modal
 * by 예리
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
        {this.state.setTime && this.props.refresh === false ? (
          <Text
            style={[
              styles.text,
              {
                color: 'black',
                fontSize: 18,
              },
            ]}>{`${this.state.time.getHours()}시 ${this.state.time.getMinutes()}분`}</Text>
        ) : (
          <Text style={[styles.text, {color: 'gray'}]}>
            {this.props.initValue
              ? `${this.props.initValue}`
              : `여기를 클릭하세요.`}
          </Text>
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
                    this.props.info(this.state.time);
                  }}>
                  <Text style={styles.bold}>확인</Text>
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
