import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

/**
 * upload form not completed yet
 * 21.06.16 by 예리
 */

export default class UploadScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {selected: true};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.settingView}>
          <TouchableOpacity
            style={
              this.state.selected
                ? styles.settingLeftBtnSelected
                : styles.settingLeftBtn
            }
            onPress={() => {
              this.state.selected
                ? null
                : this.setState({selected: !this.state.selected});
            }}>
            <Text style={styles.buttonText}>멘토</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.selected
                ? styles.settingRightBtn
                : styles.settingRightBtnSelected
            }
            onPress={() => {
              this.state.selected
                ? this.setState({selected: !this.state.selected})
                : null;
            }}>
            <Text style={styles.buttonText}>멘티</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.uploadView}>
          <Input type={'과목'} />
          <Input type={'수준'} />
          <Input type={'기간'} />
          <Input type={'시간대'} />
          <Input type={'하고 싶은 말'} />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{fontSize: 17}}>등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.inputView}>
        <Text style={{fontSize: 19}}>{this.props.type} : </Text>
        <TextInput placeholder={`${this.props.type} 입력하세요.`} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  settingView: {
    marginTop: '3%',
    height: '8%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: '4%',
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
