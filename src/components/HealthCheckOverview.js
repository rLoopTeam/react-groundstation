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
        {paramName: 'Power A BMS Average Temp', labelName: 'Battery A avg temp (C)'},
        {paramName: 'Power A BMS Highest Sensor Value', labelName: 'Battery A max cell temp (C)'},
        {paramName: 'Power A BMS Pack Volts', labelName: 'Battery A pack voltage'},
        {paramName: 'Power A BMS Highest Cell Volts', labelName: 'Battery A highest cell volts'},
        {paramName: 'Power A BMS Lowest Cell Volts', labelName: 'Battery A lowest cell volts'},
        {paramName: 'Power A BMS Battery Current', labelName: 'Battery A current'},
        {paramName: 'Power B BMS Average Temp', labelName: 'Battery B avg temp (C)'},
        {paramName: 'Power B BMS Highest Sensor Value', labelName: 'Battery B max cell temp (C)'},
        {paramName: 'Power B BMS Pack Volts', labelName: 'Battery B pack voltage'},
        {paramName: 'Power B BMS Highest Cell Volts', labelName: 'Battery B highest cell volts'},
        {paramName: 'Power B BMS Lowest Cell Volts', labelName: 'Battery B lowest cell volts'},
        {paramName: 'Power B BMS Battery Current', labelName: 'Battery B current'},
        {paramName: 'ForwardLaser Distance', labelName: 'Laser Range Finder distance'},
        {paramName: 'Brake Calibration State', labelName: ''},
        {paramName: 'Brake State', labelName: ''}
      ],
      groups: {
        'Hover engine Temp left': {
          min: 0,
          max: 80,
          params: [
            'HE 1 Temperature',
            'HE 2 Temperature',
            'HE 3 Temperature',
            'HE 4 Temperature',
            'HE 5 Temperature',
            'HE 6 Temperature'
          ]
        },
        'Hover engine temp right': {
          min: 0,
          max: 80,
          params: [
            'HE 7 Temperature',
            'HE 8 Temperature',
            'HE 9 Temperature',
            'HE 10 Temperature',
            'HE 11 Temperature',
            'HE 12 Temperature'
          ]
        },
        'Hover engine RPMs Left': {
          min: 0,
          max: 3000,
          params: [
            'ASI 1 HE RPM',
            'ASI 2 HE RPM',
            'ASI 3 HE RPM',
            'ASI 4 HE RPM'
          ]
        },
        'Hover engine RPMs Right': {
          min: 0,
          max: 3000,
          params: [
            'ASI 5 HE RPM',
            'ASI 6 HE RPM',
            'ASI 7 HE RPM',
            'ASI 8 HE RPM'
          ]
        },
        'Node pressure (A/B) (atm)': {
          min: 0.7,
          max: 1.1,
          params: [
            'Power A BMS Node Pressure',
            'Power B BMS Node Pressure'
          ]
        },
        'Node temp (A/B) (C)': {
          min: 0,
          max: 40,
          params: [
            'Power A BMS Node Temp',
            'Power B BMS Node Temp'
          ]
        },
        'Controller temperature (C)': {
          min: 0,
          max: 50,
          params: [
            'ASI 1 Temperature',
            'ASI 2 Temperature',
            'ASI 3 Temperature',
            'ASI 4 Temperature',
            'ASI 5 Temperature',
            'ASI 6 Temperature',
            'ASI 7 Temperature',
            'ASI 8 Temperature'
          ]
        },
        'Controller Voltages (V)': {
          min: 0,
          max: 72,
          params: [
            'ASI 1 Throttle Voltage',
            'ASI 2 Throttle Voltage',
            'ASI 3 Throttle Voltage',
            'ASI 4 Throttle Voltage',
            'ASI 5 Throttle Voltage',
            'ASI 6 Throttle Voltage',
            'ASI 7 Throttle Voltage',
            'ASI 8 Throttle Voltage'
          ]
        },
        'Controller Currents (A)': {
          min: 0,
          max: 70,
          params: [
            'ASI 1 Motor Current',
            'ASI 2 Motor Current',
            'ASI 3 Motor Current',
            'ASI 4 Motor Current',
            'ASI 5 Motor Current',
            'ASI 6 Motor Current',
            'ASI 7 Motor Current',
            'ASI 8 Motor Current'
          ]
        },
        'Accel 1/2 X Gs': {
          min: -3,
          max: 3,
          params: [
            'Accel 1 X Gs',
            'Accel 2 X Gs'
          ]
        },
        'Accel 1/2 Y Gs': {
          min: -3,
          max: 3,
          params: [
            'Accel 1 Y Gs',
            'Accel 2 Y Gs'
          ]
        },
        'Accel 1/2 Z Gs': {
          min: -3,
          max: 3,
          params: [
            'Accel 1 Z Gs',
            'Accel 2 Z Gs'
          ]
        },
        'optoNCDT Height Filtered Distance': {
          min: 6,
          max: 20,
          params: [
            'LaserOpto 1 Filtered value',
            'LaserOpto 2 Filtered value',
            'LaserOpto 3 Filtered value',
            'LaserOpto 4 Filtered value'
          ]
        },
        'optoNCDT I-Beam Filtered Distance': {
          min: 20,
          max: 30,
          params: [
            'LaserOpto 5 Filtered value',
            'LaserOpto 6 Filtered value'
          ]
        },
        'Pusher Switch 1/2 State': {
          min: 0,
          max: 1,
          params: [
            'Pusher Switch State 1',
            'Pusher Switch State 2'
          ]
        },
        'Brake 1/2 MLP Current': {
          min: 0,
          max: 75,
          params: [
            'Brake MLP 1 Current',
            'Brake MLP 2 Current'
          ]
        },
        'Brake 1/2 Limit Switches': {
          min: 1,
          max: 2,
          params: [
            'Brake SW Error 1',
            'Brake SW Error 2'
          ]
        },
        'LGU Limit Switches': {
          min: 1,
          max: 2,
          params: [
            'LGU Switch Extend 1',
            'LGU Switch Extend 2',
            'LGU Switch Extend 3',
            'LGU Switch Extend 4',
            'LGU Switch Retract 1',
            'LGU Switch Retract 2',
            'LGU Switch Retract 3',
            'LGU Switch Retract 4'
          ]
        },
        'LGU Computed Height': {
          min: 5,
          max: 17,
          params: [
            'LGU Actual Extension 1',
            'LGU Actual Extension 2',
            'LGU Actual Extension 3',
            'LGU Actual Extension 4'
          ]
        },
        'Brake stepper temp (C)': {
          min: 5,
          max: 75,
          params: [
            ''
          ]
        },
        'Brake air gap (mm)': {
          min: 2.5,
          max: 25,
          params: [
            ''
          ]
        }
      }
    };
    this.watchParams = [];

    for (let param of this.overviewParameters.nominals) {
      console.log(param.paramName, this.lookupNominal(param.paramName));
      this.watchParams.push({
        label: param.labelName === '' ? param.paramName : param.labelName,
        min: this.lookupNominal(param.paramName).min,
        max: this.lookupNominal(param.paramName).max,
        params: [param.paramName],
        group: false
      });
    }

    for (let groupName in this.overviewParameters.groups) {
      this.watchParams.push({
        label: groupName,
        min: this.overviewParameters.groups[groupName].min,
        max: this.overviewParameters.groups[groupName].max,
        params: this.overviewParameters.groups[groupName].params,
        group: true
      });
    }
  }

  lookupNominal (param) {
    for (let nominalPrefix in nominalConditions) {
      if (nominalPrefix === param) {
        return nominalConditions[nominalPrefix];
      }
    }
  }

  render () {
    let viewMode = this.props.route.viewMode || 'overview';
    let topcount = 0;

    if (viewMode === 'overview')
      {
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
                <div className="col-xs-2 faultbox" key={'healthfault' + index}>
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
    else {
      return (
        <div className="detailed-content">
        <legend>Pod Health</legend>
        <div className="col-md-12">
          {this.watchParams.map(function (item, index) {
            if (item.group)
            {
              return (
                item.params.map((iitem, iindex) => {
                  return (
                    <div className="health d-inline-block" key={'health' + (topcount++ + iindex)}>
                      <HealthCheckDisplay
                        StreamingPageManager={this.state.streamManager}
                        parameters={[iitem]}
                        label={iitem}
                        max={item.max}
                        min={item.min}
                        hideUnits='false'
                        viewMode='detailed'
                      />
                    </div>
                  );
                })
              );
            }
            else
            {
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
            }
          }, this)}
        </div>
        </div>
      );
    }
  }
}
export default HealthCheckOverview;
