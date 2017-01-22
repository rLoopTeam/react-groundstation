import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

class FlightControl_NavigationSensors extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamManager: new StreamingPageManager()
		}
		this.accelerometerLabels = {
			accelerometer0: [
	            {label: "Accelerometer 0 X Raw", value: "Accel 0 X Raw"},
	            {label: "Accelerometer 0 Y Raw", value: "Accel 0 Y Raw"},
	            {label: "Accelerometer 0 Z Raw", value: "Accel 0 Z Raw"},
	        ],
	        accelerometer1: [
	            {label: "Accelerometer 1 X Raw", value: "Accel 1 X Raw"},
	            {label: "Accelerometer 1 Y Raw", value: "Accel 1 Y Raw"},
	            {label: "Accelerometer 1 Z Raw", value: "Accel 1 Z Raw"},
	        ]
        }
        this.rangefinderLabels = [
            {label: "ForwardLaser RAW value", value: "ForwardLaser RAW value"},
        ]
        this.laserheightLabels = [
            {label: "LaserOpto Raw distance 1", value: "LaserOpto Raw distance 1"},
            {label: "LaserOpto Raw distance 2", value: "LaserOpto Raw distance 2"},
            {label: "LaserOpto Raw distance 3", value: "LaserOpto Raw distance 3"},
            {label: "LaserOpto Raw distance 4", value: "LaserOpto Raw distance 4"},
            {label: "LaserOpto Raw distance 5", value: "LaserOpto Raw distance 5"},
            {label: "LaserOpto Raw distance 6", value: "LaserOpto Raw distance 6"},
            {label: "LaserOpto Raw distance 7", value: "LaserOpto Raw distance 7"},
            {label: "LaserOpto Raw distance 8", value: "LaserOpto Raw distance 8"},
        ]
        this.contrastsensorLabels = [
            {label: "LaserContrast0 Rising Count", value: "LaserContrast0 Rising Count"},
        ]
        this.temperaturesensorLabels = [
            // TODO get the packet definitions for pod temperature sensor
        ]
        this.pressuresensorLabels = [
            // TODO get the packet definitions for pod pressure sensor
        ]
	}

	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}

	
	render(){
	    return (
		    <div>
            	<h2>Navigation sensors</h2>
                <div className="row">
                    <div className="col-sm-4">
                    	<legend>Accelerometer 0 raw values</legend>

                        {/*<button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button>*/}
                        {this.accelerometerLabels.accelerometer0.map(function(item, index){
                            return (
                                <div className="row" key={"accelerometer0" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={this.state.streamManager} 
                                        parameter={item.value} />
                                </div>
                            )
                        }, this)}
                    
                    </div>
                    <div className="col-sm-4">
                    	<legend>Accelerometer 1 raw values</legend>

                        {/*<button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button>*/}
                        {this.accelerometerLabels.accelerometer1.map(function(item, index){
                            return (
                                <div className="row" key={"accelerometer1" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={this.state.streamManager} 
                                        parameter={item.value} />
                                </div>
                            )
                        }, this)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                    	<legend>Laser Range finder raw values</legend>

                        {/*<button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button>*/}
                        {this.rangefinderLabels.map(function(item, index){
                            return (
                                <div className="row" key={"rangefinder" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={this.state.streamManager} 
                                        parameter={item.value} />
                                </div>
                            )
                        }, this)}
                    
                    </div>
					<div className="col-sm-4">
                    	<legend>Laser Opto raw values</legend>

                        {/*<button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button>*/}
                        {this.laserheightLabels.map(function(item, index){
                            return (
                                <div className="row" key={"laseropto" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={this.state.streamManager} 
                                        parameter={item.value} />
                                </div>
                            )
                        }, this)}
                    
                    </div>
                </div>
			</div>
	    );
	}
}

export default FlightControl_NavigationSensors;
