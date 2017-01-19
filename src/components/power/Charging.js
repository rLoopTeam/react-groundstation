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

        this.labels = [
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
            {label: "Module 1 Volts", value: "Power A BMS 1 Module Voltage"},
            {label: "Module 2 Volts", value: "Power A BMS 2 Module Voltage"},
            {label: "Module 3 Volts", value: "Power A BMS 3 Module Voltage"},
            {label: "Module 4 Volts", value: "Power A BMS 4 Module Voltage"},
            {label: "Module 5 Volts", value: "Power A BMS 5 Module Voltage"},
            {label: "Module 6 Volts", value: "Power A BMS 6 Module Voltage"},
            {label: "Module 7 Volts", value: "Power A BMS 7 Module Voltage"},
            {label: "Module 8 Volts", value: "Power A BMS 8 Module Voltage"},
            {label: "Module 9 Volts", value: "Power A BMS 9 Module Voltage"},
            {label: "Module 10 Volts", value: "Power A BMS 10 Module Voltage"},
            {label: "Module 11 Volts", value: "Power A BMS 11 Module Voltage"},
            {label: "Module 12 Volts", value: "Power A BMS 12 Module Voltage"},
            {label: "Module 13 Volts", value: "Power A BMS 13 Module Voltage"},
            {label: "Module 14 Volts", value: "Power A BMS 14 Module Voltage"},
            {label: "Module 15 Volts", value: "Power A BMS 15 Module Voltage"},
            {label: "Module 16 Volts", value: "Power A BMS 16 Module Voltage"},
            {label: "Module 17 Volts", value: "Power A BMS 17 Module Voltage"},
            {label: "Module 18 Volts", value: "Power A BMS 18 Module Voltage"}
        ]

        this.labels2 = [
            {label: "BMS Faults", value: "Power B BMS Faults", hex: "true"},
            {label: "Temp State", value: "Power B BMS Temp State"},
            {label: "Charger State", value: "Power B BMS Charger State"},
            {label: "Num Temp Sensors", value: "Power B BMS Num Temp Sensors"},
            {label: "Highest Sensor Value", value: "Power B BMS Highest Sensor Value"},
            {label: "Average Temp", value: "Power B BMS Average Temp"},
            {label: "Highest Sensor Value", value: "Power B BMS Highest Sensor Value"},
            {label: "Average Temp", value: "Power B BMS Average Temp"},
            {label: "Highest Sensor Index", value: "Power B BMS Highest Sensor Index"},
            {label: "Pack Volts", value: "Power B BMS Pack Volts"},
            {label: "Highest Cell Volts", value: "Power B BMS Highest Cell Volts"},
            {label: "Lowest Cell Volts", value: "Power B BMS Lowest Cell Volts"},
            {label: "Board Temp", value: "Power B BMS Board Temp"},
            {label: "Node Pressure", value: "Power B BMS Node Pressure"},
            {label: "Node Temp", value: "Power B BMS Node Temp"},
            {label: "Module 1 Volts", value: "Power B BMS Module Voltage 1"},
            {label: "Module 2 Volts", value: "Power B BMS Module Voltage 2"},
            {label: "Module 3 Volts", value: "Power B BMS Module Voltage 3"},
            {label: "Module 4 Volts", value: "Power B BMS Module Voltage 4"},
            {label: "Module 5 Volts", value: "Power B BMS Module Voltage 5"},
            {label: "Module 6 Volts", value: "Power B BMS Module Voltage 6"},
            {label: "Module 7 Volts", value: "Power B BMS Module Voltage 7"},
            {label: "Module 8 Volts", value: "Power B BMS Module Voltage 8"},
            {label: "Module 9 Volts", value: "Power B BMS Module Voltage 9"},
            {label: "Module 10 Volts", value: "Power B BMS Module Voltage 10"},
            {label: "Module 11 Volts", value: "Power B BMS Module Voltage 11"},
            {label: "Module 12 Volts", value: "Power B BMS Module Voltage 12"},
            {label: "Module 13 Volts", value: "Power B BMS Module Voltage 13"},
            {label: "Module 14 Volts", value: "Power B BMS Module Voltage 14"},
            {label: "Module 15 Volts", value: "Power B BMS Module Voltage 15"},
            {label: "Module 16 Volts", value: "Power B BMS Module Voltage 16"},
            {label: "Module 17 Volts", value: "Power B BMS Module Voltage 17"},
            {label: "Module 18 Volts", value: "Power B BMS Module Voltage 18"}
        ]
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

    requestBMSA(data, e) {
        socket.emit('PowerA:RequestBMS');
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

                        <button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BSM Stream</button>
						<button type="button" className="btn btn-success" onClick={this.startChargeA.bind(this, {})}  style={{margin:10}}>Begin Charging</button>
						<button type="button" className="btn btn-success" onClick={this.stopChargeA.bind(this, {})}  style={{margin:10}}>Stop Charging</button><br />


                                        {
                        this.labels.map(function(item, index){
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
                    </div>

                    <div className="col-sm-6">
						<legend>Pack B - {this.state.packVoltageA} V - {this.state.packCurrentA} A</legend>

 						<button type="button" className="btn btn-success" onClick={this.startChargeB.bind(this, {})}  style={{margin:10}}>Begin Charging</button>
						<button type="button" className="btn btn-success" onClick={this.stopChargeB.bind(this, {})}  style={{margin:10}}>Stop Charging</button><br />

                        {
                        	this.labels2.map(function(item, index){
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
                    </div>

                </div>
            </div>
	    );
	}
}

export default Charging;



