import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
    };
    this.loadMsgList();
    //console.log(this.props.socket); //내학번
  }

  loadMsgList = () => {
    //let page = 1;
    axios
      .get(`${axios.defaults.baseURL}/chat?page=${this.state.page}`, {
        headers: {
          Authorization: axios.defaults.headers.common['Authorization'],
        },
      })
      .then((response) => {
        this.setState({data: response.data.data});
        this.setState({page: this.state.page + 1});
        //console.log(response.data.data);
        //console.log(this.state.data);
        //page++;
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.data == null ? (
          <View style={styles.no_chat}>
            <Text
              style={{
                fontFamily: 'GmarketSansTTFMedium',
                fontSize: 16,
                color: 'gray',
              }}>
              채팅이 존재하지 않습니다.
            </Text>
          </View>
        ) : (
          <></>
        )}
        <FlatList
          data={this.state.data}
          renderItem={(item) => {
            return renderList(
              {item},
              this.props.navigation,
              this.props.student_id,
              this.props.socket,
            );
          }}
          keyExtractor={(item) => item.room_id}
          onEndReached={this.loadMsgList}
        />
      </View>
    );
  }
}

const renderList = ({item}, navigation, student_id, socket) => {
  return (
    <ChatList
      item={item}
      navi={navigation}
      my_id={student_id}
      socket={socket}
    />
  );
};

class ChatList extends PureComponent {
  constructor(props) {
    super(props);
    //console.log(props);
    //console.log(this.props);
  }
  render() {
    //console.log('채팅 리스트 ', this.props.item.item);
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.socket.emit('joinRoom', {
            user1: this.props.item.item.user1,
            user2: this.props.item.item.user2,
            post: this.props.item.item.post_id,
          });
          this.props.navi.navigate('채팅방', {
            lecture: this.props.item.item.subject,
            name: this.props.item.item.post_name,
            role: this.props.item.item.role,
            text: this.props.item.item.content,
            matched: this.props.item.item.is_matched == 0 ? false : true,
            mine: this.props.my_id, //내학번
            you:
              this.props.item.item.user2 == this.props.my_id
                ? this.props.item.item.user1
                : this.props.item.item.user2,
            post_id: this.props.item.item.post_id,
            info: this.props.item.item,
            post_student_id: this.props.item.item.post_student_id,
            mentor_name:
              this.props.item.item.role == '멘토'
                ? this.props.item.item.post_name
                : this.props.item.item.post_name ==
                  this.props.item.item.user1_name
                ? this.props.item.item.user2_name
                : this.props.item.item.user1_name,
            mentee_name:
              this.props.item.item.role == '멘티'
                ? this.props.item.item.post_name
                : this.props.item.item.post_name ==
                  this.props.item.item.user1_name
                ? this.props.item.item.user2_name
                : this.props.item.item.user1_name,
          });
        }}>
        <View style={styles.list}>
          <View style={styles.matchedView}>
            <Text style={[styles.bold, {fontSize: 14, color: '#498C5A'}]}>
              {this.props.item.item.is_matched == 1 ? '매칭 완료' : '모집중'}
            </Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.nameText}>
              {this.props.item.item.room_name}
            </Text>
            <Text style={styles.text}>{this.props.item.item.msg}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.text}>
              {this.props.item.item.time.substring(11, 16)}
            </Text>
          </View>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    height: 70,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginLeft: '3%',
    marginRight: '3%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchedView: {
    width: '20%',
    height: '85%',
    marginRight: '2%',
    //borderRadius: 100,
    borderColor: '#AFDCBD',
    //borderWidth: 2,
    //backgroundColor: '#AFDCBD',
    //borderRightWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  contentView: {
    width: '60%',
    marginRight: '1%',
  },
  timeView: {
    width: '25%',
    marginRight: 20,
  },
  nameText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 18,
    marginBottom: 5,
  },
  no_chat: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
});

export default connect(mapStateToProps, null)(ChatScreen);
