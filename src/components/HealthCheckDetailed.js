import React, { Component } from 'react';
import { Redirect } from 'react-router';
import StreamingPageManager from '../StreamingPageManager.js';
import GenericParameterInput from './GenericParameterInput.js';
import HealthCheckDisplay from './HealthCheckDisplay.js';
import HealthCheckList from './HealthCheckList.js';
import FaultFlagDisplay from './FaultFlagDisplay.js';

import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import nominalConditions from '../../config/nominalConditions.js';
import createSocket from '../shared/socket';
import './HealthCheck.css';

let socket = createSocket();

class HealthCheckDetailed extends Component {

  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager()
    };

    this.subsystems = {
      'Power Node': [
        {'Batteries': {header: ['Parameters', 'Battery A', 'Battery B'], params: ['Average cell temperature (C)', 'Max cell temperature (C)', 'Highest cell volts', 'Lowest cell volts', 'Battery pack current', 'Battery pack voltage']}},
        {'Power Node Sensors': {header: ['Parameters', 'Node A', 'Node B'], params: ['Power Node Pressure', 'Power Node Temperature']}}
      ],
      'Navigation': [
        {'Height laser sensors': {header: ['Parameter', '1', '2', '3', '4'], params: ['Height laser sensors']}},
        {'I-Beam laser sensors': {header: ['Parameter', '5', '6'], 'params': ['I-Beam laser sensors']}},
        {'Distance laser sensor': {header: ['Parameters', '1'], 'params': ['Distance laser sensor']}},
        {'Accelerometers': {header: ['Parameters', '1', '2'], 'params': [' Accelerometer x', 'Accelerometer y', ' Accelerometerz']}}
      ],
      'Brake': [
        {'Brake': {header: ['Parameters', '1, 2'], params: ['Calibration State', 'State', 'MLP Current', 'Brake stepper temp (C)', 'Brake air gap (mm)']}}
      ],
      'Landing Gear': [
        {'Landing Gear': {header: ['Parameters', '1', '2', '3', '4'], params: ['Limit Switch Extend', 'Limit Switch Retract', 'Actuall extention']}}
      ],
      'Thermocouple': [
        {'HE temperature': {header: ['Parameter', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'], 'params': ['HE temperature']}},
        {'HE motor temperature': {header: ['Parameter', '1', '2', '3', '4'], 'params': ['HE motor temperature']}},
        {'Spare': {'header': ['Parameter', '1', '2', '3', '4', '5', '6'], 'params': ['Spare']}}
      ],
      'ASI Controller': [
        {'ASI Controller': {header: ['Parameters', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'], 'params': ['HE RPM', 'Throttle voltage', 'Motor current', 'ASI temperature']}}
      ],
      'Pusher Pin Interface': [
        {'Pusher Pin Interface': {header: ['Parameters', '1', '2'], params: ['Pusher Pin Limit Switch']}}
      ]
    };

    this.paramMapping = {
      'Batteries': ['Power A BMS Average Temp', 'Power A BMS Highest Sensor Value', 'Power A BMS Pack Volts', 'Power A BMS Highest Cell Volts', 'Power A BMS Lowest Cell Volts', 'Power A BMS Battery Current', 'Power B BMS Average Temp', 'Power B BMS Highest Sensor Value', 'Power B BMS Pack Volts', 'Power B BMS Highest Cell Volts', 'Power B BMS Lowest Cell Volts', 'Power B BMS Battery Current'],
      'Power Node Sensors': ['Power A BMS Node Pressure', 'Power B BMS Node Pressure', 'Power A BMS Node Temp', 'Power B BMS Node Temp'],
      'Height laser sensors': ['LaserOpto 1 Filtered value', 'LaserOpto 2 Filtered value', 'LaserOpto 3 Filtered value', 'LaserOpto 4 Filtered value'],
      'I-Beam laser sensors': ['LaserOpto 5 Filtered value', 'LaserOpto 6 Filtered value'],
      'Distance laser sensor': ['ForwardLaser Distance'],
      'Accelerometers': ['Accel 1 X Gs', 'Accel 2 X Gs', 'Accel 1 Y Gs', 'Accel 2 Y Gs', 'Accel 1 Z Gs', 'Accel 2 Z Gs'],
      'Brake': ['Brake Calibration State', 'Brake State', 'Brake MLP 1 Current', 'Brake MLP 2 Current', 'Limit Extend 1', 'Limit Retract 1', 'Limit Extend 2', 'Limit Retract 2'],
      'Landing Gear': ['LGU Switch Extend 1', 'LGU Switch Extend 2', 'LGU Switch Extend 3', 'LGU Switch Extend 4', 'LGU Switch Retract 1', 'LGU Switch Retract 2', 'LGU Switch Retract 3', 'LGU Switch Retract 4', 'LGU Actual Extension 1', 'LGU Actual Extension 2', 'LGU Actual Extension 3', 'LGU Actual Extension 4'],
      'HE temperature': ['HE 1 Temperature', 'HE 2 Temperature', 'HE 3Temperature', 'HE 4 Temperature', 'HE 5 Temperature', 'HE 6 Temperature', 'HE 7 Temperature', 'HE 8 Temperature', 'HE 9 Temperature', 'HE 10 Temperature', 'HE 11 Temperature', 'HE 12 Temperature'],
      'Spare': [],
      'ASI Controller': ['ASI 1 HE RPM', 'ASI 2 HE RPM', 'ASI 3 HE RPM', 'ASI 4 HE RPM', 'ASI 5 HE RPM', 'ASI 6 HE RPM', 'ASI 7 HE RPM', 'ASI 8 HE RPM', 'ASI 1 Temperature', 'ASI 2 Temperature', 'ASI 3 Temperature', 'ASI 4 Temperature', 'ASI 5 Temperature', 'ASI 6 Temperature', 'ASI 7 Temperature', 'ASI 8 Temperature', 'ASI 1 Throttle Voltage', 'ASI 2 Throttle Voltage', 'ASI 3 Throttle Voltage', 'ASI 4 Throttle Voltage', 'ASI 5 Throttle Voltage', 'ASI 6 Throttle Voltage', 'ASI 7 Throttle Voltage', 'ASI 8 Throttle Voltage', 'ASI 1 Motor Current', 'ASI 2 Motor Current', 'ASI 3 Motor Current', 'ASI 4 Motor Current', 'ASI 5 Motor Current', 'ASI 6 Motor Current', 'ASI 7 Motor Current', 'ASI 8 Motor Current'],
      'Pusher Pin Interface': ['Pusher Switch State 1', 'Pusher Switch State 2']
    };
  }

  render () {
    var healthchecksBatteryPack = this.subsystems['Power Node'][0]['Batteries'];
    var healthchecksPowerNode = this.subsystems['Power Node'][1]['Power Node Sensors'];
    var healthchecksHeight = this.subsystems['Navigation'][0]['Height laser sensors'];
    var healthchecksIbeam = this.subsystems['Navigation'][1]['I-Beam laser sensors'];
    var healthchecksDistanceLaser = this.subsystems['Navigation'][2]['Distance laser sensor'];
    var healthchecksAccel = this.subsystems['Navigation'][3]['Accelerometers'];
    var healthchecksBrake = this.subsystems['Brake'][0]['Brake'];
    var healthchecksLandingGear = this.subsystems['Landing Gear'][0]['Landing Gear'];
    var healthchecksASIController = this.subsystems['ASI Controller'][0]['ASI Controller'];
    var healthchecksHETemperature = this.subsystems['Thermocouple'][0]['HE temperature'];
    var healthchecksHEMotorTemperature = this.subsystems['Thermocouple'][1]['HE motor temperature'];
    var healthchecksSpare = this.subsystems['Thermocouple'][2]['Spare'];
    var healthchecksPusherPin = this.subsystems['Pusher Pin Interface'][0]['Pusher Pin Interface'];
    console.log('healthchecksBatteryPack', healthchecksBatteryPack);

    return (
      <div className="detailed-content">
        <legend>Detailed Pod Health </legend>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-3">
              <h4>POWER NODE</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksBatteryPack}
                parameters={this.paramMapping['Batteries']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksPowerNode}
                parameters={this.paramMapping['Power Node Sensors']}/>
            </div>
            <div className="col-lg-3">
              <h4>NAVIGATION</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksHeight}
                parameters={this.paramMapping['Height laser sensors']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksIbeam}
                parameters={this.paramMapping['I-Beam laser sensors']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksDistanceLaser}
                parameters={this.paramMapping['Distance laser sensor']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksAccel}
                parameters={this.paramMapping['Accelerometers']}/>
            </div>
            <div className="col-lg-3">
              <h4>BRAKE</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksBrake}
                parameters={this.paramMapping['Brake']}/>
            </div>

            <div className="col-lg-3">
              <h4>LANDING GEAR</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksLandingGear}
                parameters={this.paramMapping['Landing Gear']}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <h4>ASI CONTROLLER</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksASIController}
                parameters={this.paramMapping['ASI Controller']}/>
            </div>
            <div className="col-lg-3">
              <h4>THERMOCOUPLE</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksHETemperature}
                parameters={this.paramMapping['HE temperature']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksHEMotorTemperature}
                parameters={this.paramMapping['Batteries']}/>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksSpare}
                parameters={this.paramMapping['Batteries']}/>
            </div>
            <div className="col-lg-3">
              <h4>PUSHER PIN INTERFACE</h4>
              <HealthCheckList
                StreamingPageManager={this.state.streamManager}
                healthchecks={healthchecksPusherPin}
                parameters={this.paramMapping['Pusher Pin Interface']}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default HealthCheckDetailed;
