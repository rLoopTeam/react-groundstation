import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';
import nominalConditions from '../../config/nominalConditions.js';

class HealthCheckDisplay extends GenericParameterDisplay {
  /*
  * This component inherits all code from GenericParameterDisplay. Look there for implemetation details
  */
  isDangerous () {
    if (this.state.value === '?') {
      return true;
    } else if (Number(this.state.value) > this.props.Max) {
      console.log('overmax', this.state.value);
      return true;
    } else if (Number(this.state.value) < this.props.Min) {
      console.log('undermin', this.state.value);
      return true;
    }

    return false;
  }

  render () {
    let className = 'health data';
    let extraElements = '';

    if (this.isDangerous()) {
      className += ' danger-row';
    } else {
      className += ' nominal-row';
    }
    return (
        <div className={className}>
          <label>{this.props.label}</label>
          {extraElements}
        </div>
    );
  }
}

export default HealthCheckDisplay;

