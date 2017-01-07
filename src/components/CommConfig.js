import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import config from '../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket;

class CommConfig extends Component {
	constructor(props) {
		super(props)
		this.render = this.render.bind(this);

		this.state = {
			streamManager: new StreamingPageManager(),
			value: 0,
            commConfig: config
		}

	}

	newSocketConnection(host, socketPort, serverName){
		socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});
		
		var _this = this;

		socket.on('connect', function() {
			console.log('Client now connected!')
			
			//join pubsub group
			socket.emit('join', {name: 'configs', room: 'commConfig'});

			socket.on('udp:event', function (data) {
				console.log(data);
			});
		});

		socket.on('disconnected', function() {
			console.log('Client got disconnected!')
			console.log('Opening new connection')

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

    componentDidMount() {
        var _this = this;
    }

	handleChange(e){
		var _name = e.currentTarget.name,
			_value = e.currentTarget.value;

		var _new_inputs = {
            Appserver: {
                port: 3000,
                ip: '127.0.0.1'
            },
            // Used for testing purposes
            PodRxPort:'9100', // Pod details
            PodRxHost:'127.0.0.1',
            RXServers:[ {'port':911,'hostIP':'192.168.0.110','hostName':'Power Node A'},
                {'port':9111,'hostIP':'192.168.0.111','hostName':'Power Node B'},
                {'port':9100,'hostIP':'192.168.1.100','hostName':'Flight Control'},
                {'port':9120,'hostIP':'192.168.0.120','hostName':'Landing Gear'},
                {'port':9130,'hostIP':'192.168.0.130','hostName':'Gimbal Control'},
                {'port':9900,'hostIP':'127.0.0.1','hostName':'localhost'},
                {'port':9170,'hostIP':'192.168.1.170','hostName':'Xilinx Sim'}
            ],
            MirrorLocal:true
        } //TODO replace with actually data

        //socket.emit("update_commConfig", {name: _name, value: _value})
        socket.emit("update_commConfig", _new_inputs)
	}

	render() {
		var _this = this;
		var inputs = [];

	    return (
		    	<div className="Overview-content">
				{Object.keys(this.state.commConfig).map(function(item, index){
                	var label = item,
						input = _this.state.commConfig[label];

					switch(typeof(input))
					{
						case 'object':
						{
							if(Array.isArray(input))
							{
								input.map(function(aItem, aIndex){
									if(typeof(aItem) === 'object')
									{
										var aoInputGroup = [];
										aoInputGroup.push({legend: label});
								

										Object.keys(aItem).map(function(aoItem, aoIndex){
											var aoLabel = aoItem,
												aoInput = aItem[aoLabel];

												return aoInputGroup.push({input: aoInput, label: aoLabel});
										})

										return inputs.push(aoInputGroup)
									}
									else{
										var aLabel = Object.keys(aItem),
											aInput = aItem;

										return inputs.push({legend: label, input: aInput, label: aLabel});
									}
								})
							}
							else
							{
								var oInputGroup = [];
								oInputGroup.push({legend: label});

								Object.keys(input).map(function(oItem, oIndex){
									var oLabel = oItem,
										oInput = input[oLabel];

										return oInputGroup.push({input: oInput, label: oLabel});
								})

								return inputs.push(oInputGroup)
							}
							break;
						}
						default:
						{
							return inputs.push({legend: label, input: input, label: label});
						}
					}

					return false;
                })	
			}
					{
						inputs.map(function(elem, inx){
							var isArr = Array.isArray(elem);
							function elemGroup(){
								if(isArr)
								{
									return (<fieldset>
									<legend>{elem[0].legend}</legend>
										{elem.map(function(e, i){
											if(e.label) //do not show empty inputs
											{
												return(
													<div key={inx+"-"+i} className="form-group">
														<label htmlFor={e.label}>{e.label}</label>
														<input type="text" id={e.label} name={e.label} value={e.input} onChange={_this.handleChange}/>
													</div>
												);
											}
											return false;
										})}
									</fieldset>);
								}
								else
								{
									return (<fieldset>
									<legend>{elem.legend}</legend>
										<label htmlFor={elem.label}>{elem.label}</label>
										<input type="text" id={elem.label} name={elem.label} value={elem.input} onChange={_this.handleChange}/>
									</fieldset>);
								}
							}
							return(
								<div key={inx} className="form-group">
									{
										elemGroup()
									}
								</div>
							);
						})
					}
			</div>
	    );
	}
}

export default CommConfig;




// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js


// WEBPACK FOOTER //
// ./src/components/CommConfig.js