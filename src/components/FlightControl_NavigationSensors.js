import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class FlightControl_NavigationSensors extends Component {
  constructor (props) {
    super(props);
    this.state = {
      streamManager: new StreamingPageManager()
    };
    this.accelerometerLabels = {
      accelerometer1: [
              {label: 'Accelerometer 1 X Raw', value: 'Accel 1 X Raw'},
              {label: 'Accelerometer 1 Y Raw', value: 'Accel 1 Y Raw'},
              {label: 'Accelerometer 1 Z Raw', value: 'Accel 1 Z Raw'}
      ],
      accelerometer2: [
              {label: 'Accelerometer 2 X Raw', value: 'Accel 2 X Raw'},
              {label: 'Accelerometer 2 Y Raw', value: 'Accel 2 Y Raw'},
              {label: 'Accelerometer 2 Z Raw', value: 'Accel 2 Z Raw'}
      ]
    };
    this.rangefinderLabels = [
            {label: 'Faults', value: 'ForwardLaser Fault Flags'},
            {label: 'Distance', value: 'ForwardLaser Distance'},
            {label: 'Previous Distance', value: 'ForwardLaser Previous Distance'},
            {label: 'Velocity', value: 'ForwardLaser Velocity'},
            {label: 'Distance Raw', value: 'ForwardLaser Distance Raw'},
            {label: 'Acceleration', value: 'ForwardLaser Acceleration'},
            {label: 'Previous Acceleration', value: 'ForwardLaser Previous Acceleration'},
            {label: 'Binary Distance', value: 'ForwardLaser Binary Distance'},
            {label: 'Missed Start', value: 'ForwardLaser Missed Start'},
            {label: 'Bad Distance', value: 'ForwardLaser Bad Distance'},
            {label: 'Error Code', value: 'ForwardLaser Error Code'}
    ];
    this.laserheightLabels = [
            {label: 'Forward Left', value: 'LaserOpto 1 Raw distance'},
            {label: 'Forward Right', value: 'LaserOpto 2 Raw distance'},
            {label: 'Rear Left', value: 'LaserOpto 3 Raw distance'},
            {label: 'Rear Right', value: 'LaserOpto 4 Raw distance'},
            {label: 'Yaw Forward', value: 'LaserOpto 5 Raw distance'},
            {label: 'Yaw Rear', value: 'LaserOpto 6 Raw distance'}
    ];
    this.contrastsensorLabels = [
            {label: 'LaserContrast0 Rising Count', value: 'LaserContrast0 Rising Count'}
    ];
    this.temperaturesensorLabels = [
            // TODO get the packet definitions for pod temperature sensor
    ];
    this.pressuresensorLabels = [
            // TODO get the packet definitions for pod pressure sensor
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  streamLaserData (e) {
    e.preventDefault();
    socket.emit('FlightControl_Accel:StartStream_Lasers');
  }

  streamForwardLaserData (e) {
    e.preventDefault();
    socket.emit('FlightControl_Accel:StartStream_ForwardLaser');
  }

  render () {
    return (
        <div>
              <h2>Navigation sensors</h2>
                <div className="row">
                {<button type="button" className="btn btn-success" onClick={this.streamLaserData} style={{margin: 10}}>Stream Opto Lasers</button>}
                {<button type="button" className="btn btn-success" onClick={this.streamForwardLaserData} style={{margin: 10}}>Stream Forward Laser</button>}
                    <div className="col-sm-4">
                      <legend>Accelerometer 1 raw values</legend>

                        {this.accelerometerLabels.accelerometer1.map(function (item, index) {
                          return (
                                <div className="row" key={'accelerometer1' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={this.state.streamManager}
                                        parameter={item.value} />
                                </div>
                          );
                        }, this)}

                    </div>
                    <div className="col-sm-4">
                      <legend>Accelerometer 2 raw values</legend>

                        {/* <button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button> */}
                        {this.accelerometerLabels.accelerometer2.map(function (item, index) {
                          return (
                                <div className="row" key={'accelerometer2' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={this.state.streamManager}
                                        parameter={item.value} />
                                </div>
                          );
                        }, this)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                      <legend>Laser Range finder raw values</legend>

                        {/* <button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button> */}
                        {this.rangefinderLabels.map(function (item, index) {
                          return (
                                <div className="row" key={'rangefinder' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={this.state.streamManager}
                                        parameter={item.value} />
                                </div>
                          );
                        }, this)}

                    </div>
          <div className="col-sm-4">
                      <legend>Laser Distance Sensors</legend>

                        {/* <button className="btn btn-primary" onClick={this.requestBMSA.bind(this)}  style={{margin:10}}>Start BMS Stream</button> */}
                        {this.laserheightLabels.map(function (item, index) {
                          return (
                                <div className="row" key={'laseropto' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={this.state.streamManager}
                                        parameter={item.value} />
                                </div>
                          );
                        }, this)}

                    </div>
                </div>
      </div>
    );
  }
}

export default FlightControl_NavigationSensors;
