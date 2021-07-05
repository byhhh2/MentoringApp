import {CONNECT_SOCKET, INIT_ID} from './action';

import io from 'socket.io-client';

const initialSocket = {
  socket: io('http://34.64.111.90:8080/'),
  user_id: '',
};

const userReducer = (state = initialSocket, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        //socket: io('http://34.64.111.90:8080/'),
      };

    case INIT_ID:
      return {
        ...state,
        user_id: action.user_id,
      };

    default:
      return state;
  }
};

export default userReducer;
