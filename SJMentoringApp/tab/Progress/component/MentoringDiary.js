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

var cnt = 0;

export default class MentoringDiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      setModal: false,
      isUpdate: false,
      selectedRecord: 0,
      date: '',
      content: '',
      DATA: [],
      preDate: '',
      preContent: '',
    };
    this.handleDate = this.handleDate.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  componentDidMount() {
    this.getRecord();
  }
  handleDate(e) {
    if (e.length === 4) {
      e = e + '-';
      this.setState({date: e, preDate: e});
    }
    if (e.length === 7) {
      e = e + '-';
      this.setState({date: e, preDate: e});
    }
  }
  postRecord() {
    axios
      .post(
        `${axios.defaults.baseURL}/mentoring/${this.props.route.params.id}/record`,
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
        //console.log(response.data);
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  getRecord() {
    axios
      .get(
        `${axios.defaults.baseURL}/mentoring/${this.props.route.params.id}/record`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data);
        this.setState({DATA: response.data.data});
        cnt = response.data.data.length + 1;
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  saveRecord() {
    let data = {
      id: cnt + 1,
      date: this.state.date,
      content: this.state.content,
    };
    this.setState({DATA: this.state.DATA.concat(data)});
  }
  updateRecord() {
    axios
      .put(
        `${axios.defaults.baseURL}/mentoring/${this.state.selectedRecord}/record`,
        {
          date: this.state.preDate,
          content: this.state.preContent,
        },
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data);
        if (
          response.data.message ===
          `Record ID: '${this.state.selectedRecord}' has been updated successfully.`
        ) {
          this.getRecord();
        }
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  deleteRecord() {
    axios
      .delete(
        `${axios.defaults.baseURL}/mentoring/${this.state.selectedRecord}/record`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        //console.log(response.data);
        if (
          response.data.message ===
          `Record ID: '${this.state.selectedRecord}' has been deleted successfully.`
        ) {
          this.getRecord();
        }
      })
      .catch((error) => {
        console.log('wrong!');
        console.log(error.response);
      });
  }
  renderList = ({item}) => {
    // 멘토링 일지 하나하나
    return (
      <Pressable
        delayLongPress={500}
        onLongPress={() => {
          this.setState({
            setModal: true,
            selectedRecord: item.item.id,
            preDate: item.item.date,
            preContent: item.item.content,
          });
        }}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'white',
            marginBottom: '3%',
          },
        ]}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'GmarketSansTTFMedium',
              fontSize: 17,
              marginBottom: 5,
              color: 'black',
            }}>
            💡{' '}
            {item.item.date.length > 11
              ? item.item.date.slice(0, 10)
              : item.item.date}
          </Text>
          <Text
            style={{
              paddingLeft: '5%',
              fontSize: 17,
              marginBottom: '2%',
              fontFamily: 'GmarketSansTTFMedium',
              marginLeft: 10,
              color: 'gray',
            }}>
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
          <Text
            style={{
              fontSize: 26,
              marginBottom: '2%',
              fontFamily: 'GmarketSansTTFMedium',
              //color: '#498C5A',
              marginBottom: 6,
            }}>
            {this.props.route.params.lecture}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'GmarketSansTTFMedium',
              marginBottom: 3,
            }}>
            🐥 멘토 : {this.props.route.params.mentor}
          </Text>
          <Text
            style={{
              marginBottom: '3%',
              fontSize: 16,
              fontFamily: 'GmarketSansTTFMedium',
            }}>
            🐣 멘티 : {this.props.route.params.mentee}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'GmarketSansTTFMedium',
              //color: 'gray',
            }}>
            {this.props.route.params.finished
              ? '멘토링 완료 -'
              : `${this.props.route.params.start.slice(
                  0,
                  10,
                )} ~ ${this.props.route.params.end.slice(0, 10)}`}
          </Text>
        </View>
        <View style={styles.whiteView}>
          {this.props.route.params.finished ? (
            <View style={{height: '10%', width: '98%'}}></View>
          ) : (
            <View
              style={{
                height: '10%',
                width: '98%',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  paddingLeft: '5%',
                  color: 'gray',
                  fontSize: 13,
                  fontFamily: 'GmarketSansTTFMedium',
                }}>
                멘토링 기록을 꾹 눌러서 수정, 삭제해보세요! :-)
              </Text>

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
          )}

          <FlatList
            data={this.state.DATA}
            renderItem={(item) => {
              return this.renderList({item});
            }}
            key={(item) => item.id}
            style={{marginTop: 10}}
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
            <TouchableOpacity
              style={styles.modalBack}
              onPress={() => {
                this.setState({setModal: false});
              }}>
              <View
                style={[
                  styles.modal_edit,
                  {
                    justifyContent: 'center',
                    height: '20%',
                    paddingTop: 0,
                  },
                ]}>
                <TouchableOpacity
                  style={{
                    height: '20%',
                    marginBottom: '5%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                  }}
                  onPress={() => {
                    this.setState({
                      setModal: false,
                      modalVisible: true,
                      isUpdate: true,
                    });
                  }}>
                  <Text
                    style={{fontSize: 20, fontFamily: 'GmarketSansTTFMedium'}}>
                    수정하기
                  </Text>
                </TouchableOpacity>
                <View style={{height: '2%', backgroundColor: '#AFDCBD'}}></View>
                <TouchableOpacity
                  style={{
                    height: '20%',
                    marginTop: '5%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                  }}
                  onPress={() => {
                    this.setState({setModal: false});
                    this.deleteRecord();
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'red',
                      fontFamily: 'GmarketSansTTFMedium',
                    }}>
                    삭제하기
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
                  <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>
                    날짜{'  '}
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={
                      this.state.preDate.length === 0
                        ? this.state.date
                        : this.state.preDate
                    }
                    placeholder={'날짜를 입력하세요. (yyyy-mm-dd)'}
                    onChangeText={(value) => {
                      this.setState({date: value, preDate: value});
                      this.handleDate(value);
                    }}
                    maxLength={10}
                    style={{
                      color: 'gray',
                      fontFamily: 'GmarketSansTTFMedium',
                      width: '100%',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>
                    내용{'  '}
                  </Text>
                  <TextInput
                    placeholder={'내용을 입력하세요. '}
                    value={
                      this.state.preContent === 0
                        ? this.state.content
                        : this.state.preContent
                    }
                    onChangeText={(value) => {
                      this.setState({content: value, preContent: value});
                    }}
                    multiline={true}
                    style={{
                      width: '90%',
                      fontFamily: 'GmarketSansTTFMedium',
                      color: 'gray',
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={[styles.Btn, styles.LeftBtn]}
                    onPress={() => {
                      this.setState({modalVisible: false, isUpdate: false});
                    }}>
                    <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>
                      취소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.Btn, styles.RightBtn]}
                    onPress={() => {
                      if (this.state.content && this.state.date) {
                        if (!this.state.isUpdate) {
                          this.postRecord();
                          this.saveRecord();
                        } else {
                          this.updateRecord();
                        }
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
                    <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>
                      확인
                    </Text>
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
    height: 'auto',
    width: '90%',
    paddingTop: '3%',
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: '5%',
    paddingRight: '5%',
    //paddingVertical: '15%',
    paddingTop: '20%',
    paddingBottom: '15%',
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
  modal_edit: {
    backgroundColor: 'white',
    height: 300,
    width: '90%',
    paddingTop: '3%',
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
