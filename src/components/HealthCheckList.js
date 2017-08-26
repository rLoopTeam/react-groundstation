import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';
import nominalConditions from '../../config/nominalConditions.js';

import HealthCheckListRow from './HealthCheckListRow';
import HealthCheckHeaderRow from './HealthCheckHeaderRow';

class HealthCheckList extends GenericParameterDisplay {
  constructor (props) {
    super(props);

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

    this.threshold = {
      'HE temperature': {min: 0, max: 80},
      'ASI Controller__RPM': {min: 0, max: 3000},
      'Power Node Sensors__Pressure': {min: 0.7, max: 1.1},
      'Power Node Sensors__Temperature': {min: 0, max: 40},
      'ASI Controller__Temperature': {min: 0, max: 50},
      'ASI Controller__Throttle Voltage': {min: 0, max: 72},
      'ASI Controller__Motor Current': {min: 0, max: 70},
      'Accelerometers': {min: -3, max: 3},
      'Height laser sensors': {min: 6, max: 20},
      'I-Beam laser sensors': {min: 20, max: 30},
      'Pusher Pin Interface': {min: 0, max: 1},
      'Brake__MLP Current': {min: 0, max: 75},
      'Brake__Limit Switches': {min: 1, max: 2},
      'Brake__Air Gap': {min: 2.5, max: 25},
      'Brake__Stepper Temp': {min: 5, max: 75},
      'Landing Gear__Limit Switch': {min: 1, max: 2},
      'Landing Gear__Actual Extention': {min: 5, max: 17}
    };
    this.dataCallback = this.dataCallback.bind(this);

    this.state = {
      counter: 0
    };
    this.packetValues = {};

    for (let parameter of this.props.parameters) {
      this.packetValues[parameter] = 0;
    }
  }

  componentDidMount () {
    this._isMounted = true;
    for (let parameter of this.props.parameters) {
      this.props.StreamingPageManager.RequestParameterWithCallback(
        parameter,
        this.dataCallback
      );
    }
  }

  componentWillUnmount () {
    this._isMounted = false;
    this.props.StreamingPageManager.destroy();
  }

  dataCallback (parameterData) {
    if (this._isMounted) {
      // Do nothing if the states are equal.
      if (
        parameterData.Value === this.packetValues[parameterData.Name] ||
        Number(parameterData.Value).toFixed(2) ===
          this.packetValues[parameterData.Name]
      ) {
        return;
      }

      if (isNaN(parameterData.Value)) {
        this.packetValues[parameterData.Name] = parameterData.Value;
      } else {
        this.packetValues[parameterData.Name] = Number(
          parameterData.Value
        ).toFixed(2);
      }

      this.setState({ counter: this.state.counter + 1 });
    }
  }

  isDangerous () {
    for (let valueIndex in this.packetValues) {
      let value = this.packetValues[valueIndex];
      if (value === '?') {
        return true;
      } else if (Number(value) > this.props.max) {
        console.debug('overmax', this.props.label, value);
        return true;
      } else if (Number(value) < this.props.min) {
        console.debug('undermin', this.props.label, value);
        return true;
      }
    }

    return false;
  }

  render () {
    console.log('this.props', this.props);

    let className = 'health data';
    let detailedElements = [];

    if (this.isDangerous()) {
      className += ' danger-row';
    } else {
      className += ' nominal-row';
    }

    var packetName;
    for (let pn in this.packetValues) {
      packetName = pn;
    }

    console.log('SEE', this.packetValues[packetName]);
    let healthchecks = this.props.healthchecks;
    let value = this.packetValues[packetName];
    return (
      <table className="table">
        <thead>
          {healthchecks['header'].map(hc =>
            <HealthCheckHeaderRow key={hc} hc={hc}/>
          )}
        </thead>
        <tbody>
          {healthchecks['params'].map(hc =>
            <HealthCheckListRow key={hc} hc={hc} value={value}/>
          )}
        </tbody>
      </table>
    );
  }
}

export default HealthCheckList;

// return (
//       <div className={className}>
//         <label>{this.props.label}</label>
//         <p key='packetDetail'>{this.packetValues[packetName]}</p>
//       </div>
//     );
