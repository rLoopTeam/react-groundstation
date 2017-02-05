import React, { Component } from 'react';
import GenericParameterInput from './GenericParameterInput.js';
import StreamingPageManager from '../StreamingPageManager.js';

class FunctionalTest extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'FlightControl_Accel'
    };
  }

  render () {
    return (
			<div>
				<a href='http://confluence.rloop.org/display/SD/Operational+Procedure#OperationalProcedure-2.FunctionalTest-"Bench"'>See http://confluence.rloop.org/display/SD/Operational+Procedure#OperationalProcedure-2.FunctionalTest-"Bench"</a>

				<div>
					<h2>State machine</h2>
					<p>TODO: something about manual control of actuators?</p>
				</div>

				<div>
					<h2>Track</h2>
					<p>TODO: Show details about today's test track</p>
				</div>

				<div>
					<h2>Documents</h2>
					<p>TODO: something about Pod health check</p>
					<ul>
						<li>TODO: Nominal Current Draw</li>
						<li>TODO: Cells voltage (min - nominal - max)</li>
					</ul>
				</div>

				<div>
					<h2>Ground station</h2>

					<div>
						<h3>Batteries</h3>

						<h4>Current draw value</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Temperature</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Charge</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Voltage</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
					</div>

					<div>
						<h3>Navigation</h3>

						<h4>Accelerometers (2)</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Range finder</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Height (5)</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Contrast (3)</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Internal temperature</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>

						<h4>Pressure</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
					</div>

					<h4>Values from Pod health list document</h4>

					<div>
						<h4>Brakes</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<p>TODO: On button</p>
						<p>TODO: Off button</p>
					</div>

					<div>
						<h4>LCO2 valves (TODO: multiple?)</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<p>TODO: On button</p>
						<p>TODO: Off button</p>
					</div>

					<div>
						<h4>Relays (TODO: multiple?)</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<p>TODO: On button</p>
						<p>TODO: Off button</p>
					</div>

					<div>
						<h4>Landing gear</h4>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/>
						<p>TODO: Deploy button</p>
						<p>TODO: Retract button</p>
					</div>

					<div>
						<h3>Hover engines (TODO: how many?)</h3>
						<table>
							<tr>
								<th>RPM</th>
								<th>Current draw</th>
								<th>Power draw</th>
								<th>Controller voltage</th>
								<th>Controller temperature</th>
								<th>Engine temperature</th>
							</tr>
							<tr>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
							</tr>
							<tr>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
								<td><GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='TODO' hideUnits='true' hex='true' readOnly='true'/></td>
							</tr>
						</table>
						<p>TODO: Start button(s)</p>
						<p>TODO: Set RPM</p>
						<p>TODO: Stop button</p>
					</div>

					<div>
						<h3>Emergency stop</h3>
						<p>TODO</p>
					</div>

					<div>
						<h3>State</h3>
						<p>TODO</p>
					</div>

					<div>
						<h3>Timestamp (of last received UDP packet?)</h3>
						<p>TODO</p>
					</div>
				</div>
			</div>
    );
  }

}

export default FunctionalTest;
