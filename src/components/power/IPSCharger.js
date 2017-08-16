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
      {label: 'Voltage', value: `IPS Charger Current V`},
      {label: 'Current', value: `IPS Charger Current I`},
      {label: 'Float V SP', value: `IPS Charger Float V SP`},
      {label: 'Boost V SP', value: `IPS Charger Boost V SP`},
      {label: 'Max Current SP', value: `IPS Charger Max Current SP`},
      {label: 'Boost to Float Current SP', value: `IPS Charger Boost to Float Current SP`},
      {label: 'Float to Boost Current SP', value: `IPS Charger Float to Boost Current SP`}
    ];
  }

  componentDidMount () {
    var _this = this;
    this._isMounted = true;
  }

  componentWillUnmount () {
    this._isMounted = false;
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
          <h2>Pack {this.props.route.L}</h2>
            <div className="col-sm-6">
              <h3 className="section-title">Charge</h3>

              <button type="button" className="btn btn-success" onClick={this.IPSchargeV.bind(this, {voltage: 76})} style={{margin: 10}}>IPS to 76 V</button>
              <button type="button" className="btn btn-success" onClick={this.IPSchargeV.bind(this, {voltage: 40})} style={{margin: 10}}>IPS to 40 V</button><br />
              <button type="button" className="btn btn-success" onClick={this.IPSchargeI.bind(this, {current: 5})} style={{margin: 10}}>Current to 5</button>
              <button type="button" className="btn btn-success" onClick={this.IPSchargeI.bind(this, {current: 10})} style={{margin: 10}}>Current to 10</button><br />

                {
                  this.labels.map(function (item, index) {
                    return (
                      <div className="row" key={'labels' + index}>
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

    );
  }
}

export default Power_Overview;
