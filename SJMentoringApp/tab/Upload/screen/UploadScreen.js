import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//Components
import UploadInput from '../component/UploadInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class UploadScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {selected: 0, value: ''};
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
          <UploadInput type={'과목'} />
          <UploadInput type={'수준'} />
          <UploadInput type={'요일'} />
          <UploadInput type={'시간대'} />
          <UploadInput type={'기간'} />
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
              onChangeText={(text) => this.setState({value: text})}
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

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
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
});
