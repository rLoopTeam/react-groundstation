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

		var _a = -2.320;
		var _b = -2.320;
        
        for(var _i = 0; _i < 18; _i++)
        {
            this.voltage.push({A: [_a, _b], B: [_a, _b], C: [_a, _b], D: [_a, _b], E: [_a, _b], F: [_a, _b], bool: false, voltage: _a})
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
                                            var val = val.join(units + " | ");
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