import React, { Component } from 'react';
import StreamingPageManager from '../../StreamingPageManager.js';
import GenericParameterLabel from './../GenericParameterLabel.js';
import DataStreamClient from '../../StreamPipeClient.js';
import NumericInput from './../NumericInput.js';
import config from '../../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class Charging extends Component {
	constructor(props) {
		super(props)
		this.render = this.render;

		this.state = {
			streamManager: new StreamingPageManager(),
            minTempA: 0,
            maxTempA: 0,
            avgTempA: 0,
            locMaxTempA: 0,
            minVoltageA: 3.8,
            maxVoltageA: 4.2,
            avgVoltageA: 4.0,
            locMaxVoltageA: 0,
            locMinVoltageA: 0,
            packVoltageA: 60,
            packCurrentA: 0,
            chargeVoltageA: 62.5,
            chargeCurrentA: 10,
            chargingAState: 'IDLE',
            chargingAFaults: 0,
            numSensorsA: 0,
            chargeRelayStateA: 'open',
            minTempB: 0,
            maxTempB: 0,
            avgTempB: 0,
            locMaxTempB: 0,
            minVoltageB: 3.8,
            maxVoltageB: 4.2,
            avgVoltageB: 4.0,
            locMaxVoltageB: 0,
            locMinVoltageB: 0,
            packVoltageB: 60,
            packCurrentB: 0,
            chargeVoltageB: 62.5,
            chargeCurrentB: 10,
			chargingBState: 'IDLE',
            chargingBFaults: 0,
            numSensorsB: 0,
            chargeRelayStateB: 'open',
		}

		this.newPacketCallback  = this.newPacketCallback.bind(this);
		this.DataStreamClient = new DataStreamClient(this.newPacketCallback);
		this.requestParameterFromServer('Power A Temps Count');
		for(var i = 0;i<18;i++){
			this.requestParameterFromServer('Power A Module Voltage '+i);
		}
	}

		newPacketCallback(parameterData){
		var field;
		var newState = {};
		var avgA = 0;
		var avgACount = 0;
		var maxTempA = 0;
		var maxTempAIndex = '';
		var minTempA = 99999;
		var minTempAIndex = '';

		//console.log(JSON.stringify(parameterData));
		if(this._isMounted){			
			for(var i = 0;i<parameterData.length;i++){
				if(parameterData[i].Name === 'Power A Temps Count' && this.state.numSensorsA !== parameterData[i].Value){
					this.setState({numSensorsA: parameterData[i].Value});
					for(var x = 1;x<=parameterData[i].Value;x++){
						this.requestParameterFromServer('Power A Temps '+x+' Temperature');
						this.requestParameterFromServer('Power A Temps Loc Serial '+x);
					}
				}

				if(parameterData[i].Name.substring(parameterData[i].Name.length-11,parameterData[i].Name.length) === "Temperature")
				{
					field = 'temperatureValues'+parameterData[i].Name.split(' ')[3];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
					avgA += parameterData[i].Value;
					avgACount++;

					if(parameterData[i].Value > maxTempA)
					{
						maxTempA = parameterData[i].Value;
						maxTempAIndex = parameterData[i].Name.split(' ')[3];
					}

					if(parameterData[i].Value < minTempA)
					{
						minTempA = parameterData[i].Value;
						minTempAIndex = parameterData[i].Name.split(' ')[3];
					}
				}

				if(parameterData[i].Name.substring(0,26) === "Power A Temps Local Serial")
				{
					field = 'TempLoc'+parameterData[i].Name.split(' ')[5];
					if(this.state[field] !== parameterData[i].Value){
						newState[field] = parameterData[i].Value;
					}
				}
			}
			newState['maxTempA'] = maxTempA;
			newState['minTempA'] = minTempA;
			newState['locMaxTempA'] = maxTempAIndex; //TODO: Associate with module serial number
			newState['avgTempA'] = avgA/avgACount;
			this.setState(newState);
		}
	}

	requestParameterFromServer(parameter){
		// console.log("requesting: "+parameter);
		this.DataStreamClient.RequestParameter(parameter);
	}

	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	componentWillUnmount() {
		this._isMounted = false;
	}
   

    brakeIBeamPositionHandler(changeEvent) {
        this.setState({
            nextIBeamBrakePosition: parseFloat(changeEvent.currentTarget.value, 10)
        });
    }

	render() {
		var _this = this;
        var buttonClasses = "btn btn-primary " + ((this.state.developmentMode) ? "" : "disabled");

        let borderStyle = {border: '2px solid black',borderRadius: '10px',padding: '10px', width:'50%' };

	    return (
            <div>
                <div className="row">

                    <div className="col-sm-6">
                    <legend>Pack A - {this.state.packVoltageA} V - {this.state.packCurrentA} A</legend>

						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Begin Charging</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Stop Charging</button><br />
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Begin Balancing</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Stop Balancing</button><br />
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Open Charge Relay</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Close Charge Relay</button><br /><br />

                    <label>Max Temp:</label> {this.state.maxTempA} C<br />
                    <label>Min Temp:</label> {this.state.minTempA} C<br />
                    <label>Avg Temp:</label> {this.state.avgTempA} C<br />
                    <label>Max Temp Location:</label> {this.state.locMaxTempA} <br />
                    <label>Max Module Voltage:</label> {this.state.maxVoltageA}<br />
                    <label>Min Module Voltage:</label> {this.state.minVoltageA}<br />
                    <label>Avg Module Voltage:</label> {this.state.avgVoltageA} V<br />
                    <label>Max Module Voltage Location:</label> {this.state.locMaxVoltageA}<br />
                    <label>Min Module Voltage Location:</label> {this.state.locMinVoltageA}<br />
                    <label>Charge Voltage:</label> {this.state.chargeVoltageA} V<br />
                    <label>Charge Current:</label> {this.state.chargeCurrentA} A<br />
                    <label>Charging State:</label> {this.state.chargingAState}<br />
                    <label>Charging Faults:</label> {this.state.chargingAFaults}<br />
					<label>Number of Temp Sensors:</label> {this.state.numSensorsA}<br />
					<label>Charge Relay:</label> {this.state.chargeRelayStateA}<br />
                    </div>

                    <div className="col-sm-6">
						<legend>Pack B - {this.state.packVoltageA} V - {this.state.packCurrentA} A</legend>

                    	<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Begin Charging</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Stop Charging</button><br />
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Begin Balancing</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Stop Balancing</button><br />
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Open Charge Relay</button>
						<button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Close Charge Relay</button><br /><br />

                    <label>Max Temp:</label> {this.state.maxTempB} C<br />
                    <label>Min Temp:</label> {this.state.minTempB} C<br />
                    <label>Avg Temp:</label> {this.state.avgTempB} C<br />
                    <label>Max Temp Location:</label> {this.state.locMaxTempB} <br />
                    <label>Max Module Voltage:</label> {this.state.maxVoltageB} V<br />
                    <label>Min Module Voltage:</label> {this.state.minVoltageB} V<br />
                    <label>Avg Module Voltage:</label> {this.state.avgVoltageB} V<br />
                    <label>Max Module Voltage Location:</label> {this.state.locMaxVoltageB}<br />
                    <label>Min Module Voltage Location:</label> {this.state.locMinVoltageB}<br />
                    <label>Charge Voltage:</label> {this.state.chargeVoltageB} V<br />
                    <label>Charge Current:</label> {this.state.chargeCurrentB} A<br />
                    <label>Charging State:</label> {this.state.chargingBState}<br />
                    <label>Charging Faults:</label> {this.state.chargingBFaults}<br />
                    <label>Number of Temp Sensors:</label> {this.state.numSensorsA}<br />
                    <label>Charge Relay:</label> {this.state.chargeRelayStateA}<br />
                    </div>

                </div>
            </div>
	    );
	}
}

export default Charging;



