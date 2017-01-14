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
        if(e.currentTarget.value)
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
        // toggles the hover engine status {bool}
        if(e.currentTarget.value)
            socket.emit('FlightControl_Hover:EnableStaticHovering');

        else
            socket.emit('FlightControl_Hover:ReleaseStaticHovering');
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
        // toggles the hover engine status {bool}
        if(e.currentTarget.value)
            socket.emit('FlightControl_Hover:StartCooling', {coolingName: cooling.name});

        else
            socket.emit('FlightControl_Hover:StopCooling', {coolingName: cooling.name});
    }


    // 'FlightControl_Hover:EnableHEX': (data) => {
    //     podCommands.FCUHover_EnableHEX(data.hexName)
    // },
    
    // 'FlightControl_Hover:SetHEXSpeed': (data) => {
    //     podCommands.FCUHover_SetHEXSpeed(data.hewName, data.hexSpeed)
    // },
    
    // 'FlightControl_Hover:OpenSolenoid': (data) => {
    //     podCommands.FCUHover_OpenSolenoid(data.solenoidName)
    // },



    










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
                            <input type="radio" name="StaticHovering" id="StaticHoveringTrue" value="true" onChange={_this.handleStaticHoveringToggle.bind(_this)} />

                            <label htmlFor="StaticHoveringTrue">
                                on
                            </label>
                        </div>
                            
                        <div className='form-group'>
                            <input type="radio" name="StaticHovering" id="StaticHoveringFalse" value="false" onChange={_this.handleStaticHoveringToggle.bind(_this)}/>
                            
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
                                <input type="radio" name="CoolingFL" id="CoolingFLTrue" value="true" onChange={_this.handleCoolingToggle.bind(_this, {name: 1})} />

                                <label htmlFor="CoolingFLTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFL" id="CoolingFLFalse" value="false" onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>
                                
                                <label htmlFor="CoolingFLFalse">
                                    off
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Front Right</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingFR" id="CoolingFRTrue" value="true" onChange={_this.handleCoolingToggle.bind(_this, {name: 2})} />

                                <label htmlFor="CoolingFRTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingFR" id="CoolingFRFalse" value="false" onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>
                                
                                <label htmlFor="CoolingFRFalse">
                                    off
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Rear Left</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingRL" id="CoolingRLTrue" value="true" onChange={_this.handleCoolingToggle.bind(_this, {name: 3})} />

                                <label htmlFor="CoolingRLTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRL" id="CoolingRLFalse" value="false" onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>
                                
                                <label htmlFor="CoolingRLFalse">
                                    off
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Rear Right</h4>

                            <div className='form-group'>
                                <input type="radio" name="CoolingRR" id="CoolingRRTrue" value="true" onChange={_this.handleCoolingToggle.bind(_this, {name: 4})} />

                                <label htmlFor="CoolingRRTrue">
                                    on
                                </label>
                            </div>
                                
                            <div className='form-group'>
                                <input type="radio" name="CoolingRR" id="CoolingRRFalse" value="false" onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>
                                
                                <label htmlFor="CoolingRRFalse">
                                    off
                                </label>
                            </div>
                        </div>
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