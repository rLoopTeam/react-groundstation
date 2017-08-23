import React from 'react';
import PropTypes from 'prop-types';
import GenericParameterDisplay from './GenericParameterDisplay.js';
import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import './FaultFlagDisplay.css';

class FaultFlagDisplay extends GenericParameterDisplay {
  constructor (props) {
    super(props);
    this.definition = faultFlagDefinitions[this.props.parameter];
    if (!this.definition) { throw new Error('Fault flag definition not found in packetDefinitions.json: ' + this.props.parameter); }
    this.preFilledArray = Array(this.props.bits).fill(0);
    this.template = this.definition.template;
    this.smallEndian = this.definition.smallEndian;

    // map the property contained in the faulFlagDefinitions with a css class
    this.severityClassMap = {
      'warning': 'warning-row',
      'danger': 'danger-row',
      'critical': 'critical-row'
    };
  }

  /*
  * This component inherits all code from GenericParameterDisplay. Look there for implemetation details
  */
  swap32 (val) {
    return ((val & 0xFF) << 24) |
          ((val & 0xFF00) << 8) |
          ((val >> 8) & 0xFF00) |
          ((val >> 24) & 0xFF);
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (isNaN(nextState.value) && nextState.value !== '?') {
      return false;
    }

    return true;
  }

  render () {
    const self = this;

    // Get value as bits
    var _value = Number(this.state.value);
    var _IntValue = this.state.value;
    if (this.smallEndian) {
      _value = this.swap32(_value);
    }

    const value = _value.toString(2);

    var renderedFaultFlags;
    if (_IntValue > 4000000000) {
      renderedFaultFlags = (<tr className="inhibited-row"><td></td><td>Inhibited</td></tr>);
    } else if (value.indexOf('1') > -1) {
      renderedFaultFlags = this.preFilledArray.map(renderRow);
    } else if (!isNaN(_IntValue)) {
      renderedFaultFlags = (<tr className="nominal-row"><td></td><td>{_IntValue}</td></tr>);
    } else {
      renderedFaultFlags = (<tr className="noData-row"><td></td><td>No Data</td></tr>);
    }

    /*
    * Callback
    */
    function renderRow (_, i) {
      var result;
      if (self.template[i] !== undefined && self.template[i].severity) {
        const isTriggered = (value[i] === '1');
        const severityClass = (isTriggered) ? self.severityClassMap[self.template[i].severity] : '';
        if (isTriggered) {
          result = (<tr key={'fault_flag_' + i} className={severityClass}><td>{i}</td><td>{self.template[i].name}</td></tr>);
        }
      }

      return result;
    }
    return (
      <div className="fault-flag-display">
        <div className="table-responsive flag-wrapper">
          <b>{this.props.label}</b>
          <table className="table-bordered">
            <tbody>
              {renderedFaultFlags}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

FaultFlagDisplay.propTypes = {
  parameter: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

FaultFlagDisplay.defaultProps = {
  hex: 'true',
  hexType: 32,
  bits: 32
};
export default FaultFlagDisplay;

