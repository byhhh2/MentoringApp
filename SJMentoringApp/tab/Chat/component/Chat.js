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
//var socket_;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      msgs: [
        // {
        //   id: 55,
        //   sender: 18011564,
        //   content: '안녕!',
        //   time: '',
        //   is_checked: 0,
        // },
        // {
        //   id: 56,
        //   sender: 18011531,
        //   content: '안녕하세요',
        //   time: '',
        //   is_checked: 0,
        // },
      ],
      refresh: false,
    };
    this.loadMsg();
    //console.log(this.props);
    //socket_ = this.props.socket;
    //this.onMsg();
  }

  loadMsg = () => {
    let page = 1;
    axios
      .get(
        `http://34.64.111.90:8080/api/v1/chat/${this.props.route.params.post_id}/${this.props.route.params.you}?page=${page}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        this.setState({msgs: this.state.msgs.concat(response.data.data)});
        //console.log(this.state.msgs);
        cnt = this.state.msgs.length;
        page++;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sentMsg = () => {
    cnt++;
    //console.log('버튼 클릭');
    if (this.state.msg != '') {
      this.props.socket.emit('chatMessage', {
        msg: this.state.msg,
        sender: this.props.route.params.mine,
        receiver: this.props.route.params.you,
        post: this.props.route.params.post_id,
      });
      this.state.msgs.push({
        id: cnt,
        //who: 'sender',
        sender: this.props.route.params.mine,
        content: this.state.msg,
        time: new Date().toString(),
        is_checked: 0,
        //text: this.state.msg,
      });
      this.setState({
        refresh: !this.state.refresh,
        msg: '',
      });
    }
  };

  onMsg = () => {
    //메시지 받는거
    this.props.socket.on('receiveMsg', (sender, msg, time) => {
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
    });
  };

  _onPressFunc(matched) {
    if (!matched) {
      this.props.navigation.navigate('멘토링 신청서', {
        info: this.props.route.params.info,
      });
    }
  }

  render() {
    this.props.socket.on('receiveMsg', (sender, msg, time) => {
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
    });
    //console.log(this.props.route.params);
    //console.log(this.props.route.params.socket);
    //console.log(this.props.socket.id);
    //console.log(this.props.route.params.mine, this.props.route.params.you);
    //console.log(this.props.route.params.info);
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
                style={{
                  fontWeight: 'bold',
                  marginRight: '2%',
                  fontSize: 20,
                }}>
                {this.props.route.params.matched ? '매칭 완료' : '모집중'}
              </Text>
              <Text style={{fontSize: 20, marginRight: '3%'}}>
                {this.props.route.params.lecture}
              </Text>
              <Text
                style={{
                  color: '#498C5A',
                  marginRight: '1%',
                  fontWeight: 'bold',
                }}>
                {this.props.route.params.role}
              </Text>
              <Text>{this.props.route.params.name}</Text>
            </View>
            <View
              style={{
                height: '33%',
                paddingTop: '1%',
                paddingLeft: '1%',
                paddingRight: '1%',
              }}>
              <Text style={{color: 'gray'}}>
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
              <TouchableOpacity
                style={styles.mentoringBtn}
                onPress={() => {
                  this._onPressFunc(this.props.route.params.matched);
                }}>
                {this.props.user_id === this.props.route.params.mine &&
                !this.props.route.params.matched ? (
                  <Text style={{fontWeight: 'bold'}}>
                    멘토링 신청서 작성하기
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>프로필 보러가기</Text>
                )}
              </TouchableOpacity>
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
                  <Text>{item.content}</Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            extraData={this.state.refresh}
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
            <Text style={{color: '#498C5A', fontSize: 15, fontWeight: 'bold'}}>
              전송
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const speechBubble = () => {
  return (
    <View style={styles.speech_bubble}>
      <Text>안녕</Text>
    </View>
  );
};

// class speechBubble extends Component {
//   render() {
//     return (
//       <View style={styles.speech_bubble}>
//         <Text>안녕</Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
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
    //display: 'flex',
    //justifyContent: 'center',
    //alignItems: 'flex-end',
    padding: 10,
  },
  textBox: {
    //borderWidth: 1,
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
    backgroundColor: '#AFDCBD',
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
});

export default connect(mapStateToProps, null)(Chat);
