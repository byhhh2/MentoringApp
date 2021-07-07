import React, {Component, PureComponent, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import io from 'socket.io-client';

// const socket = io('http://34.64.111.90:8080/');
// socket.on('connect', () => {
//   console.log(socket.id);
//   console.log('connection');
//   //socket.emit('joinRoom', yh);
// });

const ChatTest = () => {
  //const [user_id, setUser_id] = useState('변영화');

  const [yh, setYh] = useState(18011564);
  const [ms, setMs] = useState(18011531);

  useEffect(() => {
    //connectSocket();
    //console.log(yh);
  }, []);

  const connectSocket = () => {
    socket.on('connect', () => {
      console.log(socket.id);
      console.log('connection');
      //socket.emit('joinRoom', yh);
    });

    socket.on('connection', (socket) => {
      socket.on('disconnecting', (reason) => {
        console.log(socket.rooms);
        console.log(reason);
        // Set { ... }
      });
    });

    socket.on('disconnecting', (reason) => {
      console.log(socket.rooms);
      console.log(reason);
      // Set { ... }
    });

    //console.log('시작');
    console.log(socket.id);
  };

  const ButtonClick = () => {
    const str = 'yh';
    socket.emit('alert', str);
    console.log('버튼 누름');
  };

  return (
    <View>
      <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>chattest</Text>
      <TouchableOpacity onPress={ButtonClick}>
        <Text style={{fontFamily: 'GmarketSansTTFMedium'}}>버튼</Text>
      </TouchableOpacity>
    </View>
  );
};

// class ChatTest extends PureComponent {
//   //var socket;
//   constructor(props) {
//     super(props);
//     this.state = {
//       socket: io.connect('http://34.64.111.90:8080/api/v1'),
//     };
//   }

//   componentWillMount() {
//     this.state.socket = io.connect('http://34.64.111.90:8080/api/v1');
//     this.connectSocket();
//   }

//   connectSocket() {
//     this.state.socket.on('connect', () => {
//       console.log(socket.id);
//       console.log('connection');
//     });

//     this.state.socket.on('disconnect', () => {
//       //console.log(socket.id);
//       console.log('연결안됨');
//     });

//     //this.state.socket.emit('joinRoom', yh);
//     console.log('시작');
//     //console.log(socket);
//   }

//   ButtonClick() {
//     const str = 'yh';
//     this.state.socket.emit('alert', str);
//     console.log('버튼 누름');
//   }

//   render() {
//     return (
//       <View>
//         <Text>chattest</Text>
//         <TouchableOpacity onPress={this.ButtonClick}>
//           <Text>버튼</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

export default ChatTest;
