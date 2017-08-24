
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
    var ID1 = this.rtDataStore.retrieveDataParameter('Power A ROM 1').Value;
    var ID2 = this.rtDataStore.retrieveDataParameter('Power A ROM 2').Value;
	var ID3 = this.rtDataStore.retrieveDataParameter('Power A ROM 3').Value;
	var ID4 = this.rtDataStore.retrieveDataParameter('Power A ROM 4').Value;
	var ID5 = this.rtDataStore.retrieveDataParameter('Power A ROM 5').Value;
	var ID6 = this.rtDataStore.retrieveDataParameter('Power A ROM 6').Value;
	var ID7 = this.rtDataStore.retrieveDataParameter('Power A ROM 7').Value;
	var ID8 = this.rtDataStore.retrieveDataParameter('Power A ROM 8').Value;
    var index = this.rtDataStore.retrieveDataParameter('Power A ROM Index').Value;

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

	var toAdd = ID1.toString(16) + " " + ID2.toString(16)
	+ " " + ID3.toString(16) + " " + ID4.toString(16)
	+ " " + ID5.toString(16) + " " + ID6.toString(16)
	+ " " + ID7.toString(16) + " " + ID8.toString(16);

    toAdd = toAdd.toUpperCase();

    console.log('Got Sensor ' + index + ' id: ' + toAdd);

    var newData = {'packetName': 'Power A ROM IDs' + (index + 1), 'packetType': '0', 'rxTime': 0, 'parameters': []};
    newData.parameters.push({'name': 'Power A ROM ID ' + (index + 1), 'value': toAdd, 'units': ''});
    this.rtDataStore.insertDataPacket(newData);

    this.ScanAIndex++;
    this.PodCommands.PowerARequestRomID(this.ScanAIndex);
  }

  ScanBCB () {
	var ID1 = this.rtDataStore.retrieveDataParameter('Power A ROM 1').Value;
    var ID2 = this.rtDataStore.retrieveDataParameter('Power A ROM 2').Value;
	var ID3 = this.rtDataStore.retrieveDataParameter('Power A ROM 3').Value;
	var ID4 = this.rtDataStore.retrieveDataParameter('Power A ROM 4').Value;
	var ID5 = this.rtDataStore.retrieveDataParameter('Power A ROM 5').Value;
	var ID6 = this.rtDataStore.retrieveDataParameter('Power A ROM 6').Value;
	var ID7 = this.rtDataStore.retrieveDataParameter('Power A ROM 7').Value;
	var ID8 = this.rtDataStore.retrieveDataParameter('Power A ROM 8').Value;
    var index = this.rtDataStore.retrieveDataParameter('Power B ROM Index').Value;


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

	var toAdd = ID1.toString(16) + " " + ID2.toString(16)
	+ " " + ID3.toString(16) + " " + ID4.toString(16)
	+ " " + ID5.toString(16) + " " + ID6.toString(16)
	+ " " + ID7.toString(16) + " " + ID8.toString(16);

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
