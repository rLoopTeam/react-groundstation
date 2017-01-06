import React, { Component } from 'react';
import StreamingPageManager from '../../../StreamingPageManager.js';
import config from '../../../../config/commConfig';

import io from 'socket.io-client';

let ip = config.Appserver.ip;
let port = config.Appserver.port;

let socket = io.connect(ip + ':' + port, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});



/*
*   PowerA_Voltage class
*/       

class PowerA_Voltage extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			streamManager: new StreamingPageManager(),
			command: 'PowerA_Voltage',
		}

        this.voltage = [

        ]		

		var _pos = -2.320;
		var _neg = -2.320;
		var _drainVoltage = -1;
        var isDraining = false;
        
        for(var _i = 0; _i < 18; _i++)
        {
            this.voltage.push({
                A: [_pos, _neg], 
                B: [_pos, _neg], 
                C: [_pos, _neg], 
                D: [_pos, _neg], 
                E: [_pos, _neg], 
                F: [_pos, _neg], 
                bool: isDraining, 
                voltage: _drainVoltage
            })
        }
	}
	
	componentDidMount() {
        var _this = this;
		this._isMounted = true;
	}
	
	startAllLogging(data, e) {
		e.preventDefault();
		socket.emit('AllLogging:Start', data);
	}
	
	stopAllLogging(data, e) {
		e.preventDefault();
		socket.emit('AllLogging:Stop', data);
	}
	
	render(){
        var _this = this;

	    return (
		    <div className="Overview-content">
		    	<ul className="list-group">
                {_this.voltage.map(function(item, index){
                    var itemKey = Object.keys(item);

					return (
						<li className="list-group-item" key={index}>
							<div className="row">
							{
								itemKey.map(function(elem, inx){
									var key = elem,
										val = item[key],
                                        units = '°c',
                                        _className = "col-xs-1_5 text-center";

                                    if(key === 'voltage')
                                    {
                                        units = 'V';
                                        _className = "col-xs-1_5 text-center no-right-border";
                                    }
                                    else if(key === 'bool')
                                    {
                                        units = '';
                                        val = val.toString();
                                        _className = "col-xs-1_5 text-right no-right-border";
                                    }
                                    else{
                                        if(Array.isArray(val))
                                        {
                                            val = val.join(units + " | ");
                                        }
                                    }


									return (
											<div key={index + "-" + inx} className={_className}>
											{val}<span>{units}</span>
											</div>
									);
								})
							}
							</div>
						</li>
					);
                 })
                }
                </ul>
			</div>
	    );
	}
}

export default PowerA_Voltage;



// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js


// WEBPACK FOOTER //
// ./src/components/power/unitA/voltage.js