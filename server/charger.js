fs = require('fs');
var request = require('request');
var parseString = require('xml2js').parseString;

class charger {
	constructor(rtDataStore)
	{
		this.updateSystemStatus = this.updateSystemStatus.bind(this);
		this.updateAlarms = this.updateAlarms.bind(this);
		this.rtDataStore = rtDataStore;
		setInterval(this.updateSystemStatus,400);
		setInterval(this.updateAlarms,400);
	}
	
	updateSystemStatus(){
		request.post('http://192.168.0.55/system.xml', {json: true, body: ''}, function(err, res, body) {
			if (!err && res.statusCode === 200) {
				parseString(body, function(err, result){
					var BatteryVoltage = result.response.fubat0[0].substring(0,result.response.fubat0[0].length-1);
					var CurrentToBattery = result.response.ibat0[0].substring(0,result.response.ibat0[0].length-1);
					var CurrentToSystemLoad = result.response.iload0[0].substring(0,result.response.iload0[0].length-1);
					var ACInputVoltageR = result.response.acr0[0].substring(0,result.response.acr0[0].length-1);
					var ChargerCabinetTemp = result.response.tcab0[0].substring(0,result.response.tcab0[0].length-1);

					var newData ={'packetName':'Charger','packetType':'0','rxTime':0,'parameters':[]};
					newData.parameters.push({'name':'Charger Voltage','value':BatteryVoltage,'units':'V DC'},
								{'name':'Charger Current To Batt','value':CurrentToBattery,'units':'Amps'},
								{'name':'Charger Current To System','value':CurrentToSystemLoad,'units':'Amps'},
								{'name':'Charger Input AC','value':ACInputVoltageR,'units':'V AC'},
								{'name':'Charger Cabinet Temp','value':ChargerCabinetTemp,'units':'C'}
								);
					this.rtDataStore.insertDataPacket(newData);
				}.bind(this));
          }
			}.bind(this));
	}
	
	sendIpsURL(successMsg, failMsg, url)
	{
		var http = require('http');
		var client = http.createClient(80, '192.168.0.55'); 
		
		var username = 'admin';
		var password = 'ipspass';
		var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

		var header = {'Host': '192.168.0.55', 'Authorization': auth};
		var request = client.request('GET', url, header);
		
		request.end();
		request.on('response', function (response) {
			if(response.statusCode == 200)
			{
				console.log(successMsg);
				console.log();
			}else{
				console.log(failMsg);
				console.log();
			}
		});
	}
	
	setFloatVoltage(volts){
		if(volts > 75 || volts < 45){
			console.log("Error: Charger voltage command out of range.");
			return;
		}
		
		var voltsFormatted = new Number(volts);
		voltsFormatted = voltsFormatted*100;
		
		var url = '/voltage.htm?fubat='+voltsFormatted.toFixed(0);
		this.sendIpsURL("Charger float voltage set to: "+(volts), "Error setting charger boost voltage.", url);
	}
	
	setBoostVoltage(volts){
		if(volts > 75 || volts < 45){
			console.log("Error: Charger voltage command out of range.");
			return;
		}
		
		var voltsFormatted = new Number(volts);
		voltsFormatted = voltsFormatted*100;
		
		var url = '/voltage.htm?bubat='+voltsFormatted.toFixed(0);
		this.sendIpsURL("Charger boost voltage set to: "+(volts), "Error setting charger boost voltage.", url);
	}
	
	setMaxBatteryCurrent(current){
		if(current > 40 || current < 0){
			console.log("Error: Charger max battery current command out of range.");
			return;
		}
		
		var currentFormatted = new Number(current);
		currentFormatted = currentFormatted*10;
		
		var url = '/current.htm?max='+currentFormatted.toFixed(0);
		this.sendIpsURL("Charger max battery current set to: "+(current), "Error setting max charger current.", url);
	}
	
	setBoostToFloatBatteryCurrent(current){
		if(current > 40 || current < 0){
			console.log("Error: Charger max battery current command out of range.");
			return;
		}
		
		var currentFormatted = new Number(current);
		currentFormatted = currentFormatted*10;
		
		var url = '/current.htm?b2f='+currentFormatted.toFixed(0);
		this.sendIpsURL("Charger boost to float battery current set to: "+(current), "Error setting boost to float charger current.", url);
	}
	
	setFloatToBoostBatteryCurrent(current){
		if(current > 40 || current < 0){
			console.log("Error: Charger max battery current command out of range.");
			return;
		}
		
		var currentFormatted = new Number(current);
		currentFormatted = currentFormatted*10;
		
		var url = '/current.htm?f2b='+currentFormatted.toFixed(0);
		this.sendIpsURL("Charger float to boost battery current set to: "+(current), "Error setting float to boost charger current.", url);
	}
	
	setVoltage(volts){
		setFloatVoltage(volts);
		setBoostVoltage(volts);
	}
	
	setVoltage(volts){
		if(volts > 75 || volts < 45){
			console.log("Error: Charger voltage command out of range.");
			return;
		}
		
		var voltsFormatted = new Number(volts);
		voltsFormatted = voltsFormatted*100;
		
		var url = '/voltage.htm?fubat='+voltsFormatted.toFixed(0)+"&bubat="+voltsFormatted.toFixed(0);
		this.sendIpsURL("Charger voltage set to: "+(volts), "Error setting charger voltage.", url);
	}
	
	updateAlarms(){
		{
		request.post('http://192.168.0.55/status.xml', {json: true, body: ''}, function(err, res, body) {
			if (!err && res.statusCode === 200) {
				parseString(body, function(err, result){
					var AnyMalfunction = result.response.led0[0];
					var LoadFuseBlown = result.response.led1[0];
					var BatteryFuseBlown = result.response.led2[0];
					var PhasesOutageFailure = result.response.led3[0];
					var LowBatteryVoltage = result.response.led4[0];
					var HighBatteryVoltage = result.response.led5[0];
					var ModuleFailure = result.response.led6[0];
					var HighBatteryTemperature = result.response.led7[0];
					var LVDActive = result.response.led8[0];
					
					var error = "";
					
					if(AnyMalfunction != '0'){error += 'General Fault, ';}
					if(LoadFuseBlown != '0'){error += 'Load fuse blown, ';}
					if(BatteryFuseBlown != '0'){error += 'Battery Fuse Blown, ';}
					if(PhasesOutageFailure != '0'){error += '3 phases outage failure, ';}
					if(LowBatteryVoltage != '0'){error += 'Low Battery Voltage, ';}
					if(HighBatteryVoltage != '0'){error += 'High Battery Voltage, ';}
					if(ModuleFailure != '0'){error += 'Module Failure, ';}
					if(HighBatteryTemperature != '0'){error += 'High Battery Temperature, ';}
					if(LVDActive != '0'){error += 'LVD active, ';}
					
					if(error.length > 0)
						error = error.substring(0,error.length-2)
					else
						error = "none";

					var newData ={'packetName':'Charger','packetType':'0','rxTime':0,'parameters':[]};
					newData.parameters.push({'name':'Charger Faults','value':error,'units':''});
					this.rtDataStore.insertDataPacket(newData);
				}.bind(this));
          }
			}.bind(this));
	}
	}
}

module.exports = function (rtDataStore){
    return new charger(rtDataStore);
};
