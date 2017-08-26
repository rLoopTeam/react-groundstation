import React, { Component } from 'react';
import StreamingPageManager from '../../StreamingPageManager.js';
import GenericParameterLabel from './../GenericParameterLabel.js';
import NumericInput from './../NumericInput.js';

import createSocket from '../../shared/socket';
let socket = createSocket();

class Power_Overview extends Component {
  constructor (props) {
    super(props);
    this.render = this.render;

    this.state = {
      streamManager: new StreamingPageManager(),

      selectedPin: '4'
    };

    this.labels = [
      {label: 'BMS Faults', value: `Power ${props.route.L} BMS Faults`, hex: 'true'},
      {label: 'Temp State', value: `Power ${props.route.L} BMS Temp State`},
      {label: 'Charger State', value: `Power ${props.route.L} BMS Charger State`},
      {label: 'Num Temp Sensors', value: `Power ${props.route.L} BMS Num Temp Sensors`},
      {label: 'Highest Sensor Value', value: `Power ${props.route.L} BMS Highest Sensor Value`},
      {label: 'Average Temp', value: `Power ${props.route.L} BMS Average Temp`},
      {label: 'Highest Sensor Index', value: `Power ${props.route.L} BMS Highest Sensor Index`},
      {label: 'Pack Current', value: `Power ${props.route.L} BMS Battery Current`},
      {label: 'Charge Current', value: `Power ${props.route.L} BMS Charging Current`},
      {label: 'State of Charge', value: `Power ${props.route.L} BMS State of Charge`}
    ];

    this.labels2 = [
      {label: 'Pack Volts', value: `Power ${props.route.L} BMS Pack Volts`},
      {label: 'Highest Cell Volts', value: `Power ${props.route.L} BMS Highest Cell Volts`},
      {label: 'Lowest Cell Volts', value: `Power ${props.route.L} BMS Lowest Cell Volts`},
      {label: 'Node Temp', value: `Power ${props.route.L} BMS Node Temp`},
      {label: 'Voltage Updates', value: `Power ${props.route.L} BMS Voltage Updates`},
      {label: 'Temp Scan Count', value: `Power ${props.route.L} BMS Temp Scan Count`},
      {label: 'Latch Relay', value: `Power ${props.route.L} BMS Latch Relay`}
    ];

    this.cellIndexes = [...(new Array(18)).keys()];

    this.labels3 = [
      {label: 'Pressure', value: `Power B Node Pressure`}
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  startCharge (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StartCharging`, data);
  }

  stopCharge (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StopCharging`, data);
  }

  startDischarge (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StartDischarging`, data);
  }

  stopDischarge (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StopDischarging`, data);
  }

  stopManualDischarging (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StopManualDischarging`, data);
  }

  requestBMS (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:RequestBMS`);
  }

  IPSchargeV (data, e) {
    e.preventDefault();
    socket.emit(`IPS:ChargeV`, data);
  }

  IPSchargeI (data, e) {
    e.preventDefault();
    socket.emit(`IPS:ChargeI`, data);
  }

  render () {
    var _this = this;
    var buttonClasses = 'btn btn-primary ' + ((this.state.developmentMode) ? '' : 'disabled');

    let borderStyle = {border: '2px solid black', borderRadius: '10px', padding: '10px', width: '50%'};

    return (
            <div>
        <h2>Power Systems</h2>
        <div className="row">

          <div className="col-sm-6">
            <h3 className="section-title">Node A</h3>

            <button className="btn btn-primary" onClick={this.requestBMS.bind(this)} style={{margin: 10}}>Start BMS Stream</button>

            <div className="row">
              <div className="col-sm-6">
              {
                this.labels.map(function (item, index) {
                  return (
                    <div className="row" key={'labels' + index + this.props.route.L}>
                      <label>{item.label}</label>
                      <GenericParameterLabel
                        StreamingPageManager={_this.state.streamManager}
                        parameter={item.value} hex={item.hex}/>
                    </div>
                  );
                }, this)
              }
              </div>

              <div className="col-sm-6">
              {
                this.labels2.map(function (item, index) {
                  return (
                    <div className="row" key={'labels2' + index + this.props.route.L}>
                      <label>{item.label}</label>
                      <GenericParameterLabel
                        StreamingPageManager={_this.state.streamManager}
                        parameter={item.value} hex={item.hex}/>
                    </div>
                  );
                }, this)
              }
              </div>
            </div>
          </div>

          <div className="col-sm-6">
              <h3 className="section-title">Node B</h3>

                {
                  this.labels3.map(function (item, index) {
                    return (
                      <div className="row" key={'labels' + index + this.props.route.L}>
                        <label>{item.label}</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={item.value} hex={item.hex}/>
                      </div>
                    );
                  }, this)
                }
          </div>

        </div>
      </div>
    );
  }
}

export default Power_Overview;
