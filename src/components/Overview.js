import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import LineChart from './charts/LineChart.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import ConfirmButton from './buttons/ConfirmButton.js';

import createSocket from '../shared/socket';
let socket = createSocket();

const NamedParameter = (props) => {
  return (
    <div className="form-group row">
      <label className="col-md-6">{props.name}</label>
      <div className="col-md-6">
        <GenericParameterLabel {...props}/>
      </div>
    </div>
  );
};

const LeftRightParameters = ({children}) => {
  return (
    <div className="row">
      <div className="col-sm-6">
        {children[0]}
      </div>
      <div className="col-sm-6">
        {children[1]}
      </div>
    </div>
  );
};

class Overview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };
  }

  componentWillMount () {
  }

  componentWillUnmount () {

  }

  resetPod () {
    socket.emit('ForcePreRunPhase');
  }

  render () {
    return (
      <div>
        <legend>Mission</legend>
        <div className="row">
          <ConfirmButton className="btn btn-danger" delay={2000} action={this.resetPod}>Force pre-run phase</ConfirmButton>
        </div>
        <div>
          <legend>Pod Health</legend>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h3 className="section-title">Brakes</h3>
              </div>
            </div>
            <LeftRightParameters>
              <NamedParameter
                name="State"
                parameter="Brake State"
                hex="true"
                StreamingPageManager={this.state.streamManager}
              />
              <NamedParameter
                name="Calibration State"
                parameter="Brake Calibration State"
                hex="true"
                StreamingPageManager={this.state.streamManager}
              />
            </LeftRightParameters>
            <LeftRightParameters>
              <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Left Fault Flags" parameter='Brake Fault Flags 1' />
              <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label="Right Fault Flags" parameter='Brake Fault Flags 2' />
            </LeftRightParameters>
            <LeftRightParameters>
              <NamedParameter
                name="FL Beam Dist"
                parameter="Brake FL I-Beam Dist"
                StreamingPageManager={this.state.streamManager}
              />
              <NamedParameter
                name="FR Beam Dist"
                parameter="Brake FR I-Beam Dist"
                StreamingPageManager={this.state.streamManager}
              />
            </LeftRightParameters>
            <LeftRightParameters>
              <NamedParameter
                name="RL Beam Dist"
                parameter="Brake RL I-Beam Dist"
                StreamingPageManager={this.state.streamManager}
              />
              <NamedParameter
                name="RR Beam Dist"
                parameter="Brake RR I-Beam Dist"
                StreamingPageManager={this.state.streamManager}
              />
            </LeftRightParameters>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <h3 className="section-title">Navigation</h3>
            </div>
          </div>

            <div className="row">
              <div className="col-md-6">
                <div className="col-md-3">
                  <label>Pitch</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 1 Pitch"/>
                </div>
                <div className="col-md-3">
                  <label>Roll</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 1 Roll"/>
                </div>
                <div className="col-md-3">
                  <label>Yaw</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 1 Yaw"/>
                </div>
                <LineChart
                  id="AccelerometerChart1"
                  StreamingPageManager={this.state.streamManager}
                  parameters={['Accel 1 X Gs', 'Accel 1 Y Gs', 'Accel 1 Z Gs']}
                  title="Accelerometer 1"
                  yAxisLabel="Acceleration (m/s&sup2;)"
                  xAxisLabel="Time (s)"
                  totalPoints={120}
                  height={250}
                />
              </div>
              <div className="col-md-6">
                <div className="col-md-3">
                  <label>Pitch</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 2 Pitch"/>
                </div>
                <div className="col-md-3">
                  <label>Roll</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 2 Roll"/>
                </div>
                <div className="col-md-3">
                  <label>Yaw</label>
                  <GenericParameterLabel StreamingPageManager={this.state.streamManager} parameter="Accel 2 Yaw"/>
                </div>
                <LineChart
                  id="AccelerometerChart3"
                  StreamingPageManager={this.state.streamManager}
                  parameters={['Accel 2 X Gs', 'Accel 2 Y Gs', 'Accel 2 Z Gs']}
                  title="Accelerometer 2"
                  yAxisLabel="Acceleration (m/s&sup2;)"
                  xAxisLabel="Time (s)"
                  totalPoints={120}
                  height={250}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3 className="section-title">Power</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <LineChart
                  id="BMSPressure"
                  StreamingPageManager={this.state.streamManager}
                  parameters={['Power A BMS Node Pressure', 'Power B BMS Node Pressure']}
                  title="Power node Pressure"
                  yAxisLabel="Pressure (bar)"
                  xAxisLabel="Time (s)"
                  totalPoints={120}
                  height={250}
                />
              </div>
              <div className="col-md-6">
                <LineChart
                  id="BMSTemperature"
                  StreamingPageManager={this.state.streamManager}
                  parameters={['Power A BMS Node Temp', 'Power B BMS Node Temp']}
                  title="Power node Temperature"
                  yAxisLabel="Temperature (&deg;C)"
                  xAxisLabel="Time (s)"
                  totalPoints={120}
                  height={250}
                />
              </div>
              <div className="col-md-6">
                <LineChart
                  id="BMSVoltage"
                  StreamingPageManager={this.state.streamManager}
                  parameters={['Power A BMS Pack Volts', 'Power B BMS Pack Volts']}
                  title="Power node Voltage"
                  yAxisLabel="Temperature (V)"
                  xAxisLabel="Time (s)"
                  totalPoints={120}
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
