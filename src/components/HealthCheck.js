import React, { Component } from 'react';
import { Redirect } from 'react-router';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import HealthCheckDisplay from './HealthCheckDisplay.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import nominalConditions from '../../config/nominalConditions.js';
import createSocket from '../shared/socket';
import './HealthCheck.css';

let socket = createSocket();

class HealthCheck extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.watchParams = [];
    this.watchFaults = [];

    for (let prefix in nominalConditions) {
      for (let param in nominalConditions[prefix]) {
        if (nominalConditions[prefix][param].Fault) {
          this.watchFaults.push(prefix + ' ' + param);
          continue;
        } else {
          this.watchParams.push({
            fullParam: prefix + ' ' + param,
            max: nominalConditions[prefix][param].max,
            min: nominalConditions[prefix][param].min
          });
        }
      }
    }

    // Best attempt to fit in http://confluence.rloop.org/display/KIR/Ground+Station%3A+Pod+Health+Check
    this.placeholderParams = [
      // Power
      {label: 'Power A Highest Cell Temp', param: 'TODO:PLACEHOLDER'},
      {label: 'Power B Highest Cell Temp', param: 'TODO:PLACEHOLDER'},
      {label: 'Power A Voltage Range', param: 'TODO:PLACEHOLDER'},
      {label: 'Power B Voltage Range', param: 'TODO:PLACEHOLDER'},

      // HEs
      {label: 'Hover Engine Temperature', param: 'ASI Temperature'},
      {label: 'Hover Engine RPM', param: 'ASI HE RPM'},

      // PV packets are vague

      // ASI
      {label: 'ASI 1 Temperature', param: 'ASI 1 Temperature'},
      {label: 'ASI 2 Temperature', param: 'ASI 2 Temperature'},
      {label: 'ASI 3 Temperature', param: 'ASI 3 Temperature'},
      {label: 'ASI 4 Temperature', param: 'ASI 4 Temperature'},
      {label: 'ASI 5 Temperature', param: 'ASI 5 Temperature'},
      {label: 'ASI 6 Temperature', param: 'ASI 6 Temperature'},
      {label: 'ASI 7 Temperature', param: 'ASI 7 Temperature'},
      {label: 'ASI 8 Temperature', param: 'ASI 8 Temperature'},
      // ASI Voltage not in packets or code.
      {label: 'ASI 1 Motor Current', param: 'ASI 1 Motor Current'},
      {label: 'ASI 2 Motor Current', param: 'ASI 2 Motor Current'},
      {label: 'ASI 3 Motor Current', param: 'ASI 3 Motor Current'},
      {label: 'ASI 4 Motor Current', param: 'ASI 4 Motor Current'},
      {label: 'ASI 5 Motor Current', param: 'ASI 5 Motor Current'},
      {label: 'ASI 6 Motor Current', param: 'ASI 6 Motor Current'},
      {label: 'ASI 7 Motor Current', param: 'ASI 7 Motor Current'},
      {label: 'ASI 8 Motor Current', param: 'ASI 8 Motor Current'},
      // Throttles (it's all fault flags)

      // LGU
      // MLP Flag / MLP Value not in?
      {label: 'LGU Switch Extend 1', param: 'LGU Switch Extend 1'},
      {label: 'LGU Switch Extend 2', param: 'LGU Switch Extend 2'},
      {label: 'LGU Switch Retract 1', param: 'LGU Switch Retract 1'},
      {label: 'LGU Switch Retract 2', param: 'LGU Switch Retract 2'},

      // Brakes
      {label: 'Brake Calibration State', param: 'Brake Calibration State'},
      {label: 'Brake State', param: 'Brake State'},
      // Brake Limit Switches State?
      {label: 'Brake MLP 1', param: 'Brake MLP 1'},
      {label: 'Brake MLP 2', param: 'Brake MLP 2'},
      // Brake Stepper Temperature soon to come

      // Pusher
      {label: 'Pusher Status', param: 'Pusher Status'}
    ];
  }
  render () {
    let viewMode = this.props.route.viewMode || 'overview';

    return (
        <div className="Overview-content">
        <legend>Pod Health</legend>
        <div className="col-md-12">
          {this.watchParams.map(function (item, index) {
            return (
              <div className="health d-inline-block" key={'health_param' + index}>
                <HealthCheckDisplay
                      StreamingPageManager={this.state.streamManager}
                      parameters={[item.fullParam]}
                      label={item.fullParam}
                      max={item.max}
                      min={item.min}
                      hideUnits='true'
                      viewMode={viewMode}
                  />
              </div>
            );
          }, this)}
          {this.placeholderParams.map(function (item, index) {
            return (
              <div className="health d-inline-block" key={'health_placeholder' + index}>
                <HealthCheckDisplay
                      StreamingPageManager={this.state.streamManager}
                      parameters={[item.param]}
                      label={item.label}
                      max={0}
                      min={0}
                      hideUnits='true'
                      viewMode={viewMode}
                  />
              </div>
            );
          }, this)}
        </div>

        <legend>All Fault Flags</legend>
        <div className="col-md-12">
        {Object.keys(faultFlagDefinitions).map(function (item, index) {
          return (
              <div className="d-inline-block" key={'healthfault' + index}>
                <label htmlFor="a0_y">{item.label}</label>
                <div className="health">
                  <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label={item} parameter={item} />
                </div>
              </div>
          );
        }, this)}
        </div>
      </div>
    );
  }
}
export default HealthCheck;
