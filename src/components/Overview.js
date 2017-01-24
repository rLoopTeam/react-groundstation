import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import LineChart from './charts/LineChart.js';

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			streamManager: new StreamingPageManager()
		}
	}

	componentWillMount() {
	}

	componentWillUnmount(){

    }


	render() {

	    return (
			<div>
				
			</div>
		);
	}
}

export default Overview;

