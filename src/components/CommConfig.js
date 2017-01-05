import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';

import io from 'socket.io-client';
let socket = io.connect('127.0.0.1:3000', {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: Infinity
		});

class CommConfig extends Component {
	constructor(props) {
		super(props)
		this.render = this.render.bind(this);

		this.state = {
			streamManager: new StreamingPageManager(),
			value: 0,
            commConfig: "Loading..."
		}
	}

    componentDidMount() {
        var _this = this;

		
        socket.on('connect', function() {
			console.log('Client now connected!')
			
            socket.emit('commConfig:req')

			socket.on('commConfig:res', function(data){
                var commConfig = JSON.stringify(data, null, '    ')
                _this.setState({commConfig: commConfig})
			})
		});
    }

	render() {
		var labels = [];
		/*
		for (var i = 0;i<1000;i++){
			var paramString = "Value " + i;
			var keyString = "Val" + i;
			labels.push(<div key={keyString} >{i}:<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter={paramString} units="Gs" key={keyString} /> </div>)
		}*/
	    return (
		    	<div className="Overview-content">
                <pre>{this.state.commConfig}</pre>
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