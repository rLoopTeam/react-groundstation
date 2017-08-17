import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import LineChart from './charts/LineChart.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class FlightControl_FullAccel extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'FlightControl_Accel'
    };
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  accelStartStream_CalData (e) {
    e.preventDefault();
    socket.emit('FlightControl_Accel:StartStream_CalData');
  }
  accelStartStream_FullData (e) {
    e.preventDefault();
    socket.emit('FlightControl_Accel:StartStream_FullData');
  }
  accelStopStream (e) {
    e.preventDefault();
    socket.emit('FlightControl_Accel:StopStream');
  }

  accelFineZero (data, e) {
    e.preventDefault();
    // data.accel, data.axis
    socket.emit('FlightControl_Accel:FineZero', data);
  }
  accelAutoZero (data, e) {
    e.preventDefault();
    // data.accel, data.axis
    socket.emit('FlightControl_Accel:AutoZero', data);
  }

  render () {
    return (
        <div className="Overview-content">
        <legend>Streaming Control</legend>
          <form className="form-inline">
            <div className="form-group">
              <button type="button" className="btn btn-success" onClick={this.accelStartStream_CalData} style={{margin: 10}}>Start Cal Stream</button>
              <button type="button" className="btn btn-success" onClick={this.accelStartStream_FullData} style={{margin: 10}}>Start Full Stream</button>
              <button type="button" className="btn btn-danger" onClick={this.accelStopStream} style={{margin: 10}}>Stop Stream</button>

            </div>
          </form>

        <legend>Full Accelerometer Data</legend>

        <LineChart
          id="AccelerometerChart"
          StreamingPageManager={this.state.streamManager}
          parameters={['Accel 1 X Gs', 'Accel 1 Y Gs', 'Accel 1 Z Gs']}
          hideUnits='true'
          title="Accelerometer time-series"
          yRange={[-20, 20]}
          yAxisLabel="Gs"
          xAxisLabel="Time"
          totalPoints={120}
        />

        <div className="row margin-bottom-20px">
          <form className="form-inline col-xs-4">
            <div className="form-group">
                <label htmlFor="a0_x">A1:X-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 X Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a0_y">A1:Y-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Y Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a0_z">A1:Z-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Z Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>
        </div>

        <div className="row">
          <form className="form-inline col-xs-4">
            <div className="form-group">

                <label htmlFor="a1_x">A1:Pitch</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Pitch' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a1_y">A1:Roll</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Roll' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

        </div>

        <br /><br />

        <div className="row">
          <form className="form-inline col-xs-4">
            <div className="form-group">
                <label htmlFor="a1_x">A2:X-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 X Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a0_y">A2:Y-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 Y Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a0_z">A2:Z-Axis</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 Z Gs' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>
        </div>

        <br />

        <div className="row">
          <form className="form-inline col-xs-4">
            <div className="form-group">

                <label htmlFor="a1_x">A2:Pitch</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 X Raw' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">
              <label htmlFor="a1_y">A2:Roll</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 Y Raw' hideUnits='true' readOnly='true'/>
              </div>
            </div>
          </form>
        </div>

        <br></br>
        <br></br>

        <legend>Device Status</legend>
        <div className="row">
          <form className="form-inline col-xs-4">
            <div className="form-group">

              <label htmlFor="a0_flags">A1:Flags</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 1 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">

              <label htmlFor="a1_flags">A2:Flags</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Accel 2 Flags' hideUnits='true' hex='true' hexType={32} readOnly='true'/>
              </div>
            </div>
          </form>
        </div>

        <div className="row">
          <form className="form-inline col-xs-4">
            <div className="form-group">

              <label htmlFor="last_crc">Last CRC</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Last CRC 1003' hideUnits='true' hex='true' readOnly='true'/>
              </div>
            </div>
          </form>

          <form className="form-inline col-xs-4">
            <div className="form-group">

              <label htmlFor="packet_count">Full Data Packet Count</label>
              <div>
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1003' hideUnits='true' readOnly='true'/>
              </div>

            </div>
          </form>
          <div className="form-inline col-xs-4">
              <div>
                <label htmlFor="packet_count">Calib Data Packet Count</label><br />
                <GenericParameterInput StreamingPageManager={this.state.streamManager} parameter='Packet Rx Count 1001' hideUnits='true' readOnly='true'/>
              </div>
          </div>
        </div>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default FlightControl_FullAccel;
