import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal} from 'react-native';
//Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
//axios
import axios from 'axios';

//redux
import {connect} from 'react-redux';

const Contents = (props) => {
  // useEffect(() => {
  //   console.log(props.route.params.user_info);
  // }, []);

  const [deleted, setDeleted] = useState(false);

  const deletePost = () => {
    axios
      .delete(
        `${axios.defaults.baseURL}/post/${props.route.params.user_info.id}`,
        {
          headers: {
            Authorization: axios.defaults.headers.common['Authorization'],
          },
        },
      )
      .then((response) => {
        if (
          response.data.message ===
          `Post ID: '${props.route.params.user_info.id}' has been deleted successfully.`
        ) {
          props.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createRoom = () => {
    const you = props.route.params.user_info.student_id;
    const mine = props.route.params.user_id;
    //console.log(mine, you);
    props.socket.emit('joinRoom', {
      user1: mine,
      user2: you,
      post: props.route.params.user_info.id,
    });

    // props.socket.on('roomId', (room) => {
    //   //console.log('room_id?', room);
    //   setRoomId(room);
    //   console.log(roomId);
    // });
  };
  console.log(props.user_id, props.route.params.user_info.student_id);
  return (
    <View style={styles.container}>
      {deleted ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={deleted}
          onRequestClose={() => {
            setDeleted(!deleted);
          }}>
          <View style={styles.modalBack}>
            <View style={styles.modalCenter}>
              <View style={{marginBottom: '10%'}}>
                <Text>이 게시물을 삭제하시겠습니까?</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.modalLeftBtn}
                  onPress={() => {
                    setDeleted(false);
                  }}>
                  <Text>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalRightBtn}
                  onPress={() => {
                    deletePost();
                    setDeleted(false);
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
      {/* user info */}
      <View style={styles.user_info_view}>
        {props.route.params.user_id ===
        props.route.params.user_info.student_id ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              backgroundColor: '#AFDCBD',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('수정하기', {
                  user_info: {
                    level: props.route.params.user_info.level,
                    subject: props.route.params.user_info.subject,
                    role: props.route.params.user_info.role,
                    start_date: props.route.params.user_info.start_date,
                    end_date: props.route.params.user_info.end_date,
                    time: props.route.params.user_info.time,
                    day: props.route.params.user_info.day,
                    content: props.route.params.user_info.content,
                    id: props.route.params.user_info.id,
                    name: props.route.params.user_info.name,
                  },
                });
              }}>
              <FontAwesome name={'pencil-square-o'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: '6%'}}
              onPress={() => {
                setDeleted(true);
              }}>
              <AntDesign name={'delete'} size={23} color={'red'} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        <Text style={styles.green_font}>
          {props.route.params.user_info.role === 1 ? '멘토' : '멘티'}
          {'   ✔'}
        </Text>
        <Text style={styles.base_font}>
          {props.route.params.user_info.name}
          <Text style={styles.white_font}>
            {'     '}
            {/*{props.route.params.user_info.gender}*/}
            여성
          </Text>
        </Text>
      </View>
      {/* class info */}
      <View style={styles.base_view}>
        <View style={styles.flex_direction_row}>
          <Text style={styles.class_font}>
            {props.route.params.user_info.subject}
          </Text>
          <Text style={styles.small_font}>수준</Text>
          <Text style={styles.green_font}>
            {props.route.params.user_info.level}
          </Text>
        </View>
        <View>
          <View style={styles.flex_direction_row}>
            <Text style={styles.green_font}>기간 </Text>
            <Text style={styles.small_font}>
              {props.route.params.user_info.start_date.toString().slice(0, 10)}{' '}
              ~ {props.route.params.user_info.end_date.toString().slice(0, 10)}
            </Text>
          </View>
          <View style={styles.flex_direction_row}>
            <Text style={styles.green_font}>요일 </Text>
            <Text style={styles.small_font}>
              {props.route.params.user_info.day}
            </Text>
          </View>
          <View style={styles.flex_direction_row}>
            <Text style={styles.green_font}>시간 </Text>
            <Text style={styles.small_font}>
              {props.route.params.user_info.time}
            </Text>
          </View>
        </View>
      </View>
      {/* text */}
      <View style={styles.text_view}>
        <Text style={styles.base_font}>
          {props.route.params.user_info.content}
        </Text>
      </View>
      <View>
        {props.route.params.user_id !=
        props.route.params.user_info.student_id ? (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => {
              createRoom();
              props.navigation.navigate('채팅방', {
                lecture: props.route.params.user_info.subject,
                name: props.route.params.user_info.name,
                role: props.route.params.user_info.role == 1 ? '멘토' : '멘티',
                text: props.route.params.user_info.content,
                matched:
                  props.route.params.user_info.is_matched === 0 ? false : true,
                mine: props.route.params.user_id, //로그인 한 사람 id
                you: props.route.params.user_info.student_id, //글을 쓴 사람 학번
                post_id: props.route.params.user_info.id,
                info: props.route.params.user_info,
                post_student_id: props.route.params.user_info.student_id,
              });
            }}>
            <Text style={{fontWeight: 'bold'}}>채팅하기</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //margin: 10,
    flex: 1,
    backgroundColor: 'white',
  },
  base_font: {
    fontSize: 20,
    margin: 10,
  },
  small_font: {
    fontSize: 18,
    margin: 10,
  },
  base_view: {
    //borderBottomColor: '#99BFA5',
    //borderBottomWidth: 1,
    padding: 20,
  },
  green_font: {
    fontSize: 20,
    color: '#498C5A',
    fontWeight: 'bold',
    margin: 10,
  },
  user_info_view: {
    backgroundColor: '#AFDCBD',
    //padding: 10,
    padding: 20,
    //alignItems: 'center',
  },
  flex_direction_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  class_font: {
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
  },
  pink_font: {
    color: '#F2BBBB',
    fontSize: 20,
    margin: 10,
  },
  white_font: {
    color: '#498C5A',
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
  },
  text_view: {
    padding: 20,
    borderRadius: 20,
    borderColor: '#498C5A',
    borderWidth: 1,
    //backgroundColor: '#F0F2AE',
    width: '97%',
    height: '30%',
    marginLeft: 5,
    marginRight: 5,
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
    height: '25%',
    width: '60%',
    paddingTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '5%',
    borderRadius: 30,
  },
  modalLeftBtn: {
    marginTop: '7%',
    backgroundColor: '#AFDCBD',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderRightColor: 'gray',
    borderRightWidth: 1,
    width: 100,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRightBtn: {
    marginTop: '7%',
    backgroundColor: '#AFDCBD',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    width: 100,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButton: {
    width: '90%',
    height: 35,
    //borderWidth: 1,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#AFDCBD',
  },
});

const mapStateToProps = (state) => ({
  socket: state.userReducer.socket,
});

export default connect(mapStateToProps, null)(Contents);

//export default Contents;
