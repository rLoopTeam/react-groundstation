import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import NumericInput from './NumericInput.js';
import config from '../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class Steppers extends Component {
	constructor(props) {
		super(props)
		this.render = this.render;

		this.state = {
			streamManager: new StreamingPageManager(),
            developmentMode: false,
            developmentModeSelection: 0,
            brakesSelection: 2,
            nextBrakePosition: null,
            brake0Distance: null,
            brake1Distance: null,
		}

        this.labels = [
            {label: "Left Microstep Resolution", value: "Motor Microstep Resolution 1"},
            {label: "Left Max Acceleration", value: "Motor Max Acceleration 1"},
            {label: "Left Microns Per Revolution", value: "Motor Microns per Revolution 1"},
            {label: "Left Steps Per Revolution", value: "Motor Steps per Revolution 1"},
            {label: "Left Angular Velocity", value: "Motor Max Angular Velocity 1"},

            {label: "Right Microstep Resolution", value: "Motor Microstep Resolution 2"},
            {label: "Right Max Acceleration", value: "Motor Max Acceleration 2"},
            {label: "Right Microns Per Revolution", value: "Motor Microns per Revolution 2"},
            {label: "Right Steps Per Revolution", value: "Motor Steps per Revolution 2"},
            {label: "Right Angular Velocity", value: "Motor Max Angular Velocity 2"},

        ]
	}

    componentDidMount() {
        var _this = this;
    }

    stepperParameterSelectionHandler(changeEvent){
        this.setState({
            parameterSelection: parseInt(changeEvent.currentTarget.value)
        });
    }

    brakesSelectionHandler(changeEvent){
        this.setState({
            brakesSelection: parseInt(changeEvent.currentTarget.value)
        });
    }

	brakePositionHandler(changeEvent) {
        this.setState({
            nextBrakePosition: parseInt(changeEvent.currentTarget.value, 10)
        });
    }

    accelStartStream_MotorsRaw(e) {
        e.preventDefault();
        socket.emit('FlightControl:Stream_MotorsRaw');
    }

    sendStepperParameter() {
        switch(this.state.parameterSelection){
            case 0: if(this.state.brakesSelection == 0 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMaxAngularAccel',{brake:0,value:this.state.nextBrakePosition});} 
                     if(this.state.brakesSelection == 1 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMaxAngularAccel',{brake:1,value:this.state.nextBrakePosition});} 
                     break;
            case 1: if(this.state.brakesSelection == 0 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetPicoMetersPerRev',{brake:0,value:this.state.nextBrakePosition});} 
                     if(this.state.brakesSelection == 1 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetPicoMetersPerRev',{brake:1,value:this.state.nextBrakePosition});} 
                     break;
            case 2:if(this.state.brakesSelection == 0 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMaxRPM',{brake:0,value:this.state.nextBrakePosition});} 
                     if(this.state.brakesSelection == 1 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMaxRPM',{brake:1,value:this.state.nextBrakePosition});} 
                     break;
            case 3: if(this.state.brakesSelection == 0 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMicroStepReslution',{brake:0,value:this.state.nextBrakePosition});} 
                     if(this.state.brakesSelection == 1 || this.state.brakesSelection == 2){ socket.emit('FlightControl_Stepper:SetMicroStepReslution',{brake:1,value:this.state.nextBrakePosition});} 
                     break;
        }
    }   

	render() {
		var _this = this;
        var buttonClasses = "btn btn-primary ";

	    return (
            <div className="row">

                <div className="col-md-6">
                {
                    this.labels.map(function(item, index){
                        return (
                            <div className="row" key={"brakes" + index}>
                                <label>{item.label}</label>
                                <GenericParameterLabel 
                                    StreamingPageManager={_this.state.streamManager} 
                                    parameter={item.value}/>
                            </div>
                        )
                    }, this)
                }

                <button type="button" className="btn btn-success" onClick={this.accelStartStream_MotorsRaw}  style={{margin:10}}>Stream Motor Data</button>
                </div>

                <div className="col-md-6">

                        <label>Stepper Parameters</label><br />

                        <div className="form-group">
                            <div className="radio">
                                <label htmlFor="parameter-selection-0"><input type="radio" id="parameter-selection-0" name="parameterSelection" value="0" 
                                        onChange={_this.stepperParameterSelectionHandler.bind(_this)} 
                                        checked={_this.state.parameterSelection === 0} />Max Angular Acceleration</label>
                            </div> 
                            <div className="radio">
                                <label htmlFor="parameter-selection-1"><input type="radio" id="parameter-selection-1" name="parameterSelection" value="1" 
                                        onChange={_this.stepperParameterSelectionHandler.bind(_this)} 
                                        checked={_this.state.parameterSelection === 1}/>Microns Per Revolution</label>
                            </div>
                            <div className="radio">
                                <label htmlFor="parameter-selection-2"><input type="radio" id="parameter-selection-2" name="parameterSelection" value="2" 
                                    onChange={_this.stepperParameterSelectionHandler.bind(_this)} 
                                    checked={_this.state.parameterSelection === 2}/>Max RPM (Angular Velocity)</label>
                            </div>
                            <div className="radio">
                                <label htmlFor="parameter-selection-3"><input type="radio" id="parameter-selection-3" name="parameterSelection" value="3" 
                                    onChange={_this.stepperParameterSelectionHandler.bind(_this)} 
                                    checked={_this.state.parameterSelection === 3}/>Microstep Resolution</label>
                            </div>
                        </div>

                        <NumericInput onChange={_this.brakePositionHandler.bind(_this)}/><br />

                        <label>Brake selection</label>
                        <div className="form-group">
                            <div className="radio">
                                <label htmlFor="brake-selection-0"><input type="radio" id="brake-selection-0" name="brakesSelection" value="0" 
                                        onChange={_this.brakesSelectionHandler.bind(_this)} 
                                        checked={_this.state.brakesSelection === 0} />Left</label>
                            </div> 
                            <div className="radio">
                                <label htmlFor="brake-selection-1"><input type="radio" id="brake-selection-1" name="brakesSelection" value="1" 
                                        onChange={_this.brakesSelectionHandler.bind(_this)} 
                                        checked={_this.state.brakesSelection === 1}/>Right</label>
                            </div>
                            <div className="radio">
                                <label htmlFor="brake-selection-2"><input type="radio" id="brake-selection-2" name="brakesSelection" value="2" 
                                    onChange={_this.brakesSelectionHandler.bind(_this)} 
                                    checked={_this.state.brakesSelection === 2}/>Both</label>
                            </div>
                        </div>
                        <button className={buttonClasses}
                            onClick={_this.sendStepperParameter.bind(_this)}>Set Parameter</button>

                </div>

            </div>
	    );
	}
}

export default Steppers;

