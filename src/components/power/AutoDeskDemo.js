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
      {label: 'Highest Temp Sensor Value', value: `Power ${props.route.L} BMS Highest Sensor Value`},
      {label: 'Pack Current', value: `Power ${props.route.L} BMS Battery Current`},
      {label: 'Charge Current', value: `Power ${props.route.L} BMS Charging Current`},
      {label: 'State of Charge', value: `Power ${props.route.L} BMS State of Charge`}
    ];

    this.labels2 = [
      {label: 'Highest Cell Volts', value: `Power ${props.route.L} BMS Highest Cell Volts`},
      {label: 'Lowest Cell Volts', value: `Power ${props.route.L} BMS Lowest Cell Volts`},
      {label: 'Voltage Updates', value: `Power ${props.route.L} BMS Voltage Updates`},
      {label: 'Latch Relay', value: `Power ${props.route.L} BMS Latch Relay`}
    ];

    this.HoverEnginesData = [
      {label: 'Requested RPM ', value: 'Throttle Requested RPM '},
      {label: 'Current RPM ', value: 'Throttle Current RPM '},
      {label: 'ASI RPM ', value: 'Throttle ASI RPM '}
    ];

    this.Requested_RPM = [
      {label: 'Throttle V 1', value: 'ASI Throttle Voltage 1'},
      {label: 'Throttle V 2', value: 'ASI Throttle Voltage 2'},
      {label: 'Throttle V 3', value: 'ASI Throttle Voltage 3'},
      {label: 'Throttle V 4', value: 'ASI Throttle Voltage 4'},
      {label: 'Throttle V 5', value: 'ASI Throttle Voltage 5'},
      {label: 'Throttle V 6', value: 'ASI Throttle Voltage 6'},
      {label: 'Throttle V 7', value: 'ASI Throttle Voltage 7'},
      {label: 'Throttle V 8', value: 'ASI Throttle Voltage 8'}
    ];

    this.Current_RPM = [
      {label: 'Cmd V 1', value: 'ASI Command Voltage 1'},
      {label: 'Cmd V 2', value: 'ASI Command Voltage 2'},
      {label: 'Cmd V 3', value: 'ASI Command Voltage 3'},
      {label: 'Cmd V 4', value: 'ASI Command Voltage 4'},
      {label: 'Cmd V 5', value: 'ASI Command Voltage 5'},
      {label: 'Cmd V 6', value: 'ASI Command Voltage 6'},
      {label: 'Cmd V 7', value: 'ASI Command Voltage 7'},
      {label: 'Cmd V 8', value: 'ASI Command Voltage 8'}
    ];

    this.ASI_RPM = [
      {label: 'RPM 1', value: 'ASI HE RPM 1'},
      {label: 'RPM 2', value: 'ASI HE RPM 2'},
      {label: 'RPM 3', value: 'ASI HE RPM 3'},
      {label: 'RPM 4', value: 'ASI HE RPM 4'},
      {label: 'RPM 5', value: 'ASI HE RPM 5'},
      {label: 'RPM 6', value: 'ASI HE RPM 6'},
      {label: 'RPM 7', value: 'ASI HE RPM 7'},
      {label: 'RPM 8', value: 'ASI HE RPM 8'}
    ];

    this.ASI_Data = [
      {label: 'Fault Flags', value: 'Fault Flags Root'},
      {label: 'State', value: 'State'},
      {label: 'Scan index', value: 'Scan Index'},
      {label: 'Current command', value: 'Current Command'},
      {label: 'Controller fault', value: 'Controller Fault'},
      {label: 'Temperature', value: 'Temperature'},
      {label: 'HE RPM', value: 'HE RPM'},
      {label: 'Throttle (V)', value: 'Throttle Voltage'}
    ];

    this.cellIndexes = [...(new Array(18)).keys()];

    this.labels3 = [
      {}
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  enableDevMode (datae, e) {
    e.preventDefault();
    socket.emit('FlightControl_ThrottleDevMode:Enable');
  }

  DisableAutoBalance (data, e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:DisableAutoBalance`, data);
  }

  StreamASI (data, e) {
    e.preventDefault();
    socket.emit('FlightControl:Stream_ASI');
  }

  SetThrottle (data, e) {
    e.preventDefault();
    socket.emit(`FCUHover_SetThrottle`, data);
  }

  render () {
    var _this = this;
    var buttonClasses = 'btn btn-primary ' + ((this.state.developmentMode) ? '' : 'disabled');

    let borderStyle = {border: '2px solid black', borderRadius: '10px', padding: '10px', width: '50%'};

    var hes = [];
    for (var he = 1; he < 9; he++) {
      var paramsArr = [];
      paramsArr.push(this.Requested_RPM[he - 1]);
      paramsArr.push(this.Current_RPM[he - 1]);
      paramsArr.push(this.ASI_RPM[he - 1]);
      hes.push({name: 'HE ' + he, params: paramsArr});
    }

    return (
            <div>
        <h2>Autodesk Demo</h2>
        <div className="row">

          <div className="col-sm-6">
            <h3 className="section-title">Power Systems</h3>

            <button type="button" className="btn btn-success" onClick={this.DisableAutoBalance.bind(this, {})} style={{margin: 10}}>Disable Auto Balancing</button>

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
              <h4>Charge voltage: 4.2 V</h4><h4>Minimum voltage: 3.2V</h4>
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
              <h3 className="section-title">Pod Control</h3>
              <button className="btn btn-primary" onClick={this.StreamASI.bind(this)} style={{margin: 10}}>Stream ASI</button>
              <button className="btn btn-primary" onClick={this.enableDevMode.bind(this)} style={{margin: 10}}>Enable HEs</button>
              <button className="btn btn-primary" onClick={this.SetThrottle.bind(this, {engines: 8, throttle: 300, ramp: 1})} style={{margin: 10}}>HEs Slow</button>
              <button className="btn btn-primary" onClick={this.SetThrottle.bind(this, {engines: 8, throttle: 500, ramp: 1})} style={{margin: 10}}>HEs Fast</button>
              <button className="btn btn-primary" onClick={this.SetThrottle.bind(this, {engines: 8, throttle: 0, ramp: 1})} style={{margin: 10}}>HEs Off</button>
              <h4>Must click button every 20 seconds or the engines will automatically shut off.</h4>
          </div>

        </div>
        <div className="row">
        <h3 className="section-title">HE Status</h3>
          <div>
            {hes.map(function (item, index) {
              if (index < 8) {
                return (
                    <div className='col-lg-1'><p>{item.name}</p>
                    {item.params.map(function (iitem, iindex) {
                      return (
                        <div>{iitem.label}
                        <GenericParameterLabel StreamingPageManager={_this.state.streamManager} parameter={iitem.value}/>
                        </div>
                      );
                    })}
                    </div>
                ); }
            })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Power_Overview;
