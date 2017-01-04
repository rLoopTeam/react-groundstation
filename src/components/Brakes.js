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

class Brakes extends Component {
	constructor(props) {
		super(props)
		this.render = this.render.bind(this);

		this.state = {
			streamManager: new StreamingPageManager(),
            developmentMode: 0,
            brakesSelection: 2,
            nextBrakePosition: null,
            brake0Distance: null,
            brake1Distance: null,
		}

        this.labels = [
            {label: "Parking Brake", value: "Brake Parking"},
            {label: "Left Screw Pos", value: "Brake Left Screw Pos"},
            {label: "Right Screw Pos", value: "Brake Right Screw Pos"},
            {label: "Left Extend Limit", value: "Brake Left Extend Limit"},
            {label: "Right Extend Limit", value: "Brake Right Extend Limit"},
            {label: "Left Retract Limit", value: "Brake Left Retract Limit"},
            {label: "Right Retract Limit", value: "Brake Right Retract Limit"},
            {label: "FL I-Beam Dist", value: "Brake FL I-Beam Dist"},
            {label: "RL I-Beam Dist", value: "Brake RL I-Beam Dist"},
            {label: "FR I-Beam Dist", value: "Brake FR I-Beam Dist"},
            {label: "RR I-Beam Dist", value: "Brake RR I-Beam Dist"},
            {label: "Left MLP Raw", value: "Brake Left MLP Raw"},
            {label: "Right MLP Raw", value: "Brake Right MLP Raw"},
            {label: "Left MLP Scaled", value: "Brake Left MLP Scaled"},
            {label: "Right MLP Scaled", value: "Brake Right MLP Scaled"},
        ]
	}

    componentDidMount() {
        var _this = this;
        // socket.on('connect', function() {
		// 	console.log('Client now connected!')
        //     socket.emit('commConfig:req')

		// 	socket.on('commConfig:res', function(data){
        //         var commConfig = JSON.stringify(data, null, '    ')
        //         _this.setState({commConfig: commConfig})
		// 	})
		// });
    }


    brakesSelectionHandler(changeEvent){
        this.setState({
            brakesSelection: changeEvent.target.value
        });
    }

    brakesDevModeHandler(changeEvent){
        
        this.setState({
            developmentMode: changeEvent.target.value
        });

        if (this.state.developmentMode == 0) {
            socket.emit('FlightControl_Brake:DisableDevelopmentMode');
        } else if (this.state.developmentMode == 1) {
            socket.emit('FlightControl_Brake:EnableDevelopmentMode');
        }
    }
    
    brakePositionHandler(changeEvent) {
        this.setState({
            nextBrakePosition: parseInt(changeEvent.target.value)
        });
    }

    updateBrakes() {
        if(this.state.developmentMode){
            var shouldUpdateBrakePosition = confirm("WARNING: You are about to change the brake distance. This is a dangerous operation.");
            if (shouldUpdateBrakePosition){
                socket.emit('FlightControl_Brake:MoveMotorRAW', {command: this.state.brakesSelection, 
                                                                 position: this.state.nextBrakePosition});
            } else {

            }
        }else{
            alert("You need to be in development mode to change the brake position. This is a dangerous operation.")
        }
    }

	render() {
        console.log(this.state.streamManager)
		var _this = this;
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
                    })
                }

                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div class="form-group">
                            <label>Development mode</label>
                            <div class="radio">
                                <label htmlFor="dev-mode-off"><input type="radio" id="dev-mode-off" name="brakesDevMode" value="0" 
                                        onChange={this.brakesDevModeHandler.bind(this)} 
                                        checked={this.state.developmentMode == 0}/>OFF</label> 
                            </div> 
                            <div class="radio">
                                <label htmlFor="dev-mode-on"><input type="radio" id="dev-mode-on" name="brakesDevMode" value="1" 
                                        onChange={this.brakesDevModeHandler.bind(this)} 
                                        checked={this.state.developmentMode == 1}/>ON</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <NumericInput label="Brake position" 
                                onChange={this.brakePositionHandler.bind(this)}/>

                        <label>Brake selection</label>
                        <div class="form-group">
                            <div class="radio">
                                <label htmlFor="brake-selection-0"><input type="radio" id="brake-selection-0" name="brakesSelection" value="0" 
                                        onChange={this.brakesSelectionHandler.bind(this)} 
                                        checked={this.state.brakesSelection == 0} />Brake 0</label>
                            </div> 
                            <div class="radio">
                                <label htmlFor="brake-selection-1"><input type="radio" id="brake-selection-1" name="brakesSelection" value="1" 
                                        onChange={this.brakesSelectionHandler.bind(this)} 
                                        checked={this.state.brakesSelection == 1}/>Brake 1</label>
                            </div>
                            <div class="radio">
                                <label htmlFor="brake-selection-2"><input type="radio" id="brake-selection-2" name="brakesSelection" value="2" 
                                    onChange={this.brakesSelectionHandler.bind(this)} 
                                    checked={this.state.brakesSelection == 2}/>Both</label>
                            </div>
                        </div>
                        <button onClick={this.updateBrakes.bind(this)}>Update brake position</button>
                    </div>
                </div>
            </div>
	    );
	}
}

export default Brakes;

