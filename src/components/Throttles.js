import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterLabel from './GenericParameterLabel.js';
import createSocket from '../shared/socket';

let socket = createSocket();

class Throttles extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      hoverEngineModeSelection: [
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
      hoverEngineMode: [
        false, false, false, false,
        false, false, false, false
      ],
      hoverEngineSpeed: [
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
      hovering: [
        0, 1
      ],
      staticHovering: [
        0, 1
      ],
      coolingControl:
      [
        0, 0, 0, 0
      ]
    };

    /**
     * Creates a list of object used to iterate over elements.
     *
     * @param {string} label //contains label element text that will be seen on page
     * @param {string} value //contains parameter name from packetDefinition file
     *
     * @memberOf Throttles
     */
    this.Requested_RPM = [
            {label: 'Requested RPM 1', value: 'Throttle Requested RPM 1'},
            {label: 'Requested RPM 1', value: 'Throttle Requested RPM 1'},
            {label: 'Requested RPM 2', value: 'Throttle Requested RPM 2'},
            {label: 'Requested RPM 3', value: 'Throttle Requested RPM 3'},
            {label: 'Requested RPM 4', value: 'Throttle Requested RPM 4'},
            {label: 'Requested RPM 5', value: 'Throttle Requested RPM 5'},
            {label: 'Requested RPM 6', value: 'Throttle Requested RPM 6'},
            {label: 'Requested RPM 7', value: 'Throttle Requested RPM 7'},
            {label: 'Requested RPM 8', value: 'Throttle Requested RPM 8'}
    ];

    this.Current_RPM = [
            {label: 'Current RPM 1', value: 'Throttle Current RPM 1'},
            {label: 'Current RPM 2', value: 'Throttle Current RPM 2'},
            {label: 'Current RPM 3', value: 'Throttle Current RPM 3'},
            {label: 'Current RPM 4', value: 'Throttle Current RPM 4'},
            {label: 'Current RPM 5', value: 'Throttle Current RPM 5'},
            {label: 'Current RPM 6', value: 'Throttle Current RPM 6'},
            {label: 'Current RPM 7', value: 'Throttle Current RPM 7'},
            {label: 'Current RPM 8', value: 'Throttle Current RPM 8'}
    ];

    this.ASI_RPM = [
            {label: 'ASI RPM 1', value: 'Throttle ASI RPM 1'},
            {label: 'ASI RPM 2', value: 'Throttle ASI RPM 2'},
            {label: 'ASI RPM 3', value: 'Throttle ASI RPM 3'},
            {label: 'ASI RPM 4', value: 'Throttle ASI RPM 4'},
            {label: 'ASI RPM 5', value: 'Throttle ASI RPM 5'},
            {label: 'ASI RPM 6', value: 'Throttle ASI RPM 6'},
            {label: 'ASI RPM 7', value: 'Throttle ASI RPM 7'},
            {label: 'ASI RPM 8', value: 'Throttle ASI RPM 8'}
    ];
  }

  componentWillMount () {
  }

  /**
   * toggles the hover engine status
   *
   * @param {object} e -input change Event
   *
   * @memberOf Throttles
   */
  handleHoverToggle (e) {
    var hovering = this.state.hovering;
    // toggles the hover engine status {bool}
    if (e.currentTarget.value === 'true') {
      hovering[0] = 1;
      hovering[1] = 0;
      this.setState({hovering: hovering});

      socket.emit('FlightControl_Hover:Enable');
    } else {
      hovering[0] = 0;
      hovering[1] = 1;
      this.setState({hovering: hovering});

      socket.emit('FlightControl_Hover:Disable');
    }
  }

  /**
   * toggles the hover engine status
   *
   * @param {object} e -input change Event
   *
   * @memberOf Throttles
   */
  handleStaticHoveringToggle (e) {
    var staticHovering = this.state.staticHovering;
        // toggles the hover engine status {bool}
    if (e.currentTarget.value === 'true') {
      staticHovering[0] = 1;
      staticHovering[1] = 0;
      this.setState({staticHovering: staticHovering});

      socket.emit('FlightControl_Hover:EnableStaticHovering');
    } else {
      staticHovering[0] = 0;
      staticHovering[1] = 1;
      this.setState({staticHovering: staticHovering});

      socket.emit('FlightControl_Hover:ReleaseStaticHovering');
    }
  }

  handleHoverEngineModeToggle (hoverEngineName, e) {
    var _this = this;
    var hoverEngineMode = this.state['hoverEngineMode']; // get the hoverEngineMode array
    var hoverEngineModeSelection = this.state['hoverEngineModeSelection'];// get the hoverEngineModeSelection array

    if (e.currentTarget.value === 'true') {
      var shouldEnableHoverEngineMode = confirm('WARNING: You are about to enable hoverEngine mode.');

      if (shouldEnableHoverEngineMode) { // user confirmed action
        hoverEngineModeSelection[hoverEngineName] = 1; // set a value in the hoverEngineModeSelection array
        hoverEngineMode[hoverEngineName] = true; // set a value in the hoverEngineMode array

        _this.setState({
          hoverEngineModeSelection: hoverEngineModeSelection,
          hoverEngineMode: hoverEngineMode
        });
        socket.emit('FlightControl_Hover:EnableHEX', {hoverEngineName: hoverEngineName});
      } else { // user denied action
        hoverEngineModeSelection[hoverEngineName] = 0; // set a value in the hoverEngineModeSelection array
        hoverEngineMode[hoverEngineName] = false; // set a value in the hoverEngineMode array

        _this.setState({
          hoverEngineModeSelection: hoverEngineModeSelection,
          hoverEngineMode: hoverEngineMode
        });
        socket.emit('FlightControl_Hover:DisableHEX', {hoverEngineName: hoverEngineName});
      }
    } else {  // turn off hoverEngine mode
      hoverEngineModeSelection[hoverEngineName] = 0; // set a value in the hoverEngineModeSelection array
      hoverEngineMode[hoverEngineName] = false; // set a value in the hoverEngineMode array

      _this.setState({
        hoverEngineModeSelection: hoverEngineModeSelection,
        hoverEngineMode: hoverEngineMode
      });
      socket.emit('FlightControl_Hover:DisableHEX', {hoverEngineName: hoverEngineName});
    }
  }

  handleSetHoverEngineSpeed (hoverEngineName, e) {
    var hoverEngineSpeed = this.state.hoverEngineSpeed;
    hoverEngineSpeed[hoverEngineName] = e.currentTarget.value;

    this.setState({hoverEngineSpeed: hoverEngineSpeed});
  }

  sendSetHEXSpeed (hoverEngineName, e) {
    var hoverEngineSpeed = this.state.hoverEngineSpeed[hoverEngineName];
    socket.emit('FlightControl_Hover:SetHEXSpeed', {hoverEngineName, hoverEngineSpeed});
  }

  createHoverEngineInputLoop () {
    var hoverEngineInputs = [];
    for (var _i = 1; _i <= 8; _i++) {
      hoverEngineInputs.push(
                <div key={_i} className="col-xs-3">
                    <h4>Hover Engine: {_i}</h4>
                    <div className='form-group'>
                        <input type="radio" name={'hoverEngineMode' + _i} id={'hoverEngineModeTrue' + _i} value="true" checked={this.state['hoverEngineModeSelection'][_i]} onChange={this.handleHoverEngineModeToggle.bind(this, _i)} />

                        <label htmlFor={'hoverEngineModeTrue' + _i}>
                            on
                        </label>
                    </div>

                    <div className='form-group'>
                        <input type="radio" name={'hoverEngineMode' + _i} id={'hoverEngineModeFalse' + _i} value="false" checked={!this.state['hoverEngineModeSelection'][_i]} onChange={this.handleHoverEngineModeToggle.bind(this, _i)}/>

                        <label htmlFor={'hoverEngineModeFalse' + _i}>
                            off
                        </label>
                    </div>

                    <div className={this.state['hoverEngineModeSelection'][_i] ? '' : 'hidden'}>
                        <div className='form-group'>
                            <label htmlFor={'hoverEngineModeValue' + _i}>Set HoverEngine Speed Value</label>
                            <input type="text" name={'hoverEngineModeValue' + _i} id={'hoverEngineModeValue' + _i} onChange={this.handleSetHoverEngineSpeed.bind(this, _i)} />
                            <button className="btn btn-primary" onClick={this.sendSetHEXSpeed.bind(this, _i)}>Send</button>
                        </div>
                    </div>
                </div>
            );

      if (_i % 4 === 0) {
        hoverEngineInputs[_i] = <div key={'row' + _i} className="row"> {hoverEngineInputs[_i]} </div>;
      }
    }
    return hoverEngineInputs;
  }

  render () {
    var _this = this;

    return (
            <div className="container-fluid">
                <div className="row">{/* Commands */}

                    {/* Hover */}
                    <fieldset>
                        <legend>Hover</legend>
                        <div className='form-group'>
                            <input type="radio" name="Hover" id="HoverTrue" value="true" checked={this.state['hovering'][0]} onChange={_this.handleHoverToggle.bind(_this)} />

                            <label htmlFor="HoverTrue">
                                on
                            </label>
                        </div>

                        <div className='form-group'>
                            <input type="radio" name="Hover" id="HoverFalse" value="false" checked={this.state['hovering'][1]} onChange={_this.handleHoverToggle.bind(_this)}/>

                            <label htmlFor="HoverFalse">
                                off
                            </label>
                        </div>
                    </fieldset>

                    {/* Static Hovering */}
                    <fieldset>
                        <legend>Static Hovering</legend>
                        <div className='form-group'>
                            <input type="radio" name="StaticHovering" id="StaticHoveringTrue" value="true" checked={this.state['staticHovering'][0]} onChange={_this.handleStaticHoveringToggle.bind(_this)} />

                            <label htmlFor="StaticHoveringTrue">
                                on
                            </label>
                        </div>

                        <div className='form-group'>
                            <input type="radio" name="StaticHovering" id="StaticHoveringFalse" value="false" checked={this.state['staticHovering'][1]} onChange={_this.handleStaticHoveringToggle.bind(_this)}/>

                            <label htmlFor="StaticHoveringFalse">
                                off
                            </label>
                        </div>
                    </fieldset>

                {/* Development Mode */}
                <fieldset>
                    <legend>Hover Engine Mode</legend>
                    {_this.createHoverEngineInputLoop()}
                </fieldset>
                </div>

                <div className="row">{/* Values returned */}
                    <div className="col-sm-4">
                    {
                        this.Requested_RPM.map(function (item, index) {
                          return (
                                <div className="row" key={'brakes' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={_this.state.streamManager}
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
                                </div>
                          );
                        }, this) // bind keyword this to contained method calls
                    }
                    </div>
                    <div className="col-sm-4">
                    {
                        this.Current_RPM.map(function (item, index) {
                          return (
                                <div className="row" key={'brakes' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={_this.state.streamManager}
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
                                </div>
                          );
                        }, this) // bind keyword this to contained method calls
                    }
                    </div>
                    <div className="col-sm-4">
                    {
                        this.ASI_RPM.map(function (item, index) {
                          return (
                                <div className="row" key={'brakes' + index}>
                                    <label>{item.label}</label>
                                    <GenericParameterLabel
                                        StreamingPageManager={_this.state.streamManager}
                                        parameter={item.value} hoverEngine={item.hoverEngine}/>
                                </div>
                          );
                        }, this) // bind keyword this to contained method calls
                    }
                    </div>
                </div>
            </div>
    );
  }
}

export default Throttles;
