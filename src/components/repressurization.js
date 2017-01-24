import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';

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

class Repressuization extends Component {
	constructor(props) {
		super(props)
		this.render = this.render;

    }
    
    componentDidMount() {
        var _this = this;
        socket.on('connect', function() {
			socket.on('...', function(data){
                _this.setState({
                })
			})
		});
    }

    pressurize(e)
    {
        socket.emit('pressurize:start');
    }

    stop(e)
    {
        socket.emit('pressurize:stop');
    }

    render()
    {
        return (
		    	<div className="row">
					<div className="col-sm-3">
						<button className="btn btn-success" onClick={this.pressurize.bind(this)}>Start Repressurization</button>
					</div>
					<div className="col-sm-3">
						<button className="btn btn-danger" onClick={this.stop.bind(this)}>Stop Repressurization</button>
					</div>
				</div>
	    );
    }
}

export default Repressuization;