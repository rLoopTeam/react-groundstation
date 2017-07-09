import config from '../../config/commConfig';
import io from 'socket.io-client';

const ip = config.Appserver.ip;
const port = config.Appserver.port;
const socket = io.connect(ip + ':' + port, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

function createSocket () {
  return socket;
}

export default createSocket;
