import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import io from 'socket.io-client';

//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

//component
import SpeechBubble from './SpeechBubble';

/*
            "id": 1,
            "sender": 18011531,
            "content": "ㅎㅇ",
            "time": "2021-07-01T15:07:55.000Z",
            "is_checked": 0
        
*/

var cnt;
var flag = 0;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      msgs: [],
      refresh: false,
      page: 1,
      prevMsg: '',
    };
    this.loadMsg();
    setInterval(() => this.onMsg(), 3000);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: ``,
      headerRight: () => (
        <View style={styles.edit}>
          <TouchableOpacity
            style={{marginRight: 165}}
            onPress={() => {
              this.props.navigation.navigate('상대 프로필', {
                other_student_id: this.props.route.params.you,
              });
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'GmarketSansTTFMedium',
              }}>
              {this.props.route.params.mentor_name == this.props.user_name
                ? this.props.route.params.mentee_name
                : this.props.route.params.mentor_name}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  loadMsg = () => {
    let page_test = 1;
    axios
      .get(
        `${axios.defaults.baseURL}/chat/${this.props.route.params.post_id}/${this.props.route.params.you}?page=${this.state.page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({msgs: this.state.msgs.concat(response.data.data)});
        cnt = this.state.msgs.length;
        this.setState({page: this.state.page + 1});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sentMsg = () => {
    cnt++;
    if (this.state.msg != '') {
      this.props.socket.emit('chatMessage', {
        msg: this.state.msg,
        sender: this.props.route.params.mine,
        receiver: this.props.route.params.you,
        post: this.props.route.params.post_id,
      });
      this.state.msgs.push({
        id: cnt,
        sender: this.props.route.params.mine,
        content: this.state.msg,
        time: new Date().toString(),
        is_checked: 0,
      });
      this.setState({
        refresh: !this.state.refresh,
        msg: '',
      });
    }
  };

  onMsg = () => {
    this.props.socket.on('receiveMsg', ({sender, msg, time}) => {
      if (msg != this.state.prevMsg) {
        this.setState({prevMsg: msg});
        cnt++;
        this.state.msgs.push({
          id: cnt,
          sender: sender,
          content: msg,
          time: time,
          is_checked: 0,
        });
        this.setState({
          refresh: !this.state.refresh,
          msg: '',
        });
      }
    });
    return;
  };

  render() {
    //console.log(this.props.route.params.socket);
    //console.log(this.props.socket.id);
    //console.log(this.props.route.params.mine, this.props.route.params.you);
    //console.log(this.props.route.params.info);
    //console.log(this.props.user_id, this.props.route.params.post_student_id);

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <View style={styles.fixedInfoView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.bold,
                  {
                    marginRight: '2%',
                    fontSize: 20,
                  },
                ]}>
                {this.props.route.params.matched ? '매칭 완료' : '모집중'}
              </Text>
              <Text style={[styles.text, {fontSize: 20, marginRight: '3%'}]}>
                {this.props.route.params.lecture}
              </Text>
              <Text
                style={[
                  styles.bold,
                  {
                    color: '#498C5A',
                    marginRight: '1%',
                  },
                ]}>
                {this.props.route.params.role}
              </Text>
              <Text style={styles.text}>{this.props.route.params.name}</Text>
            </View>
            <View
              style={{
                height: '33%',
                paddingTop: '1%',
                paddingLeft: '1%',
                paddingRight: '1%',
              }}>
              <Text
                style={[styles.text, {color: 'gray'}]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {this.props.route.params.text}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40%',
              }}>
              {/*내 게시물이고, 아직 모집중일 때 멘토링 신청서*/}
              {this.props.user_id === this.props.route.params.post_student_id && //this.props.route.params.mine이 아니라 you 아닌가?
              !this.props.route.params.matched ? (
                <TouchableOpacity
                  style={styles.mentoringBtn}
                  onPress={() => {
                    this.props.navigation.navigate('멘토링 신청서', {
                      info: this.props.route.params.info,
                      mentor_name: this.props.route.params.mentor_name,
                      mentee_name: this.props.route.params.mentee_name,
                    });
                  }}>
                  <Text style={styles.text}>멘토링 신청서 작성하기</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.mentoringBtn}
                  onPress={() => {
                    this.props.navigation.navigate('상대 프로필', {
                      other_student_id: this.props.route.params.you,
                    });
                  }}>
                  <Text style={styles.text}>상대 프로필 보러가기</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {/* 채팅화면 */}

        <View style={styles.chatView}>
          {/* <Text style={{textAlign: 'center', color: 'gray'}}>
            채팅을 통해서{'\n'}멘토 멘티 매칭을 이루어보세요 !
          </Text> */}
          <FlatList
            data={this.state.msgs}
            renderItem={({item}) => {
              return (
                <View
                  style={
                    item.sender === this.props.route.params.mine
                      ? styles.speech_bubble_mine
                      : styles.speech_bubble_you
                  }>
                  <Text style={styles.text}>{item.content}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            extraData={this.state.refresh}
            onEndReached={this.loadMsg}
          />
        </View>
        <View style={styles.textBox}>
          <TextInput
            style={styles.textInput}
            value={this.state.msg}
            onChangeText={(text) => {
              //console.log(text);
              this.setState({msg: text});
              //console.log(this.state.msg);
            }}
          />
          <TouchableOpacity onPress={this.sentMsg}>
            <Text style={[styles.text, {color: '#498C5A', fontSize: 15}]}>
              전송
            </Text>
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoBox: {
    marginTop: '1%',
    height: 120,
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  fixedInfoFiew: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: 400,
    height: 100,
  },
  mentoringBtn: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatView: {
    flex: 1,
    padding: 10,
  },
  textBox: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AFDCBD',
    padding: '3%',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    borderStyle: 'dashed',
    width: '80%',
    marginRight: 20,
    padding: 15,
    fontSize: 15,
    fontFamily: 'GmarketSansTTFMedium',
  },
  speech_bubble_mine: {
    width: 'auto',
    height: 40,
    backgroundColor: '#AFDCBD',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'flex-end',
  },
  speech_bubble_you: {
    width: 'auto',
    height: 40,
    backgroundColor: '#F0F2AE',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'flex-start',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
  user_id: state.userReducer.user_id,
  user_name: state.userReducer.user_name,
});

export default connect(mapStateToProps, null)(Chat);
