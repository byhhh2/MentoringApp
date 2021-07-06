export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const INIT_ID = 'INIT_ID';
export const INIT_NAME = 'INIT_NAME';

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

export function initName(user_name) {
  return {
    type: INIT_NAME,
    user_name: user_name,
  };
}
