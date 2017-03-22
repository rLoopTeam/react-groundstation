const udptx = require('./tx');
const udprx = require('./rx');
const commConfig = require('../../config/commConfig');

class UDP {
  constructor (logger, packetProcessorCb) {
    this.tx = udptx;
    this.logger = logger;
  }
}

module.exports = function (logger, packetProcessorCb) {
  return new UDP(logger, packetProcessorCb);
};
