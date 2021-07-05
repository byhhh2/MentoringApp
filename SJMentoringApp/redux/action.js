export const CONNECT_SOCKET = 'CONNECT_SOCKET';

import io from 'socket.io-client';

export function connectSocket() {
  return {
    type: CONNECT_SOCKET,
    //socket: io('http://34.64.111.90:8080/'),
  };
}
