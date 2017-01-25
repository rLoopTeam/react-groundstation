import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import LineChart from './charts/LineChart.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';
import ConfirmButton from './buttons/ConfirmButton.js';

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

    resetPod() {
    	console.log("rest pod")
    }

	render() {
	    return (
			<div>
				<legend>Mission</legend>
				<div className="row">
					<ConfirmButton className="btn btn-danger" delay={2000} action={this.resetPod}>Enter pre-run phase</ConfirmButton>
				</div>
				<div>
					<legend>Pod Health</legend>
					<FaultFlagDisplay   StreamingPageManager={this.state.streamManager} label="Right Fault Flags" parameter='Brake Fault flags 2' />
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-6">
								<LineChart 
									id="AccelerometerChart1"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Accel 0 X Gs', 'Accel 0 Y Gs', 'Accel 0 Z Gs']}
									title="Accelerometer 0"
									yAxisLabel="Gs"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
							<div className="col-md-6">
								<LineChart 
									id="AccelerometerChart3"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Accel 1 X Gs', 'Accel 1 Y Gs', 'Accel 1 Z Gs']}
									title="Accelerometer 1"
									yAxisLabel="Gs"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-6">
								<LineChart 
									id="BMSAPressure"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Power A BMS Node Pressure']}
									title="Power node A pressure"
									yAxisLabel="Pressure"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
							<div className="col-md-6">
								<LineChart 
									id="BMSBPressure"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Power B BMS Node Pressure']}
									title="Power node B pressure"
									yAxisLabel="Pressure"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<LineChart 
									id="BMSAPressure"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Power A BMS Node Temp']}
									title="Power node A Temperature"
									yAxisLabel="Temperature"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
							<div className="col-md-6">
								<LineChart 
									id="BMSBPressure"
									StreamingPageManager={this.state.streamManager} 
									parameters={['Power B BMS Node Temperature']}
									title="Power node B temperature"
									yAxisLabel="Temperature"
									xAxisLabel="Time"
									totalPoints={60}
								/>
							</div>
						</div>
						<div className="row">
							<LineChart 
								id="BMSBTemp"
								StreamingPageManager={this.state.streamManager} 
								parameters={['Power B BMS Node Temp']}
								title="Power node B temperature"
								yAxisLabel="Temperature"
								xAxisLabel="Time"
								totalPoints={60}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;

