
var bin = require('./udp/binary.js');

class TempSensorROMIDScanner {
  constructor (PodCommands, rtDataStore) {
    this.PodCommands = PodCommands;
    this.BeginScanA = this.BeginScanA.bind(this);
    this.BeginScanB = this.BeginScanB.bind(this);
    this.ScanACB = this.ScanACB.bind(this);
    this.ScanBCB = this.ScanBCB.bind(this);
    this.rtDataStore = rtDataStore;
  }

  BeginScanA (numberOfSensors) {
    this.ScanAIndex = 0;
    this.ScanAROMID = '';
    this.ScanALastIndex = numberOfSensors - 1;
    this.PodCommands.PowerARequestRomID(0);
    this.ScanATimeout = 0;

    this.timerA = setInterval(function () { this.ScanACB(); }.bind(this), 30);
    console.log('Beginning to scan the temperature sensor IDs on Power Node A.');
  }

  BeginScanB (numberOfSensors) {
    this.ScanBIndex = 0;
    this.ScanBROMID = '';
    this.ScanBLastIndex = numberOfSensors - 1;
    this.PodCommands.PowerBRequestRomID(0);
    this.ScanATimeout = 0;

    this.timerB = setInterval(function () { this.ScanBCB(); }.bind(this), 30);
    console.log('Beginning to scan the temperature sensor IDs on Power Node B.');
  }

  ScanACB () {
    var IDHi = this.rtDataStore.retrieveDataParameter('Power A ROM Hi').Value;
    var IDLo = this.rtDataStore.retrieveDataParameter('Power A ROM Lo').Value;
    var index = this.rtDataStore.retrieveDataParameter('Power A ROM Index').Value;

    var IDArray = [];
    IDArray = IDArray.concat(bin.uint32ToBytes(IDHi).reverse());
    IDArray = IDArray.concat(bin.uint32ToBytes(IDLo).reverse());

    if (this.ScanATimeout === 100) {
      this.PodCommands.PowerARequestRomID(this.ScanAIndex);
    }

    if (this.ScanATimeout >= 300 || this.ScanALastIndex === index) {
      console.log('Scan A done.');
      clearInterval(this.timerA);
    }

    if (index !== this.ScanAIndex) {
      this.ScanATimeout++;
      return;
    }

    var newByte = IDArray[0].toString(16);
    if (newByte.length === 1) { newByte = '0' + newByte; }
    var toAdd = newByte;

    for (var i = 1; i < 8; i++) {
      newByte = IDArray[i].toString(16);
      if (newByte.length === 1) { newByte = '0' + newByte; }
      toAdd += ' ' + newByte;
    }

    toAdd = toAdd.toUpperCase();

    console.log('Got Sensor ' + index + ' id: ' + toAdd);

    var newData = {'packetName': 'Power A ROM IDs' + (index + 1), 'packetType': '0', 'rxTime': 0, 'parameters': []};
    newData.parameters.push({'name': 'Power A ROM ID ' + (index + 1), 'value': toAdd, 'units': ''});
    this.rtDataStore.insertDataPacket(newData);

    this.ScanAIndex++;
    this.PodCommands.PowerARequestRomID(this.ScanAIndex);
  }

  ScanBCB () {
    var IDHi = this.rtDataStore.retrieveDataParameter('Power B ROM Hi').Value;
    var IDLo = this.rtDataStore.retrieveDataParameter('Power B ROM Lo').Value;
    var index = this.rtDataStore.retrieveDataParameter('Power B ROM Index').Value;

    var IDArray = [];
    IDArray = IDArray.concat(bin.uint32ToBytes(IDHi).reverse());
    IDArray = IDArray.concat(bin.uint32ToBytes(IDLo).reverse());

    if (this.ScanBTimeout === 100) {
      this.PodCommands.PowerBRequestRomID(this.ScanAIndex);
    }

    if (this.ScanBTimeout >= 300 || this.ScanBLastIndex === index) {
      console.log('Scan B done.');
      clearInterval(this.timerB);
    }

    if (index !== this.ScanBIndex) {
      this.ScanBTimeout++;
      return;
    }

    var newByte = IDArray[0].toString(16);
    if (newByte.length === 1) { newByte = '0' + newByte; }
    var toAdd = newByte;

    for (var i = 1; i < 8; i++) {
      newByte = IDArray[i].toString(16);
      if (newByte.length === 1) { newByte = '0' + newByte; }
      toAdd += ' ' + newByte;
    }

    toAdd = toAdd.toUpperCase();

    console.log('Got Sensor ' + index + ' id: ' + toAdd);

    var newData = {'packetName': 'Power B ROM IDs' + (index + 1), 'packetType': '0', 'rxTime': 0, 'parameters': []};
    newData.parameters.push({'name': 'Power B ROM ID ' + (index + 1), 'value': toAdd, 'units': ''});
    this.rtDataStore.insertDataPacket(newData);

    this.ScanBIndex++;
    this.PodCommands.PowerBRequestRomID(this.ScanBIndex);
  }

}

module.exports = function (PodCommands, rtDataStore) {
  return new TempSensorROMIDScanner(PodCommands, rtDataStore);
};
