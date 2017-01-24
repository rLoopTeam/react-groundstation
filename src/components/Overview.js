import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import PressurizationButtons from './repressurization.js';
import MultiSeriesChart from './charts/MultiSeriesChart.js';

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
				<PressurizationButtons />
				<MultiSeriesChart 
					StreamingPageManager={this.state.streamManager} 
					parameters={['Accel 0 X Gs', 'Accel 0 Y Gs', 'Accel 0 Z Gs']}
					hideUnits='true'
					title="Accelerometer time-series"
					lineNames={['X Gs', 'Y Gs', 'Z Gs']}
					yRange={[-20, 20]}
					yAxisLabel="Gs"
					xAxisLabel="Time(ms)"
				/>
			</div>
		);
	}
}

export default Overview;

