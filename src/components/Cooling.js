import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import ConfirmButton from './buttons/ConfirmButton.js';

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

    this.solenoids = [
      1, 2, 3, 4
    ];

    this.labels = [
      {label: 'Hover 1', value: '1'},
      {label: 'Hover 2', value: '3'},
      {label: 'Brakes 1', value: '5'},
      {label: 'Brakes 1', value: '7'},
      {label: 'Hover 3', value: '9'},
      {label: 'Hover 4', value: '11'},
      {label: 'Hover 5', value: '13'},
      {label: 'Hover 6', value: '15'},
      {label: 'Brakes 2', value: '17'},
      {label: 'Brakes 2', value: '19'},
      {label: 'Hover 7', value: '21'},
      {label: 'Hover 8', value: '23'}
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
  handleCoolingToggle (cooling, action) {
    var coolingControl = this.state.coolingControl;

    // toggles the hover engine status {bool}
    if (action === 'open_solenoid') {
      coolingControl[cooling.name - 1] = 2;
      this.setState({coolingControl: coolingControl});

      socket.emit('HETherm:ControlCooling', {
        solenoid: cooling.name,
        action: 1
      });
    } else {
      coolingControl[cooling.name - 1] = 2;
      this.setState({coolingControl: coolingControl});

      socket.emit('HETherm:ControlCooling', {
        solenoid: cooling.name,
        action: 0
      });
    }
  }

  /**
   * Sets the automatic/manual control state for the HET solenoids.
   * @param {bool} setManual Toggles the hover engine manual status if true, auto if false.
   */
  handleModeToggle (setManual) {
    //  {bool}
    if (setManual) {
      socket.emit('HETherm:ControlMode', 1);
    } else {
      socket.emit('HETherm:ControlMode', 0);
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
            parameter={`HE Fault Flags`}/>
          </div>
        </div>
        {
          this.labels.map(function (item, index) {
            let coolableUnit = `HE ${item.value}`;
            let spareValue = parseInt(item.value) + 1;
            let spareUnit = `HE ${spareValue}`;
            return (
            <div className="row" key={coolableUnit}>
              <div className="col-sm-3">
                <label>{item.label} Temperature (C)</label>
                <GenericParameterLabel
                StreamingPageManager={_this.state.streamManager}
                parameter={`${coolableUnit} Temperature`} hex={item.hex}/>
              </div>

              <div className="col-sm-3">
                <label>{item.label} Temperature confirm (C)</label>
                <GenericParameterLabel
                StreamingPageManager={_this.state.streamManager}
                parameter={`${spareUnit} Temperature`} hex={item.hex}/>
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
          <div className='col-md-12 buttonpad'>
            <h4>Mode: </h4> <GenericParameterLabel
            StreamingPageManager={_this.state.streamManager}
            parameter={`HE Manual Control Mode`}/>
            <ConfirmButton className="btn btn-success" delay={2000} action={_this.handleModeToggle.bind(_this, false)}>Automatic Control</ConfirmButton>
            <ConfirmButton className="btn btn-danger" delay={2000} action={_this.handleModeToggle.bind(_this, true)}>Manual Control</ConfirmButton>
          </div>
          {
            this.solenoids.map((item, index) => {
              return (
                <div className="col-sm-3">
                  <label>State:</label>
                  <GenericParameterLabel
                    StreamingPageManager={_this.state.streamManager}
                    parameter={`HE ${item} Solenoid Open State`} hex={item.hex}/>
                </div>
              );
            }, this)
          }
          {this.state['coolingControl'].map((item, index) => {
            return (
              <div className="col-sm-3" key={'CoolingGroup_' + (index + 1)}>
                <h4>Group {index + 1}</h4>
                <div className='form-group buttonpad'>
                  <ConfirmButton className="btn btn-success" delay={2000} action={_this.handleCoolingToggle.bind(_this, {name: index}, 'open_solenoid')}>Open Solenoid</ConfirmButton>
                  <ConfirmButton className="btn btn-danger" delay={2000} action={_this.handleCoolingToggle.bind(_this, {name: index}, 'close_solenoid')}>Close Solenoid</ConfirmButton>
                </div>
              </div>
            );
          })}
          {/* <div className="col-sm-3">
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
          </div> */}
        </fieldset>
      </div>

      </div>
    );
  }
}

export default Cooling;
