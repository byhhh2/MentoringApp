import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ToastAndroid,
} from 'react-native';

export default class SetDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [false, false, false, false, false, false, false],
      dayModalVisible: false,
      setDay: false,
      screenDays: '',
    };
    this.getDaysInfo = this.getDaysInfo.bind(this);
  }
  getDaysInfo(days) {
    let array = days.filter((x) => {
      return x != false;
    });
    array = array.join();
    this.setState({screenDays: array});
  }
  render() {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    let array = this.state.selectedDays;
    return (
      <View style={styles.setView}>
        <Text style={[styles.text, {fontSize: 18, marginBottom: '2%'}]}>
          ✔ 요일 설정하기
        </Text>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => {
            this.setState({
              dayModalVisible: !this.state.dayModalVisible,
              setDay: false,
            });
          }}>
          {this.state.setDay ? (
            <Text
              style={[
                styles.bold,
                {
                  color: 'black',
                  fontSize: 15,
                },
              ]}>
              {this.state.selectedDays}
            </Text>
          ) : (
            <Text style={styles.text}>요일을 설정하려면 터치하세요.</Text>
          )}
        </TouchableOpacity>
        {this.state.dayModalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.dayModalVisible}
            onRequestClose={() => {
              this.setState({
                dayModalVisible: !this.state.dayModalVisible,
              });
            }}>
            <View style={styles.modalBack}>
              <View style={styles.modalCenter}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  {days.map((type, i) => (
                    <TouchableOpacity
                      id={i}
                      key={i}
                      style={
                        this.state.selectedDays[i]
                          ? styles.daysButtonSelected
                          : styles.daysButton
                      }
                      onPress={() => {
                        array[i] = !array[i];
                        if (array[i]) array[i] = days[i];
                        this.setState({selectedDays: array});
                      }}>
                      <Text style={[styles.text, {fontSize: 17}]}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.Btn}
                  onPress={() => {
                    let daysArray = this.state.selectedDays;
                    let arr = [false, false, false, false, false, false, false];
                    if (JSON.stringify(daysArray) === JSON.stringify(arr)) {
                      ToastAndroid.showWithGravity(
                        '요일을 설정하세요.',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                    } else {
                      this.setState({
                        dayModalVisible: !this.state.dayModalVisible,
                        setDay: true,
                      });
                      this.props.info(this.state.selectedDays);
                      this.getDaysInfo(this.state.selectedDays);
                    }
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
  modalBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCenter: {
    backgroundColor: 'white',
    height: '18%',
    width: '90%',
    paddingTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  Btn: {
    marginBottom: '4%',
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
