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
            hoverEngineModeSelection: [
                0, 0, 0, 0,
                0, 0, 0, 0,
            ],
            hoverEngineMode: [
                false, false, false, false,
                false, false, false, false,
            ],
            hoverEngineSpeed: [
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

    handleHoverEngineModeToggle(hoverEngineName, e)
    {
        var _this = this,
            hoverEngineMode = this.state["hoverEngineMode"],//get the hoverEngineMode array
            hoverEngineModeSelection = this.state["hoverEngineModeSelection"];//get the hoverEngineModeSelection array

            
        if(e.currentTarget.value === 'true')
        {
            var shouldEnableHoverEngineMode = confirm("WARNING: You are about to enable hoverEngine mode.");
            
            if (shouldEnableHoverEngineMode){ //user confirmed action
                hoverEngineModeSelection[hoverEngineName] = 1; // set a value in the hoverEngineModeSelection array
                hoverEngineMode[hoverEngineName] = true; // set a value in the hoverEngineMode array

                _this.setState({
                    hoverEngineModeSelection: hoverEngineModeSelection,
                    hoverEngineMode: hoverEngineMode
                });
                socket.emit('FlightControl_Hover:EnableHEX', {hoverEngineName: hoverEngineName});
            } else { //user denied action
                hoverEngineModeSelection[hoverEngineName] = 0; // set a value in the hoverEngineModeSelection array
                hoverEngineMode[hoverEngineName] = false; // set a value in the hoverEngineMode array

                _this.setState({
                    hoverEngineModeSelection: hoverEngineModeSelection,
                    hoverEngineMode: hoverEngineMode
                });
                socket.emit('FlightControl_Hover:DisableHEX', {hoverEngineName: hoverEngineName});
            }
        }
        //turn off hoverEngine mode
        else{
            hoverEngineModeSelection[hoverEngineName] = 0; // set a value in the hoverEngineModeSelection array
            hoverEngineMode[hoverEngineName] = false; // set a value in the hoverEngineMode array

            _this.setState({
                hoverEngineModeSelection: hoverEngineModeSelection,
                hoverEngineMode: hoverEngineMode
            });
            socket.emit('FlightControl_Hover:DisableHEX', {hoverEngineName: hoverEngineName});
        }
    }

    handleSetHoverEngineSpeed(hoverEngineName, e)
    {
        var hoverEngineSpeed = this.state.hoverEngineSpeed;
            hoverEngineSpeed[hoverEngineName] = e.currentTarget.value;

        this.setState({hoverEngineSpeed: hoverEngineSpeed})
    }

    sendSetHEXSpeed(hoverEngineName, e)
    {
        var hoverEngineSpeed = this.state.hoverEngineSpeed[hoverEngineName];
        socket.emit('FlightControl_Hover:SetHEXSpeed', {hoverEngineName, hoverEngineSpeed})
    }

    createHoverEngineInputLoop() {
        var hoverEngineInputs = [];
        for(var _i = 1; _i <= 8; _i ++)
        {
            hoverEngineInputs.push(
                <div key={_i} className="col-xs-3">
                    <h4>Hover Engine: {_i}</h4>
                    <div className='form-group'>
                        <input type="radio" name={"hoverEngineMode"+_i} id={"hoverEngineModeTrue"+_i} value="true" checked={this.state["hoverEngineModeSelection"][_i]} onChange={this.handleHoverEngineModeToggle.bind(this, _i)} />

                        <label htmlFor={"hoverEngineModeTrue"+_i}>
                            on
                        </label>
                    </div>
                        
                    <div className='form-group'>
                        <input type="radio" name={"hoverEngineMode"+_i} id={"hoverEngineModeFalse"+_i} value="false" checked={!this.state["hoverEngineModeSelection"][_i]} onChange={this.handleHoverEngineModeToggle.bind(this, _i)}/>
                        
                        <label htmlFor={"hoverEngineModeFalse"+_i}>
                            off
                        </label>
                    </div>

                    <div className={this.state["hoverEngineModeSelection"][_i] ? '' : 'hidden'}>
                        <div className='form-group'>
                            <label htmlFor={"hoverEngineModeValue"+_i}>Set HoverEngine Speed Value</label>
                            <input type="text" name={"hoverEngineModeValue"+_i} id={"hoverEngineModeValue"+_i} onChange={this.handleSetHoverEngineSpeed.bind(this, _i)} />
                            <button className="btn btn-primary" onClick={this.sendSetHEXSpeed.bind(this, _i)}>Send</button>
                        </div>
                    </div>
                </div>
            )

            if(_i % 4 === 0)
            {
                hoverEngineInputs[_i] = <div key={'row'+_i} className="row"> {hoverEngineInputs[_i]} </div>;
            }
        }
        return hoverEngineInputs;
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
                            <h4>Group 1</h4>

                            <div className='form-group'>
                                <input type="radio" name="Group1" id="Group1True" value="true" checked={this.state["coolingControl"][0] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})} />

                                <label htmlFor="Group1True">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group1" id="Group1False" value="false" checked={this.state["coolingControl"][0] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>
                                
                                <label htmlFor="Group1False">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group1" id="Group1Initiate" value="initiate" checked={this.state["coolingControl"][0] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>
                                
                                <label htmlFor="Group1Initiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Group 2</h4>

                            <div className='form-group'>
                                <input type="radio" name="Group2" id="Group2True" value="true" checked={this.state["coolingControl"][2] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})} />

                                <label htmlFor="Group2True">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group2" id="Group2False" value="false" checked={this.state["coolingControl"][2] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>
                                
                                <label htmlFor="Group2False">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group2" id="Group2Initiate" value="initiate" checked={this.state["coolingControl"][2] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>
                                
                                <label htmlFor="Group2Initiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Group 3</h4>

                            <div className='form-group'>
                                <input type="radio" name="Group3" id="Group3True" value="true" checked={this.state["coolingControl"][3] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})} />

                                <label htmlFor="Group3True">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group3" id="Group3False" value="false" checked={this.state["coolingControl"][3] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>
                                
                                <label htmlFor="Group3False">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group3" id="Group3Initiate" value="initiate" checked={this.state["coolingControl"][3] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>
                                
                                <label htmlFor="Group3Initiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Group 4</h4>

                            <div className='form-group'>
                                <input type="radio" name="Group4" id="Group4True" value="true" checked={this.state["coolingControl"][4] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})} />

                                <label htmlFor="Group4True">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group4" id="Group4False" value="false" checked={this.state["coolingControl"][4] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>
                                
                                <label htmlFor="Group4False">
                                    off
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="Group4" id="Group4Initiate" value="initiate" checked={this.state["coolingControl"][4] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>
                                
                                <label htmlFor="Group4Initiate">
                                    initiate
                                </label>
                            </div>
                        </div>
                </fieldset>

                {/*Development Mode*/}
                <fieldset>
                    <legend>Hover Engine Mode</legend>
                    {_this.createHoverEngineInputLoop()}
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
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
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
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
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
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
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