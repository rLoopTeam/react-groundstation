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

class HealthCheckOverview extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.overviewParameters = {
      nominals: [
        'Power A BMS Average Temp',
        'Power A BMS Highest Sensor Value',
        'Power A BMS Pack Volts',
        'Power A BMS Highest Cell Volts',
        'Power A BMS Lowest Cell Volts',
        'Power A BMS Pack Current',
        'Power A BMS Node Pressure',
        'Power A BMS Node Temp',
        'Power B BMS Average Temp',
        'Power B BMS Highest Sensor Value',
        'Power B BMS Pack Volts',
        'Power B BMS Highest Cell Volts',
        'Power B BMS Lowest Cell Volts',
        'Power B BMS Pack Current',
        'ForwardLaser Distance'
      ],
      groups: {
        'Accel X Gs': {
          min: 0,
          max: 3,
          params: [
            'Accel 1 X Gs',
            'Accel 2 X Gs'
          ]
        },
        'Accel Y Gs': {
          min: 0,
          max: 3,
          params: [
            'Accel 1 Y Gs',
            'Accel 2 Y Gs'
          ]
        },
        'Accel Z Gs': {
          min: 0,
          max: 3,
          params: [
            'Accel 1 Y Gs',
            'Accel 2 Y Gs'
          ]
        },
        'HE Temps Left': {
          min: 0,
          max: 80,
          params: [
            'ASI 1 Temperature',
            'ASI 2 Temperature',
            'ASI 3 Temperature',
            'ASI 4 Temperature'
          ]
        },
        'HE Temps Right': {
          min: 0,
          max: 80,
          params: [
            'ASI 5 Temperature',
            'ASI 6 Temperature',
            'ASI 7 Temperature',
            'ASI 8 Temperature'
          ]
        },
        'HE RPMs Left': {
          min: 0,
          max: 3000,
          params: [
            'ASI 1 HE RPM',
            'ASI 2 HE RPM',
            'ASI 3 HE RPM',
            'ASI 4 HE RPM'
          ]
        },
        'HE RPMs Right': {
          min: 0,
          max: 3000,
          params: [
            'ASI 5 HE RPM',
            'ASI 6 HE RPM',
            'ASI 7 HE RPM',
            'ASI 8 HE RPM'
          ]
        }
      }
    };
    this.watchParams = [];

    for (let paramName of this.overviewParameters.nominals) {
      console.log(paramName, this.lookupNominal(paramName));
      this.watchParams.push({
        label: paramName,
        min: this.lookupNominal(paramName).min,
        max: this.lookupNominal(paramName).max,
        params: [paramName]
      });
    }

    for (let groupName in this.overviewParameters.groups) {
      this.watchParams.push({
        label: groupName,
        min: this.overviewParameters.groups[groupName].min,
        max: this.overviewParameters.groups[groupName].max,
        params: this.overviewParameters.groups[groupName].params
      });
    }
  }

  lookupNominal (param) {
    for (let nominalPrefix in nominalConditions) {
      for (let nominalParam in nominalConditions[nominalPrefix]) {
        if (nominalPrefix + ' ' + nominalParam === param) {
          return nominalConditions[nominalPrefix][nominalParam];
        }
      }
    }
  }

  render () {
    let viewMode = this.props.route.viewMode || 'overview';

    return (
        <div className="Overview-content">
        <legend>Pod Health</legend>
        <div className="col-md-12">
          {this.watchParams.map(function (item, index) {
            return (
              <div className="health d-inline-block" key={'health' + index}>
                <HealthCheckDisplay
                      StreamingPageManager={this.state.streamManager}
                      parameters={item.params}
                      label={item.label}
                      max={item.max}
                      min={item.min}
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
              <form className="form-inline col-xs-12 col-md-4" key={'healthfault' + index}>
                <div className="form-group">
                  <label htmlFor="a0_y">{item.label}</label>
                  <div className="health">
                  <FaultFlagDisplay StreamingPageManager={this.state.streamManager} label={item} parameter={item} />
                  </div>
                </div>
              </form>
          );
        }, this)}
        </div>
      </div>
    );
  }
}
export default HealthCheckOverview;
