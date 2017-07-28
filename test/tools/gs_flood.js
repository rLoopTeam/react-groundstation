const packetDefinitions = require('../../config/packetDefinitions.js').packetDefinitions;
const bin = require('../../server/udp/binary.js');
const commConfig = require('../../config/commConfig.js');
const dgram = require('dgram');
const udpHelpers = require('../../server/udp/helpers.js');

const PACKET_INTERVAL = parseInt(process.env.RLOOP_PACKET_INTERVAL) || 1;

function toBytes (parameterType, data) {
  data = truncateForBytes(parameterType, data);

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

function truncateForBytes (parameterType, data) {
  switch (parameterType) {
    case 'uint8': return Math.max(Math.min(data, 128), -128);
    case 'int8': return Math.min(data, 256);
    case 'int16': return Math.max(Math.min(data, 32767), -32768);
    case 'uint16': return Math.min(data, 65535);
    case 'uint32': return Math.max(Math.min(data, 2147483647), -2147483648);
    case 'int32': return Math.min(data, 4294967295);
    case 'float32': return Math.max(Math.min(data, 3.40282347e+38), -3.40282347e+38);
    case 'float64': return data; // JS max should cover this case.
    default: console.error(`Unknown data type '${parameterType}'`); break;
  }
}

function generatePacket (packetName) {
  /**
   * Returns a packet with random data of a certain typeto be sent over UDP to the Ground Station.
   */

  let packetDefintion;
  let payload = [];

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

  for (let parameter of packetDefintion.Parameters) {
    // TODO: Can we make JS do 64 bit integers?
    if (parameter.type === 'uint64') {
      return;
    }

    if (parameter.Name.search(/fault/i) > -1) {
      payload.push.apply(payload, toBytes(parameter.type, Math.floor(Math.random() * 16)));
    } else {
      let data = Math.random() * 8192;
      if (!parameter.type.startsWith('u')) {
        data = data - 4096;
      }

      payload.push.apply(payload, toBytes(parameter.type, data));
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
