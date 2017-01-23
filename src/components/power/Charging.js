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
		}

        this.labelsA = [
            {label: "BMS Faults", value: "Power A BMS Faults", hex: "true"},
            {label: "Temp State", value: "Power A BMS Temp State"},
            {label: "Charger State", value: "Power A BMS Charger State"},
            {label: "Num Temp Sensors", value: "Power A BMS Num Temp Sensors"},
            {label: "Highest Sensor Value", value: "Power A BMS Highest Sensor Value"},
            {label: "Average Temp", value: "Power A BMS Average Temp"},
            {label: "Highest Sensor Index", value: "Power A BMS Highest Sensor Index"},
            {label: "Pack Volts", value: "Power A BMS Pack Volts"},
            {label: "Highest Cell Volts", value: "Power A BMS Highest Cell Volts"},
            {label: "Lowest Cell Volts", value: "Power A BMS Lowest Cell Volts"},
            {label: "Board Temp", value: "Power A BMS Board Temp"},
            {label: "Node Pressure", value: "Power A BMS Node Pressure"},
            {label: "Node Temp", value: "Power A BMS Node Temp"},
        ]; // plus auto-generated labels for each individual cell (see below)

        this.labelsB = [
            {label: "BMS Faults", value: "Power B BMS Faults", hex: "true"},
            {label: "Temp State", value: "Power B BMS Temp State"},
            {label: "Charger State", value: "Power B BMS Charger State"},
            {label: "Num Temp Sensors", value: "Power B BMS Num Temp Sensors"},
            {label: "Highest Sensor Value", value: "Power B BMS Highest Sensor Value"},
            {label: "Average Temp", value: "Power B BMS Average Temp"},
            {label: "Highest Sensor Index", value: "Power B BMS Highest Sensor Index"},
            {label: "Pack Volts", value: "Power B BMS Pack Volts"},
            {label: "Highest Cell Volts", value: "Power B BMS Highest Cell Volts"},
            {label: "Lowest Cell Volts", value: "Power B BMS Lowest Cell Volts"},
            {label: "Board Temp", value: "Power B BMS Board Temp"},
            {label: "Node Pressure", value: "Power B BMS Node Pressure"},
            {label: "Node Temp", value: "Power B BMS Node Temp"},
        ]; // plus auto-generated labels for each individual cell (see below)

        this.cellIndexes = [...(new Array(18)).keys()];
    }

	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	componentWillUnmount() {
		this._isMounted = false;
	}
   

	startChargeA(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StartCharging', data);
	}

	stopChargeA(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StopCharging', data);
	}

	startChargeB(data, e) {
		e.preventDefault();
		socket.emit('PowerB:StartCharging', data);
	}

	stopChargeB(data, e) {
		e.preventDefault();
		socket.emit('PowerB:StopCharging', data);
	}

	startDischargeA(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StartDischarging', data);
	}

	stopDischargeA(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StopDischarging', data);
	}

	stopManualDischargingA(data, e) {
		e.preventDefault();
		socket.emit('PowerA:StopManualDischarging', data);
	}

	stopManualDischargingB(data, e) {
		e.preventDefault();
		socket.emit('PowerB:StopManualDischarging', data);
	}

	startDischargeB(data, e) {
		e.preventDefault();
		socket.emit('PowerB:StartDischarging', data);
	}

	stopDischargeB(data, e) {
		e.preventDefault();
		socket.emit('PowerB:StopDischarging', data);
	}

    requestBMSA(data, e) {
        socket.emit('PowerA:RequestBMS');
    }

    requestBMSB(data, e) {
        socket.emit('PowerB:RequestBMS');
    }

	render() {
		var _this = this;
        var buttonClasses = "btn btn-primary " + ((this.state.developmentMode) ? "" : "disabled");

        let borderStyle = {border: '2px solid black',borderRadius: '10px',padding: '10px', width:'50%' };

	    return (
            <div>
                <div className="row">

                    <div className="col-sm-6">
                    <legend>Pack A</legend>

                        <button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button>
						<button type="button" className="btn btn-success" onClick={this.startChargeA.bind(this, {})}  style={{margin:10}}>Start Charging</button>
						<button type="button" className="btn btn-success" onClick={this.stopChargeA.bind(this, {})}  style={{margin:10}}>Stop Charging</button><br />

                        {
                        this.labelsA.map(function(item, index){
                            return (
                                <div className="row" key={"brakes" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={_this.state.streamManager} 
                                        parameter={item.value} hex={item.hex}/>
                                </div>
                            )
                        }, this)
                        }

                        <button type="button" className="btn btn-success" onClick={this.stopManualDischargingA.bind(this,{})}  style={{margin:10}}>Stop Manual Discharging</button>

						{
						this.cellIndexes.map(function(_, cellIndex) {
							return (
								<div className="row" key={"cell" + cellIndex}>
									<div>
										<label>Module {cellIndex + 1} Volts</label>
										<GenericParameterLabel
											StreamingPageManager={_this.state.streamManager}
											parameter="Power A BMS {index + 1} Module Voltage"/>
									</div>
									<button type="button" className="btn btn-success" onClick={this.startDischargeA.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Start Discharging</button>
									<button type="button" className="btn btn-success" onClick={this.stopDischargeA.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Stop Discharging</button><br />
								</div>
							);
						}, this)
						}
                    </div>

                    <div className="col-sm-6">
						<legend>Pack B</legend>
                        
                        <button className="btn btn-primary" onClick={this.requestBMSB.bind(this)}  style={{margin:10}}>Start BMS Stream</button>
 						<button type="button" className="btn btn-success" onClick={this.startChargeB.bind(this, {})}  style={{margin:10}}>Start Charging</button>
						<button type="button" className="btn btn-success" onClick={this.stopChargeB.bind(this, {})}  style={{margin:10}}>Stop Charging</button><br />

                        {
                        this.labelsB.map(function(item, index){
                            return (
                                <div className="row" key={"brakes" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={_this.state.streamManager} 
                                        parameter={item.value} hex={item.hex}/>
                                </div>
                            )
                        }, this)
                        }

                        <button type="button" className="btn btn-success" onClick={this.stopManualDischargingB.bind(this,{})}  style={{margin:10}}>Stop Manual Discharging</button>

						{
						this.cellIndexes.map(function(_, cellIndex) {
							return (
								<div className="row" key={"cell" + cellIndex}>
									<div>
										<label>Module {cellIndex + 1} Volts</label>
										<GenericParameterLabel
											StreamingPageManager={_this.state.streamManager}
											parameter="Power A BMS {index + 1} Module Voltage"/>
									</div>
									<button type="button" className="btn btn-success" onClick={this.startDischargeB.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Start Discharging</button>
									<button type="button" className="btn btn-success" onClick={this.stopDischargeB.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Stop Discharging</button><br />
								</div>
							);
						}, this)
						}
                    </div>

                </div>
            </div>
	    );
	}
}

export default Charging;



