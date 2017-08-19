import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';

import createSocket from '../shared/socket';

let socket = createSocket();

class FlightControl_Contrast extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'FlightControl_Contrast'
    };

    this.labels = {
      sensor0: [
        {label: 'Contrast Sensor 0 Faults', value: 'LaserContrast0 System Fault Flags'},
        {label: 'Contrast Sensor 0 Laser Faults', value: 'LaserContrast0 Laser Fault Flags'},
        {label: 'Contrast Sensor 0 Rising Count', value: 'LaserContrast0 Rising Count'},
        {label: 'Contrast Sensor 0 Fallling Count', value: 'LaserContrast0 Falling Count'}
      ],
      sensor1: [
        {label: 'Contrast Sensor 1 Faults', value: 'LaserContrast1 System Fault Flags'},
        {label: 'Contrast Sensor 1 Laser Faults', value: 'LaserContrast1 Laser Fault Flags'},
        {label: 'Contrast Sensor 1 Rising Count', value: 'LaserContrast1 Rising Count'},
        {label: 'Contrast Sensor 1 Fallling Count', value: 'LaserContrast1 Falling Count'}
      ],
      sensor2: [
        {label: 'Contrast Sensor 2 Faults', value: 'LaserContrast2 System Fault Flags'},
        {label: 'Contrast Sensor 2 Laser Faults', value: 'LaserContrast2 Laser Fault Flags'},
        {label: 'Contrast Sensor 2 Rising Count', value: 'LaserContrast2 Rising Count'},
        {label: 'Contrast Sensor 2 Fallling Count', value: 'LaserContrast2 Falling Count'}
      ]
    };
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  FCUContrast_StartStream (e) {
    e.preventDefault();
    socket.emit('FlightControl_Contrast:StartStream');
  }
  FCUContrast_StopStream (e) {
    e.preventDefault();
    socket.emit('FlightControl_Contrast:StopStream');
  }

  render () {
    let _this = this;

    return (
      <div className="Overview-content">
        <legend>Contrast Sensor - Streaming</legend>
          <form className="form-inline">
            <div className="form-group">
              <button type="button" className="btn btn-success" onClick={this.FCUContrast_StartStream}>Start Stream</button>
              <button type="button" className="btn btn-danger" onClick={this.preventDefault}>Stop Stream</button>
            </div>
          </form>

          {/* oh god why */}
          {Object.keys(this.labels).map(function (item, labelsIndex) {
            return (
              <div className='col-md-3' key={'labels' + labelsIndex}>
                {this.labels[item].map(function (item, itemIndex) {
                  return (
                    <div className="row" key={'items' + itemIndex}>
                      <label>{item.label}</label>
                      <GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter={item.value} hex={item.hex}/>
                    </div>
                  );
                })}
              </div>
            );
          }, this)}
      </div>
    );
  }
}

export default FlightControl_Contrast;
