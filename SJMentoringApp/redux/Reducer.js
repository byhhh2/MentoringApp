import {CONNECT_SOCKET} from './action';

import io from 'socket.io-client';

const initialSocket = {
  socket: io('http://34.64.111.90:8080/'),
};

const userReducer = (state = initialSocket, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        //socket: io('http://34.64.111.90:8080/'),
      };

    default:
      return state;
  }
};

export default userReducer;
