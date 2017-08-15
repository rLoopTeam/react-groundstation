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
    } else if (Number(this.state.value) > this.props.max) {
      console.log('overmax', this.props.label, this.state.value);
      return true;
    } else if (Number(this.state.value) < this.props.min) {
      console.log('undermin', this.props.label, this.state.value);
      return true;
    }

    return false;
  }

  render () {
    let className = 'health data';
    let extraElements = [];

    if (this.isDangerous()) {
      className += ' danger-row';
    } else {
      className += ' nominal-row';
    }

    if (this.props.viewMode === 'detailed') {
      extraElements.push(<p>{this.state.value}</p>);
    }

    return (
        <div className={className}>
          <label>{this.props.label}</label>
          {extraElements.map((item, index) => {
            return item;
          })}
        </div>
    );
  }
}

export default HealthCheckDisplay;

