import React, { Component } from 'react';
import StreamingPageManager from '../../StreamingPageManager.js';
import GenericParameterLabel from './../GenericParameterLabel.js';
import NumericInput from './../NumericInput.js';

import createSocket from '../../shared/socket';
let socket = createSocket();

class PowerCooling extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),

      selectedPin: '4'
    };

    this.labels = [
      {label: 'Hover1/2', value: 'Hover1/2'},
      {label: 'Hover3/4', value: 'Hover3/4'},
      {label: 'Hover5/6', value: 'Hover5/6'},
      {label: 'Hover7/8', value: 'Hover7/8'},
      {label: 'Eddy Brakes', value: 'EddyBrake'}
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  handlePinChange (e) {
    e.preventDefault();
    this.setState({
      selectedPin: e.target.value
    });
  }

  testSolenoid (e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:TestSolenoidPin${this.state.selectedPin}`);
  }

  startRepressurizing (e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StartRepressurizing`);
  }

  requestCooling (e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:RequestCooling`);
  }

  startCooling (e) {
    e.preventDefault();
    socket.emit(`Power${this.props.route.L}:StartCooling`);
  }

  render () {
    var _this = this;
    var buttonClasses = 'btn btn-primary ' + ((this.state.developmentMode) ? '' : 'disabled');

    let borderStyle = {border: '2px solid black', borderRadius: '10px', padding: '10px', width: '50%'};

    return (
        <div>
          <h2>Pack {this.props.route.L}</h2>
            <div className="col-sm-6">
              <h3 className="section-title">Cooling</h3>

              <div className="row">
                <button type="button" className="btn btn-primary" onClick={this.requestCooling.bind(this)} style={{margin: 10}}>Start Stream</button>
                <button type="button" className="btn btn-success" onClick={this.startCooling.bind(this)} style={{margin: 10}}>Start Cooling</button>
              </div>

                    <div className="row" key={this.props.route.L + 'CoolingState'}>
                      <div className="col-sm-12">
                        <label>General Cooling State</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={`Power ${this.props.route.L} Cooling State`}/>
                      </div>
                    </div>
              {
                this.labels.map(function (item, index) {
                  var coolableUnit = `Power ${this.props.route.L} Cooling ${item.value}`;
                  return (
                    <div className="row" key={coolableUnit}>
                      <div className="col-sm-3">
                        <label>{item.label} Temperature C</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={`${coolableUnit} Temp`} hex={item.hex}/>
                      </div>
                      <div className="col-sm-3">
                        <label>{item.label} Cooling State</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={`${coolableUnit} Cooling State`} hex={item.hex}/>
                      </div>
                      <div className="col-sm-3">
                        <label>{item.label} Solenoid State</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={`${coolableUnit} Solenoid State`} hex={item.hex}/>
                      </div>
                      <div className="col-sm-3">
                        <label>{item.label} Solenoid Pin</label>
                        <GenericParameterLabel
                          StreamingPageManager={_this.state.streamManager}
                          parameter={`${coolableUnit} Solenoid Pin`} hex={item.hex}/>
                      </div>
                    </div>
                  );
                }, this)
              }

              <div className="row">
                <button type="button" className="btn btn-success" onClick={this.startRepressurizing.bind(this)} style={{margin: 10}}>Start Repressurizing</button>
              </div>

              <div className="row">
                Test Cooling&nbsp;
                <select value={this.state.selectedPin} onChange={this.handlePinChange.bind(this)}>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                </select>:
                <button type="button" className="btn btn-success" onClick={this.testSolenoid.bind(this)} style={{margin: 10}}>Test</button>
              </div>
            </div>
        </div>
    );
  }
}

export default PowerCooling;
