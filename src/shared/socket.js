import config from '../../config/commConfig';
import io from 'socket.io-client';

const ip = config.Appserver.ip;
const port = config.Appserver.port;
var sockets = {};

/**
 * Creates a socket and caches it in the sockets object.
 *
 * @param {string} socketName Name of the socket to get or set in the cache. [Defaults to 'default']
 * @param {string} endpoint URI of the client facing endpoint the socket is connected to.
 *
 */
function createSocket (socketName, endpoint) {
  if (typeof socketName === 'undefined') {
    socketName = 'default';
  }

  if (typeof endpoint === 'undefined') {
    endpoint = '';
  }

  if (typeof sockets[socketName] === 'undefined') {
    sockets[socketName] = io.connect(ip + ':' + port + endpoint, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
  }

  return sockets[socketName];
}

export default createSocket;
