import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import config from '../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket;

class Throttles extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			streamManager: new StreamingPageManager(),
            hexModeSelection: [
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            hexMode: [
                false, false, false, false,
                false, false, false, false,
            ],
            hexSpeed: [
                0, 0, 0, 0,
                0, 0, 0, 0,
            ], 
            staticHovering: [
                0, 1
            ],
            coolingControl:
            [
                0,0,0,0
            ]
		}

        /**
         * Creates a list of object used to iterate over elements.
         * 
         * @param {string} label //contains label element text that will be seen on page
         * @param {string} value //contains parameter name from packetDefinition file
         * 
         * @memberOf Throttles
         */
        this.Requested_RPM = [
            {label: 'Requested RPM 1', value: 'Requested RPM 1'},
            {label: 'Requested RPM 2', value: 'Requested RPM 2'},
            {label: 'Requested RPM 3', value: 'Requested RPM 3'},
            {label: 'Requested RPM 4', value: 'Requested RPM 4'},
            {label: 'Requested RPM 5', value: 'Requested RPM 5'},
            {label: 'Requested RPM 6', value: 'Requested RPM 6'},
            {label: 'Requested RPM 7', value: 'Requested RPM 7'},
            {label: 'Requested RPM 8', value: 'Requested RPM 8'},
        ]

        this.Current_RPM = [
            {label: 'Current RPM 1', value: 'Current RPM 1'},
            {label: 'Current RPM 2', value: 'Current RPM 2'},
            {label: 'Current RPM 3', value: 'Current RPM 3'},
            {label: 'Current RPM 4', value: 'Current RPM 4'},
            {label: 'Current RPM 5', value: 'Current RPM 5'},
            {label: 'Current RPM 6', value: 'Current RPM 6'},
            {label: 'Current RPM 7', value: 'Current RPM 7'},
            {label: 'Current RPM 8', value: 'Current RPM 8'},
        ]

        this.ASI_RPM = [
            {label: 'ASI RPM 1', value: 'ASI RPM 1'},
            {label: 'ASI RPM 2', value: 'ASI RPM 2'},
            {label: 'ASI RPM 3', value: 'ASI RPM 3'},
            {label: 'ASI RPM 4', value: 'ASI RPM 4'},
            {label: 'ASI RPM 5', value: 'ASI RPM 5'},
            {label: 'ASI RPM 6', value: 'ASI RPM 6'},
            {label: 'ASI RPM 7', value: 'ASI RPM 7'},
            {label: 'ASI RPM 8', value: 'ASI RPM 8'},
        ]

	}

	newSocketConnection(host, socketPort, serverName){
		socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});
		
		socket.on('connect', function() {
			
			//join pubsub group
			socket.emit('join', {name: 'hoverEngines', room: 'hoverEngines'});

		});

		socket.on('disconnected', function() {

			if(serverName === 'one')
				this.startServerTwo()
			if(serverName === 'two')
				this.startServerOne()
		});
	}

	startServerOne() {
		this.newSocketConnection(this.state.socketIp, this.state.socketPort, 'one')
	}

	startServerTwo() {
		this.newSocketConnection(this.state.socketIp, this.state.socketPort, 'two')
	}

	componentWillMount() {
        this.startServerOne()
	}
    
    /**
     * toggles the hover engine status
     * 
     * @param {object} e -input change Event
     * 
     * @memberOf Throttles
     */
    handleHoverToggle(e)
    {
        // toggles the hover engine status {bool}
        if(e.currentTarget.value === 'true')
            socket.emit('FlightControl_Hover:Enable');

        else
            socket.emit('FlightControl_Hover:Disable');
    }
    
    /**
     * toggles the hover engine status
     * 
     * @param {object} e -input change Event
     * 
     * @memberOf Throttles
     */
    handleStaticHoveringToggle(e)
    {
        var staticHovering = this.state.staticHovering;
        // toggles the hover engine status {bool}
        if(e.currentTarget.value === 'true')
        {
            staticHovering[0] = 1;
            staticHovering[1] = 0;
            this.setState({staticHovering: staticHovering});

            socket.emit('FlightControl_Hover:EnableStaticHovering');
        }
        else
        {
            staticHovering[0] = 0;
            staticHovering[1] = 1;
            this.setState({staticHovering: staticHovering});

            socket.emit('FlightControl_Hover:ReleaseStaticHovering');
        }
    }
    
    /**
     * toggles the hover engine status
     * 
     * @param {object} e -input change Event
     * 
     * @memberOf Throttles
     */
    handleCoolingToggle(cooling, e)
    {
        var coolingControl = this.state.coolingControl;

        // toggles the hover engine status {bool}
        if(e.currentTarget.value === 'true')
        {
            coolingControl[cooling.name - 1] = 1;
            this.setState({coolingControl: coolingControl});

            socket.emit('FlightControl_Hover:StartCooling', {coolingName: cooling.name});
        }

        else if(e.currentTarget.value === 'initiate')
        {
            coolingControl[cooling.name - 1] = 2;
            this.setState({coolingControl: coolingControl});

            socket.emit('FlightControl_Hover:OpenSolenoid', {solenoidName: cooling.name});
        }

        else
        {
            coolingControl[cooling.name - 1] = 0;
            this.setState({coolingControl: coolingControl});

            socket.emit('FlightControl_Hover:StopCooling', {coolingName: cooling.name});
        }
    }

    handleHexModeToggle(hexName, e)
    {
        var _this = this,
            hexMode = this.state["hexMode"],//get the hexMode array
            hexModeSelection = this.state["hexModeSelection"];//get the hexModeSelection array

            
        if(e.currentTarget.value === 'true')
        {
            var shouldEnableHexMode = confirm("WARNING: You are about to enable hex mode.");
            
            if (shouldEnableHexMode){ //user confirmed action
                hexModeSelection[hexName] = 1; // set a value in the hexModeSelection array
                hexMode[hexName] = true; // set a value in the hexMode array

                _this.setState({
                    hexModeSelection: hexModeSelection,
                    hexMode: hexMode
                });
                socket.emit('FlightControl_Hover:EnableHEX', {hexName: hexName});
            } else { //user denied action
                hexModeSelection[hexName] = 0; // set a value in the hexModeSelection array
                hexMode[hexName] = false; // set a value in the hexMode array

                _this.setState({
                    hexModeSelection: hexModeSelection,
                    hexMode: hexMode
                });
                socket.emit('FlightControl_Hover:DisableHEX', {hexName: hexName});
            }
        }
        //turn off hex mode
        else{
            hexModeSelection[hexName] = 0; // set a value in the hexModeSelection array
            hexMode[hexName] = false; // set a value in the hexMode array

            _this.setState({
                hexModeSelection: hexModeSelection,
                hexMode: hexMode
            });
            socket.emit('FlightControl_Hover:DisableHEX', {hexName: hexName});
        }
    }

    handleSetHexSpeed(hexName, e)
    {
        var hexSpeed = this.state.hexSpeed;
            hexSpeed[hexName] = e.currentTarget.value;

        this.setState({hexSpeed: hexSpeed})
    }

    sendSetHEXSpeed(hexName, e)
    {
        var hexSpeed = this.state.hexSpeed[hexName];
        socket.emit('FlightControl_Hover:SetHEXSpeed', {hexName, hexSpeed})
    }

    createHexInputLoop() {
        var hexInputs = [];
        for(var _i = 1; _i <= 8; _i ++)
        {
            hexInputs.push(
                <div key={_i} className="col-xs-3">
                    <h4>Hex Name: {_i}</h4>
                    <div className='form-group'>
                        <input type="radio" name={"hexMode"+_i} id={"hexModeTrue"+_i} value="true" checked={this.state["hexModeSelection"][_i]} onChange={this.handleHexModeToggle.bind(this, _i)} />

                        <label htmlFor={"hexModeTrue"+_i}>
                            on
                        </label>
                    </div>
                        
                    <div className='form-group'>
                        <input type="radio" name={"hexMode"+_i} id={"hexModeFalse"+_i} value="false" checked={!this.state["hexModeSelection"][_i]} onChange={this.handleHexModeToggle.bind(this, _i)}/>
                        
                        <label htmlFor={"hexModeFalse"+_i}>
                            off
                        </label>
                    </div>

                    <div className={this.state["hexModeSelection"][_i] ? '' : 'hidden'}>
                        <div className='form-group'>
                            <label htmlFor={"hexModeValue"+_i}>Set Hex Speed Value</label>
                            <input type="text" name={"hexModeValue"+_i} id={"hexModeValue"+_i} onChange={this.handleSetHexSpeed.bind(this, _i)} />
                            <button className="btn btn-primary" onClick={this.sendSetHEXSpeed.bind(this, _i)}>Send</button>
                        </div>
                    </div>
                </div>
            )

            if(_i % 4 === 0)
            {
                hexInputs[_i] = <div key={'row'+_i} className="row"> {hexInputs[_i]} </div>;
            }
        }
        return hexInputs;
    }

    render() {
        var _this = this;

        return(
            <div className="container-fluid">
                <div className="row">{/*Commands*/}

                    {/*Hover*/}
                    <fieldset>
                        <legend>Hover</legend>
                        <div className='form-group'>
                            <input type="radio" name="Hover" id="HoverTrue" value="true" onChange={_this.handleHoverToggle.bind(_this)} />

                            <label htmlFor="HoverTrue">
                                on
                            </label>
                        </div>
                            
                        <div className='form-group'>
                            <input type="radio" name="Hover" id="HoverFalse" value="false" onChange={_this.handleHoverToggle.bind(_this)}/>
                            
                            <label htmlFor="HoverFalse">
                                off
                            </label>
                        </div>
                    </fieldset>


                    {/*Static Hovering*/}
                    <fieldset>
                        <legend>Static Hovering</legend>
                        <div className='form-group'>
                            <input type="radio" name="StaticHovering" id="StaticHoveringTrue" value="true" checked={this.state["staticHovering"][0]} onChange={_this.handleStaticHoveringToggle.bind(_this)} />

                            <label htmlFor="StaticHoveringTrue">
                                on
                            </label>
                        </div>
                            
                        <div className='form-group'>
                            <input type="radio" name="StaticHovering" id="StaticHoveringFalse" value="false" checked={this.state["staticHovering"][1]} onChange={_this.handleStaticHoveringToggle.bind(_this)}/>
                            
                            <label htmlFor="StaticHoveringFalse">
                                off
                            </label>
                        </div>
                    </fieldset>
                    

                    {/*Cooling*/}
                    <fieldset>
                        <legend>Cooling</legend>
                        <div className="col-sm-3">
                            <h4>Front Left</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingFL" id="CoolingFLTrue" value="true" checked={this.state["coolingControl"][0] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})} />

                                <label htmlFor="CoolingFLTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFL" id="CoolingFLFalse" value="false" checked={this.state["coolingControl"][0] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>
                                
                                <label htmlFor="CoolingFLFalse">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFL" id="CoolingFLInitiate" value="initiate" checked={this.state["coolingControl"][0] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>
                                
                                <label htmlFor="CoolingFLInitiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Front Right</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingFR" id="CoolingFRTrue" value="true" checked={this.state["coolingControl"][2] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})} />

                                <label htmlFor="CoolingFRTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFR" id="CoolingFRFalse" value="false" checked={this.state["coolingControl"][2] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>
                                
                                <label htmlFor="CoolingFRFalse">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFR" id="CoolingFRInitiate" value="initiate" checked={this.state["coolingControl"][2] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>
                                
                                <label htmlFor="CoolingFRInitiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Rear Left</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingRL" id="CoolingRLTrue" value="true" checked={this.state["coolingControl"][3] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})} />

                                <label htmlFor="CoolingRLTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRL" id="CoolingRLFalse" value="false" checked={this.state["coolingControl"][3] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>
                                
                                <label htmlFor="CoolingRLFalse">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRL" id="CoolingRLInitiate" value="initiate" checked={this.state["coolingControl"][3] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>
                                
                                <label htmlFor="CoolingRLInitiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Rear Right</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingRR" id="CoolingRRTrue" value="true" checked={this.state["coolingControl"][4] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})} />

                                <label htmlFor="CoolingRRTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRR" id="CoolingRRFalse" value="false" checked={this.state["coolingControl"][4] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>
                                
                                <label htmlFor="CoolingRRFalse">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRR" id="CoolingRRInitiate" value="initiate" checked={this.state["coolingControl"][4] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>
                                
                                <label htmlFor="CoolingRRInitiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                </fieldset>

                {/*Development Mode*/}
                <fieldset>
                    <legend>Hex Mode</legend>
                    {_this.createHexInputLoop()}
                </fieldset>
                </div>

                
                <div className="row">{/*Values returned*/}
                    <div className="col-sm-4">
                    {
                        this.Requested_RPM.map(function(item, index){
                            return (
                                <div className="row" key={"brakes" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={_this.state.streamManager} 
                                        parameter={item.value} hex={item.hex}/>
                                </div>
                            )
                        }, this) //bind keyword this to contained method calls
                    }
                    </div>
                    <div className="col-sm-4">
                    {
                        this.Current_RPM.map(function(item, index){
                            return (
                                <div className="row" key={"brakes" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={_this.state.streamManager} 
                                        parameter={item.value} hex={item.hex}/>
                                </div>
                            )
                        }, this) //bind keyword this to contained method calls
                    }
                    </div>
                    <div className="col-sm-4">
                    {
                        this.ASI_RPM.map(function(item, index){
                            return (
                                <div className="row" key={"brakes" + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel 
                                        StreamingPageManager={_this.state.streamManager} 
                                        parameter={item.value} hex={item.hex}/>
                                </div>
                            )
                        }, this) //bind keyword this to contained method calls
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default Throttles;