const packetDefinitions = require('../../config/packetDefinitions.json').packetDefinitions;
const bin = require('../../server/udp/binary.js');
const commConfig = require('../../config/commConfig.js');
const dgram = require('dgram');
const udpHelpers = require('../../server/udp/helpers.js');

const PACKET_INTERVAL = parseInt(process.env.RLOOP_PACKET_INTERVAL) || 1;

function toBytes (parameterType, data) {
  switch (parameterType) {
    case 'uint8': return bin.uint8ToBytes(data, true);
    case 'int8': return bin.int8ToBytes(data, true);
    case 'int16': return bin.int16ToBytes(data, true);
    case 'uint16': return bin.uint16ToBytes(data, true);
    case 'uint32': return bin.uint32ToBytes(data, true);
    case 'int32': return bin.int32ToBytes(data, true);
    case 'float32': return bin.float32ToBytes(data, true);
    case 'float64': return bin.float64ToBytes(data, true);
    default: console.error(`Unknown data type '${parameterType}'`); break;
  }
}

function generatePacket (packetName) {
  /**
   * Returns a packet with random data of a certain typeto be sent over UDP to the Ground Station.
   */

  let packetDefintion;
  let payload = [];
  let inLoop = false;
  let loopIterations = Math.floor(Math.random() * 4);
  let loopIteration = 0;
  let loopBeginIndex = -1;

  for (let i = 0, len = packetDefinitions.length; i < len; i++) {
    if (packetDefinitions[i].Name === packetName) {
      packetDefintion = packetDefinitions[i];
    }
  }

  /*
  * This should not happen unless:
  *   * The packet type is mispelled
  *   * The packet definitions have changed.
  */
  if (typeof packetDefintion === 'undefined') {
    console.warn(`Unknown packet of '${packetName}' was requested to be generated.`);
    return;
  }

  // TODO: How do we emulate DAQ packets?
  if (packetDefintion.DAQ) {
    return;
  }

  for (let x = 0; x < packetDefintion.Parameters.length; x++) {
    let parameter = packetDefintion.Parameters[x];
    // TODO: Can we make JS do 64 bit integers?
    if (parameter.type === 'uint64') {
      return;
    }
    if (parameter.endLoop && inLoop) {
      if (loopIteration > loopIterations) {
        inLoop = false;
        loopIteration = 0;
      } else {
        x = loopBeginIndex;
        loopIteration++;
      }
    } else if (parameter.beginLoop && !inLoop) {
      inLoop = true;
      loopBeginIndex = x;
    }

    if (parameter.Name.search(/fault/i) > -1) {
      payload.push.apply(payload, toBytes(parameter.type, Math.floor(Math.random() * 10)));
    } else {
      payload.push.apply(payload, toBytes(parameter.type, (Math.random() * 2000) - 1000));
    }
  }

  return payload;
}

function getPort (nodeName) {
  for (let node of commConfig.RXServers) {
    if (node.hostName === nodeName) {
      return node.port;
    }
  }

  console.error(`Unknown node '${nodeName}'`);
}

var sequence = 0;

setInterval(() => {
  let packetMeta = packetDefinitions[Math.floor(Math.random() * packetDefinitions.length)];
  let packetData = generatePacket(packetMeta.Name);
  if (typeof packetData === 'undefined') {
    return;
  }

  udpHelpers.sendPacket(sequence, packetMeta.PacketType, packetData, getPort(packetMeta.Node));
  // console.log(`Generated packet for '${packetMeta.Name}'`);
  sequence++;
}, PACKET_INTERVAL);
