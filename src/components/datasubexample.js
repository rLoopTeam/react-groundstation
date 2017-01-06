import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';

class DataStreamExample extends Component {
	constructor(props) {
		super(props)
		this.render = this.render.bind(this);

		this.state = {
			streamManager: new StreamingPageManager(),
			value: 0
		}
	}

	render() {
	    return (
		    	<div className="Overview-content">
				<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Test 1: x' />
				<GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter='Test 1: f' />
				</div>
	    );
	}
}

export default DataStreamExample;

