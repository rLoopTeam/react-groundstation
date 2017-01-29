//Preload some dummy packets so the GUI loads up a bit nicer.
//Very similar to TestPayload 
const makeSafeUDPPackage = require('./udp/makeSafeUDPPackage');
const bin = require('./udp/binary');
const crc = require('./udp/crc.js');
const commConfig = require('../config/commConfig.js');
var dgram = require('dgram');

var podEnumList = [
    {'name':"Charger A BMS Charger State Name", 'sourceParameter':'Charger A BMS Charger State', 'values': [
    'Idle',
    'Start Balance',
    'Check Pack Temp',
    'Run Balancer',
    'Close Contactor Relay',
    'Check Charge Current',
    'Check Cell V During Charge',
    'Check Cell V During Charge',
    'Manual Balancing',
    'Abort'
    ]},
    {'name':"Charger B BMS Charger State Name", 'sourceParameter':'Charger B BMS Charger State', 'values': [
    'Idle',
    'Start Balance',
    'Check Pack Temp',
    'Run Balancer',
    'Close Contactor Relay',
    'Check Charge Current',
    'Check Cell V During Charge',
    'Check Cell V During Charge',
    'Manual Balancing',
    'Abort'
    ]},
    {'name':"Charger A BMS DC State Name", 'sourceParameter':'Charger A BMS DC State', 'values': [
    'Pod Reset',
    'Latched',
    'Check WDT',
    'Check Pod Safe',
    'Check WDT'
    ]},
    {'name':"Charger B BMS DC State Name", 'sourceParameter':'Charger B BMS DC State', 'values': [
    'Pod Reset',
    'Latched',
    'Check WDT',
    'Check Pod Safe',
    'Check WDT'
    ]},
    {'name':"Brake State Name", 'sourceParameter':'Brake State', 'values': [
    'Reset',
    'Idle',
    'Begin Move',
    'Compute',
    'Moving',
    'Move Stopped',
    'Fault',
    'Test',
    'Begin Cal',
    'Wait Cal Done'
    ]}
];

class podEnums {
    constructor(rtDataStore)
    {
        this.rtDataStore = rtDataStore;
        this.updateEnums = this.updateEnums.bind(this);
        setInterval(function(){
        this.updateEnums(); 
    }.bind(this),100);
    }

    updateEnums()
    {

        var newData ={'packetName':'Packet Enums','packetType':'0','rxTime':0,'parameters':[]};
        for(var i = 0;i<podEnumList.length;i++)
        {
            var value = this.rtDataStore.retrieveDataParameter(podEnumList[i].sourceParameter).Value;
            if(value !== '?'){
                if(!isNaN(value)){
                    newData.parameters.push({'name':podEnumList[i].name,'value':podEnumList[i].values[Number.parseInt(value)],'units':''});
                }
            }
        }
        this.rtDataStore.insertDataPacket(newData);
    }
}

module.exports = function(rtDataStore){
    return new podEnums(rtDataStore);
};