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

class Power_Overview extends Component {
	constructor(props) {
		super(props)
		this.render = this.render;

		this.state = {
			streamManager: new StreamingPageManager(),

			selectedPin: '4',
		}

        this.labels = [
            {label: "BMS Faults", value: `Power ${props.route.L} BMS Faults`, hex: "true"},
            {label: "Temp State", value: `Power ${props.route.L} BMS Temp State`},
            {label: "Charger State", value: `Power ${props.route.L} BMS Charger State`},
            {label: "Num Temp Sensors", value: `Power ${props.route.L} BMS Num Temp Sensors`},
            {label: "Highest Sensor Value", value: `Power ${props.route.L} BMS Highest Sensor Value`},
            {label: "Average Temp", value: `Power ${props.route.L} BMS Average Temp`},
            {label: "Highest Sensor Index", value: `Power ${props.route.L} BMS Highest Sensor Index`},
            {label: "Pack Volts", value: `Power ${props.route.L} BMS Pack Volts`},
        ];

        this.labels2 = [
            {label: "Highest Cell Volts", value: `Power ${props.route.L} BMS Highest Cell Volts`},
            {label: "Lowest Cell Volts", value: `Power ${props.route.L} BMS Lowest Cell Volts`},
            {label: "Board Temp", value: `Power ${props.route.L} BMS Board Temp`},
            {label: "Node Pressure", value: `Power ${props.route.L} BMS Node Pressure`},
            {label: "Node Temp", value: `Power ${props.route.L} BMS Node Temp`},
			{label: "Voltage Updates", value: `Power ${props.route.L} BMS Voltage Updates`},
			{label: "Temp Scan Count", value: `Power ${props.route.L} BMS Temp Scan Count`},
			{label: "Pack Current", value: `Power ${props.route.L} BMS Pack Current`},
		];

        this.cellIndexes = [...(new Array(18)).keys()];
    }

	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	componentWillUnmount() {
		this._isMounted = false;
	}

	startCharge(data, e) {
		e.preventDefault();
		socket.emit(`Power${this.props.route.L}:StartCharging`, data);
	}

	stopCharge(data, e) {
		e.preventDefault();
		socket.emit(`Power${this.props.route.L}:StopCharging`, data);
	}

	startDischarge(data, e) {
		e.preventDefault();
		socket.emit(`Power${this.props.route.L}:StartDischarging`, data);
	}

	stopDischarge(data, e) {
		e.preventDefault();
		socket.emit(`Power${this.props.route.L}:StopDischarging`, data);
	}

	stopManualDischarging(data, e) {
		e.preventDefault();
		socket.emit(`Power${this.props.route.L}:StopManualDischarging`, data);
	}

    requestBMS(data, e) {
    	e.preventDefault();
        socket.emit(`Power${this.props.route.L}:RequestBMS`);
    }

    requestCooling(e) {
    	e.preventDefault();
        socket.emit(`Power${this.props.route.L}:RequestCooling`);
	}

    startCooling(e) {
    	e.preventDefault();
        socket.emit(`Power${this.props.route.L}:StartCooling`);
	}

	handlePinChange(e) {
    	e.preventDefault();
		this.setState({
			selectedPin: e.target.value,
		});
	}

    testSolenoid(e) {
    	e.preventDefault();
        socket.emit(`Power${this.props.route.L}:TestSolenoidPin${this.state.selectedPin}`);
	}

	render() {
		var _this = this;
        var buttonClasses = "btn btn-primary " + ((this.state.developmentMode) ? "" : "disabled");

        let borderStyle = {border: '2px solid black',borderRadius: '10px',padding: '10px', width:'50%' };

	    return (
            <div>
				<h2>Pack {this.props.route.L}</h2>
				<div className="row">

					<div className="col-sm-6">
						<h3>Charge</h3>

						<button className="btn btn-primary" onClick={this.requestBMS.bind(this)}  style={{margin:10}}>Start BMS Stream</button>
						<button type="button" className="btn btn-success" onClick={this.startCharge.bind(this, {})}  style={{margin:10}}>Start Charging</button>
						<button type="button" className="btn btn-success" onClick={this.stopCharge.bind(this, {})}  style={{margin:10}}>Stop Charging</button><br />

						<div className="row">
							<div className="col-sm-6">
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

						<button type="button" className="btn btn-success" onClick={this.stopManualDischarging.bind(this,{})}  style={{margin:10}}>Stop Manual Discharging</button>
						{
							this.cellIndexes.map(function(_, cellIndex) {
								return (
									<div className="row" key={"cell" + cellIndex}>
										<div>
											<label>Module {cellIndex + 1} Volts</label>
											<GenericParameterLabel
												StreamingPageManager={_this.state.streamManager}
												parameter={`Power ${this.props.route.L} BMS ${cellIndex + 1} Module Voltage`}/>
										<button type="button" className="btn btn-success" onClick={this.startDischarge.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Start Discharging</button>
										<button type="button" className="btn btn-success" onClick={this.stopDischarge.bind(this, {cellIndex: cellIndex})}  style={{margin:10}}>Stop Discharging</button><br />
										</div>
									</div>
								);
							}, this)
						}
					</div>

					<div className="col-sm-6">
						<h3>Cooling</h3>

						<div className="row">
							<button type="button" className="btn btn-primary" onClick={this.requestCooling.bind(this)}  style={{margin:10}}>Start Stream</button>
							<button type="button" className="btn btn-success" onClick={this.startCooling.bind(this)}  style={{margin:10}}>Start Cooling</button>
						</div>

						<div className="row">
							Test solenoid pin&nbsp;
							<select value={this.state.selectedPin} onChange={this.handlePinChange.bind(this)}>
								<option value="4">4</option>
								<option value="8">8</option>
								<option value="16">16</option>
								<option value="22">22</option>
								<option value="23">23</option>
							</select>:
							<button type="button" className="btn btn-success" onClick={this.testSolenoid.bind(this)}  style={{margin:10}}>Test</button>
						</div>
					</div>

				</div>
            </div>
	    );
	}
}

export default Power_Overview;
