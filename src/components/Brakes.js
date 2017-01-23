import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import FaultFlagDisplay from './FaultFlagDisplay';
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

class Brakes extends Component {
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

        this.labelsA = [
            {label: "Left I-Beam", value: "Brake I Beam mm 1 Target"},
            {label: "Left Lead screw target", value: "Brake Lead screw mm 1 Target"},
            {label: "Left Lead screw target", value: "Brake Lead screw um 1 Target"},

            {label: "I Beam mm Current", value: "Brake I Beam mm 1 Current"},
            {label: "Lead Screw mm Current", value: "Brake Lead Screw mm 1 Current"},
            {label: "MLP Current", value: "Brake MLP 1 Current"},

            {label: "Left Extend Limit", value: "Brake Limit Extend 1"},
            {label: "Left Retract Limit", value: "Brake Limit Retract 1"},
            {label: "Left Extend Edge", value: "Brake Limit Extend Edge 1"},
            {label: "Left Retract Edge", value: "Brake Limit Retract Edge 1"},
            {label: "Left Sw Flags", value: "Brake SW Error 1"},

            {label: "Left ADC Sample", value: "Brake ADC Sample 1"},
            {label: "Left ADC Zero", value: "Brake ADC Zero 1"},
            {label: "Left System Span", value: "Brake System Span 1"},
            {label: "Left Brake Position", value: "Brake Position mm 1"},
            {label: "Left Linear Velocity", value: "Brake Linear Velocity 1"},
            {label: "Left Linear Acceleration", value: "Brake Linear Acceleration 1"},
            {label: "Left Current Screw Position", value: "Brake Current Position 1"},
        ]

        this.labelsB = [
            {label: "Right I-Beam", value: "Brake I Beam mm 2 Target"},
            {label: "Right Lead screw target", value: "Brake Lead screw mm 2 Target"},
            {label: "Right Lead screw target", value: "Brake Lead screw um 2 Target"},

            {label: "I Beam mm Current", value: "Brake I Beam mm 2 Current"},
            {label: "Lead Screw mm Current", value: "Brake Lead Screw mm 2 Current"},
            {label: "MLP Current", value: "Brake MLP 2 Current"},

            {label: "Right Extend Limit", value: "Brake Limit Extend 2"},
            {label: "Right Retract Limit", value: "Brake Limit Retract 2"},
            {label: "Right Extend Edge", value: "Brake Limit Extend Edge 2"},
            {label: "Right Retract Edge", value: "Brake Limit Retract Edge 2"},
            {label: "Right Sw Flags", value: "Brake SW Error 2"},

            {label: "Right ADC Sample", value: "Brake ADC Sample 2"},
            {label: "Right ADC Zero", value: "Brake ADC Zero 2"},
            {label: "Right System Span", value: "Brake System Span 2"},
            {label: "Right Brake Position", value: "Brake Position mm 2"},
            {label: "Right Linear Velocity", value: "Brake Linear Velocity 2"},
            {label: "Right Linear Acceleration", value: "Brake Linear Acceleration 2"},
            {label: "Right Current Screw Position", value: "Brake Current Position 2"},
            {label: "State", value:"Brake State", hex:"true"},
            {label: "Calibration State", value:"Brake Calibration State", hex:"true"},
        ]
	}

    componentDidMount() {
        var _this = this;
        socket.emit("FlightControl_Brake:RequestDevelopmentMode");
        socket.on('connect', function() {
			socket.on('FlightControl_Brake:DevelopmentMode', function(data){
                //FlightControl_Brake:RequestDevelopmentMode
                console.log("\n\n\n\n\n\nUI UPDATE DEV MODE FROM POD\n\n\n\n\n",data.developmentMode)
                _this.setState({
                    developmentModeSelection: (data.developmentMode)?1:0,
                    developmentMode: data.developmentMode
                })
			})
		});
    }


    brakesSelectionHandler(changeEvent){
        this.setState({
            brakesSelection: parseInt(changeEvent.currentTarget.value, 10)
        });
    }

    brakesDevModeHandler(changeEvent){
        var _this = this;

        //turn on dev mode
        if(changeEvent.currentTarget.value === '1'){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to enable development mode. This is a dangerous operation and will damage the magnets.");
            if (shouldUpdateBrakePosition){
                _this.setState({
                    developmentModeSelection: 1,
                    developmentMode: true
                });
                socket.emit('FlightControl_Brake:EnableDevelopmentMode');
            } else {
                _this.setState({
                    developmentModeSelection: 0,
                    developmentMode: false
                });
            }
        }
        //turn off dev mode
        else{
            _this.setState({
                developmentModeSelection: 0,
                developmentMode: false
            });
            socket.emit('FlightControl_Brake:DisableDevelopmentMode');
        }
    }

    accelStartStream_Brakes(e) {
        e.preventDefault();
        socket.emit('FlightControl:Stream_Brakes');
    }

	brakeRawPositionHandler(changeEvent) {
        this.setState({
            nextRawBrakePosition: parseInt(changeEvent.currentTarget.value, 10)
        });
    }

    updateRawBrakes() {
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to change the brake distance. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:MoveMotorRAW', {command: this.state.brakesSelection, 
                                                                 position: this.state.nextRawBrakePosition});
            } else {

            }
        }else{
            alert("You need to be in development mode to change the brake position. This is a dangerous operation.")
        }
    }   

    brakeIBeamPositionHandler(changeEvent) {
        this.setState({
            nextIBeamBrakePosition: parseFloat(changeEvent.currentTarget.value, 10)
        });
    }

    updateIBeamBrakes() {
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to change the brake distance. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:MoveMotorIBeam', {position: this.state.nextIBeamBrakePosition});
            } else {

            }
        }else{
            alert("You need to be in development mode to change the brake position. This is a dangerous operation.")
        }
    }   

    brakesBeginInit(){
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to reinitialize the brakes. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:BeginInit', {});
            } else {

            }
        }else{
            alert("You need to be in development mode to reinitialize the brakes. This is a dangerous operation.")
        }
    }

    brakesSetZeroLeft(){
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to rezero the left brake. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:SetZeroLeftBrake', {});
            } else {

            }
        }else{
            alert("You need to be in development mode to rezero the left brake. This is a dangerous operation.")
        }
    }

    brakesSetZeroRight(){
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to rezero the right brake. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:SetZeroRightBrake', {});
            } else {

            }
        }else{
            alert("You need to be in development mode to rezero the right brakes. This is a dangerous operation.")
        }
    }

    brakesSetSpanLeft(){
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to respan the left brake. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:SetSpanLeftBrake', {});
            } else {

            }
        }else{
            alert("You need to be in development mode to span the left brake. This is a dangerous operation.")
        }
    }

    brakesSetSpanRight(){
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to respan the right brake. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:SetSpanRightBrake', {});
            } else {

            }
        }else{
            alert("You need to be in development mode to span the right brake. This is a dangerous operation.")
        }
    }

	render() {
		var _this = this;
        var buttonClasses = "btn btn-primary " + ((this.state.developmentMode) ? "" : "disabled");
        function isbrakesDevModeActive(){
            if(_this.state.developmentModeSelection === 1){
                return '';
            }
            else
            {
                return 'hidden';
            }
        }

        let borderStyle = {border: '2px solid black',borderRadius: '10px',padding: '10px', width:'50%' };

	    return (
            <div>
                <button type="button" className="btn btn-success" onClick={this.accelStartStream_Brakes}  style={{margin:10}}>Stream Brakes Data</button>
                <div className="row">

                    <div className="col-sm-4">
                        <div className="row">
                            <FaultFlagDisplay   StreamingPageManager={this.state.streamManager} label="Left Fault Flags" parameter='Brake Fault flags 1' />
                        </div>
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
                    </div>

                    <div className="col-sm-4">
                        <div className="row">
                            <FaultFlagDisplay   StreamingPageManager={this.state.streamManager} label="Right Fault Flags" parameter='Brake Fault flags 2' />
                        </div>
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
                    </div>

                    <div className="col-sm-4">
                        <div className="row">
                            <div className="form-group">
                                <label>Development mode</label>
                                <div className="radio">
                                    <label htmlFor="dev-mode-off"><input type="radio" id="dev-mode-off" name="brakesDevMode" value="0" 
                                            onChange={_this.brakesDevModeHandler.bind(_this)} 
                                            checked={_this.state.developmentModeSelection === 0}/>OFF</label> 
                                </div> 
                                <div className="radio">
                                    <label htmlFor="dev-mode-on"><input type="radio" id="dev-mode-on" name="brakesDevMode" value="1" 
                                            onChange={_this.brakesDevModeHandler.bind(_this)} 
                                            checked={_this.state.developmentModeSelection === 1}/>ON</label>
                                </div>
                            </div>
                        </div>
                        <div className={isbrakesDevModeActive() + " row"} style={borderStyle}>
                            <div style={{width: '50%'}}>
                                <NumericInput label="Raw Brake Position" 
                                    onChange={_this.brakeRawPositionHandler.bind(_this)}/>
                            </div>            

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
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.updateRawBrakes.bind(_this)}>Update brake position</button>
                        </div>
                        <br />
                        <div className={isbrakesDevModeActive() + " row"} style={borderStyle}>
                            <div style={{marginBottom:'10px'}}>
                                <NumericInput label="I-Beam Brake Position 2.5 - 22 (mm)"
                                    onChange={_this.brakeIBeamPositionHandler.bind(_this)}/>
                                
                            </div>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.updateIBeamBrakes.bind(_this)}>Update I-Beam brake position</button>
                        </div>
                        <br />
                        <div className={isbrakesDevModeActive() + " row"}>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.brakesBeginInit.bind(_this)}>Reinitialize Brake Position</button>
                        </div>
                                            <br />
                        <div className={isbrakesDevModeActive() + " row"}>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.brakesSetZeroLeft.bind(_this)}>Set Zero Left Brake</button>
                        </div>

                                            <br />
                        <div className={isbrakesDevModeActive() + " row"}>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.brakesSetZeroRight.bind(_this)}>Set Zero Right Brake</button>
                        </div>

                                            <br />
                        <div className={isbrakesDevModeActive() + " row"}>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.brakesSetSpanLeft.bind(_this)}>Set Span Left Brake</button>
                        </div>

                                            <br />
                        <div className={isbrakesDevModeActive() + " row"}>
                            <button disabled={(_this.state.developmentMode)?"":"disabled"} className={buttonClasses}
                                onClick={_this.brakesSetSpanRight.bind(_this)}>Set Span Right Brake</button>
                        </div>
                    </div>
                </div>
            </div>
	    );
	}
}

export default Brakes;

