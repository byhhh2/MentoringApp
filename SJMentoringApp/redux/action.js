export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const INIT_ID = 'INIT_ID';

import io from 'socket.io-client';

export function connectSocket() {
  return {
    type: CONNECT_SOCKET,
    //socket: io('http://34.64.111.90:8080/'),
  };
}

export function initId(user_id) {
  return {
    type: INIT_ID,
    user_id: user_id,
  };
}
