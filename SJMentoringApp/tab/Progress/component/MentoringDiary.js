import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ToastAndroid,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

export default class MentoringDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      setModal: false,
      date: '',
      content: '',
      DATA: [
        {
          date: '2020-10-10',
          content: 'hi',
        },
      ],
    };
    this.handleDate = this.handleDate.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  componentDidMount() {
    //this.getRecord();
  }
  handleDate(e) {
    if (e.length === 4) {
      e = e + '-';
      this.setState({date: e});
    }
    if (e.length === 7) {
      e = e + '-';
      this.setState({date: e});
    }
  }
  postRecord() {
    axios
      .post(
        `http://34.64.111.90:8080/api/v1/mentoring/record/${this.props.route.params.id}`,
        {
          date: this.state.date,
          content: this.state.content,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  getRecord() {
    axios
      .get(
        `http://34.64.111.90:8080/api/v1/mentoring/${this.props.route.params.id}/record`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  saveRecord() {
    let data = {
      date: this.state.date,
      content: this.state.content,
    };
    this.setState({DATA: this.state.DATA.concat(data)});
  }
  renderList = ({item}) => {
    return (
      <Pressable
        delayLongPress={500}
        onLongPress={() => {
          this.setState({setModal: true});
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'white',
            marginBottom: '3%',
          },
        ]}>
        <View style={{width: '80%'}}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>
            💡{' '}
            {item.item.date.length > 11
              ? item.item.date.slice(0, 10)
              : item.item.date}
          </Text>
          <Text style={{paddingLeft: '5%', fontSize: 17, marginBottom: '2%'}}>
            {item.item.content}
          </Text>
        </View>
      </Pressable>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoView}>
          <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: '2%'}}>
            📝 {this.props.route.params.lecture}
          </Text>
          <Text style={{fontSize: 16}}>
            🐥 멘토 : {this.props.route.params.mentor}
          </Text>
          <Text style={{marginBottom: '3%', fontSize: 16}}>
            🐣 멘티 : {this.props.route.params.mentee}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {this.props.route.params.finished
              ? '멘토링 완료'
              : `${this.props.route.params.start.slice(
                  0,
                  10,
                )} ~ ${this.props.route.params.end.slice(0, 10)}`}
          </Text>
        </View>
        <View style={styles.whiteView}>
          <View
            style={{
              height: '10%',
              width: '98%',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({modalVisible: true});
              }}>
              <AntDesign
                name={'pluscircleo'}
                size={25}
                style={{color: '#99BFA5'}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.DATA}
            renderItem={(item) => {
              return this.renderList({item});
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        {this.state.setModal ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.setModal}
            onRequestClose={() => {
              this.setState({
                setModal: !this.state.setModal,
              });
            }}>
            <View style={styles.modalBack}>
              <View
                style={[
                  styles.modalCenter,
                  {
                    justifyContent: 'space-around',
                    height: '20%',
                    paddingTop: 0,
                  },
                ]}>
                <TouchableOpacity
                  style={{
                    height: '50%',
                    marginBottom: '5%',
                    backgroundColor: '#AFDCBD',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                  }}>
                  <Text style={{fontSize: 20}}>수정하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                    backgroundColor: '#AFDCBD',
                  }}>
                  <Text style={{fontSize: 20}}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <></>
        )}
        {this.state.modalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({
                modalVisible: !this.state.modalVisible,
              });
            }}>
            <View style={styles.modalBack}>
              <View style={styles.modalCenter}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text>날짜 : </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={this.state.date}
                    placeholder={'날짜를 입력하세요. (yyyy-mm-dd)'}
                    onChangeText={(value) => {
                      this.setState({date: value});
                      this.handleDate(value);
                    }}
                    maxLength={10}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text>내용 : </Text>
                  <TextInput
                    placeholder={'내용을 입력하세요. (최대 3줄 작성 가능)'}
                    value={this.state.content}
                    onChangeText={(value) => {
                      this.setState({content: value});
                    }}
                    maxLength={57}
                    multiline={true}
                    style={{
                      width: '80%',
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={[styles.Btn, styles.LeftBtn]}
                    onPress={() => {
                      this.setState({modalVisible: false});
                    }}>
                    <Text>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.Btn, styles.RightBtn]}
                    onPress={() => {
                      if (this.state.content && this.state.date) {
                        //this.postRecord();
                        this.saveRecord();
                        this.setState({
                          modalVisible: false,
                          date: '',
                          content: '',
                        });
                      } else {
                        ToastAndroid.showWithGravity(
                          '날짜, 내용을 모두 입력하세요.',
                          ToastAndroid.SHORT,
                          ToastAndroid.CENTER,
                        );
                      }
                    }}>
                    <Text>확인</Text>
                  </TouchableOpacity>
                </View>
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
  container: {
    flex: 1,
    backgroundColor: '#AFDCBD',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  whiteView: {
    backgroundColor: 'white',
    height: '75%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    //paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '5%',
  },
  infoView: {
    height: '19%',
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '2%',
    display: 'flex',
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
    height: 230,
    width: '90%',
    paddingTop: '3%',
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  Btn: {
    marginTop: '7%',
    backgroundColor: '#AFDCBD',
    borderRadius: 30,
    width: 100,
    height: 40,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeftBtn: {
    borderRightColor: '#99BFA5',
    borderRightWidth: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  RightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});
