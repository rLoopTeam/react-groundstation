import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';

class DataStreamExample extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			streamManager: new StreamingPageManager(),
			value: 0
		}
	}

	render() {
	    return (
		    	<div className="Overview-content">
				<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Value 1" />
				<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Value 2" />
				</div>
	    );
	}
}

export default DataStreamExample;

