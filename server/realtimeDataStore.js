var events = require('events');

class RealTimeDataStore {
  constructor (logger) {
    this.logger = logger;
    this.hasNewData = new events.EventEmitter();
    this.date = new Date();

    /* ---------
    Data Store Structure:
      [{'PacketName':'Accel 2 Packet',
        'RxTime':'', Linux time in millis
        'Name':'',
        'Value':'',
        'Units':'',
      }
       .....
      ]
    ----------
    */
    this.rtDataStore = [];
    this.insertDataPacket = this.insertDataPacket.bind(this);
  }

  /* -------
  newDataPacket format:
  {
    packetName
    packetType
    rxTime (millis)
    paramaters [
      name
      value
      units
    ]
  }
  ---------
  */
  insertDataPacket (newDataPacket) {
    this.hasNewData.emit('new_rtData', newDataPacket);

    for (var x = 0; x < newDataPacket.parameters.length; x++) {
      var found = false;

      // Try to update an existing entry
      for (var y = 0, len = this.rtDataStore.length; y < len; y++) {
        if (newDataPacket.parameters[x].name === this.rtDataStore[y].Name) {
          this.rtDataStore[y].Value = newDataPacket.parameters[x].value;
          found = true;
          break;
        }
      }

      // No entry found, add a new one
      if (found === false) {
        this.rtDataStore.push({'PacketName': newDataPacket.packetName,
          'RxTime': newDataPacket.rxTime,
          'Name': newDataPacket.parameters[x].name,
          'Value': newDataPacket.parameters[x].value,
          'Units': newDataPacket.parameters[x].units
        });
      }
    }
  }

  retrieveDataParameter (parameterName) {
    var ret = {'Name': parameterName,
      'Value': '?',
      'IsStale': true,
      'Units': '?',
      'PacketName': '?'};

    for (var y = 0, len = this.rtDataStore.length; y < len; y++) {
      if (parameterName === this.rtDataStore[y].Name) {
        ret.Value = this.rtDataStore[y].Value;
        if ((this.date.getTime() - this.rtDataStore[y].RxTime) < 2000) { ret.IsStale = false; }

        ret.Units = this.rtDataStore[y].Units;
        ret.PacketName = this.rtDataStore[y].PacketName;

        break;
      }
    }

    return ret;
  }
}

module.exports = function (logger) {
  return new RealTimeDataStore(logger);
};
