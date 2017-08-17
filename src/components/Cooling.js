import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import NumericInput from './NumericInput.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class Cooling extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),

      selectedPin: '4',

      coolingControl: [
        0, 0, 0, 0
      ]
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

  /**
  * toggles the hover engine status
  *
  * @param {object} e -input change Event
  *
  * @memberOf Throttles
  */
  handleCoolingToggle (cooling, e) {
    var coolingControl = this.state.coolingControl;

    // toggles the hover engine status {bool}
    if (e.currentTarget.value === 'true') {
      coolingControl[cooling.name - 1] = 1;
      this.setState({coolingControl: coolingControl});

      socket.emit('FlightControl_Hover:StartCooling', {coolingName: cooling.name});
    } else if (e.currentTarget.value === 'initiate') {
      coolingControl[cooling.name - 1] = 2;
      this.setState({coolingControl: coolingControl});

      socket.emit('FlightControl_Hover:OpenSolenoid', {solenoidName: cooling.name});
    } else {
      coolingControl[cooling.name - 1] = 0;
      this.setState({coolingControl: coolingControl});

      socket.emit('FlightControl_Hover:StopCooling', {coolingName: cooling.name});
    }
  }

  testSolenoid (e) {
    e.preventDefault();
    socket.emit(`PowerA:TestSolenoidPin${this.state.selectedPin}`);
  }

  startRepressurizing (e) {
    e.preventDefault();
    socket.emit(`PowerA:StartRepressurizing`);
  }

  requestCooling (e) {
    e.preventDefault();
    socket.emit(`PowerA:RequestCooling`);
  }

  startCooling (e) {
    e.preventDefault();
    socket.emit(`PowerA:StartCooling`);
  }

  render () {
    var _this = this;
    var buttonClasses = 'btn btn-primary ' + ((this.state.developmentMode) ? '' : 'disabled');

    let borderStyle = {border: '2px solid black', borderRadius: '10px', padding: '10px', width: '50%'};

    return (
      <div>
      <h2>Cooling</h2>
      <div className="col-md-12">
        <h3 className="section-title">Cooling</h3>

        <div className="row">
          <button type="button" className="btn btn-primary" onClick={this.requestCooling.bind(this)} style={{margin: 10}}>Start Stream</button>
          <button type="button" className="btn btn-success" onClick={this.startCooling.bind(this)} style={{margin: 10}}>Start Cooling</button>
        </div>

        <div className="row" key={'CoolingState'}>
          <div className="col-sm-12">
            <label>General Cooling State</label>
            <GenericParameterLabel
            StreamingPageManager={_this.state.streamManager}
            parameter={`Power A Cooling State`}/>
          </div>
        </div>
        {
          this.labels.map(function (item, index) {
            var coolableUnit = `Power A Cooling ${item.value}`;
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

      <div className="col-md-12">
        {/* Cooling */}
        <fieldset>
          <legend>Cooling</legend>
          <div className="col-sm-3">
            <h4>Group 1</h4>

            <div className='form-group'>
              <input type="radio" name="Group1" id="Group1True" value="true" checked={this.state['coolingControl'][0] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})} />

              <label htmlFor="Group1True">
                on
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group1" id="Group1False" value="false" checked={this.state['coolingControl'][0] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>

              <label htmlFor="Group1False">
                off
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group1" id="Group1Initiate" value="initiate" checked={this.state['coolingControl'][0] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 1})}/>

              <label htmlFor="Group1Initiate">
                initiate
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <h4>Group 2</h4>

            <div className='form-group'>
              <input type="radio" name="Group2" id="Group2True" value="true" checked={this.state['coolingControl'][2] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})} />

              <label htmlFor="Group2True">
                on
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group2" id="Group2False" value="false" checked={this.state['coolingControl'][2] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>

              <label htmlFor="Group2False">
                off
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group2" id="Group2Initiate" value="initiate" checked={this.state['coolingControl'][2] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 2})}/>

              <label htmlFor="Group2Initiate">
                initiate
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <h4>Group 3</h4>

            <div className='form-group'>
              <input type="radio" name="Group3" id="Group3True" value="true" checked={this.state['coolingControl'][3] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})} />

              <label htmlFor="Group3True">
                on
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group3" id="Group3False" value="false" checked={this.state['coolingControl'][3] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>

              <label htmlFor="Group3False">
                off
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group3" id="Group3Initiate" value="initiate" checked={this.state['coolingControl'][3] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 3})}/>

              <label htmlFor="Group3Initiate">
                initiate
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <h4>Group 4</h4>

            <div className='form-group'>
              <input type="radio" name="Group4" id="Group4True" value="true" checked={this.state['coolingControl'][4] === 1} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})} />

              <label htmlFor="Group4True">
                on
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group4" id="Group4False" value="false" checked={this.state['coolingControl'][4] === 0} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>

              <label htmlFor="Group4False">
                off
              </label>
            </div>

            <div className='form-group'>
              <input type="radio" name="Group4" id="Group4Initiate" value="initiate" checked={this.state['coolingControl'][4] === 2} onChange={_this.handleCoolingToggle.bind(_this, {name: 4})}/>

              <label htmlFor="Group4Initiate">
                initiate
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      </div>
    );
  }
}

export default Cooling;
