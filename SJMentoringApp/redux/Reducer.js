import {CONNECT_SOCKET, INIT_ID, INIT_NAME} from './action';

import io from 'socket.io-client';

const initialSocket = {
  socket: io('http://34.133.177.64:8080/'),
  user_id: '',
  user_name: '',
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

    case INIT_NAME:
      return {
        ...state,
        user_name: action.user_name,
      };

    default:
      return state;
  }
};

export default userReducer;
