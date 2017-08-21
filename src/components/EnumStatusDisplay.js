import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';

class EnumStatusDisplay extends GenericParameterDisplay {
  /*
  * This component inherits all code from GenericParameterDisplay. Look there for implemetation details
  */
  render () {
    let color = 'black';
    let value;
    let extraInfo;

    if (isNaN(this.state.value)) {
      value = this.props.enumMap[this.state.value];
    } else {
      value = this.props.enumMap[Number(this.state.value)];
    }

    if (typeof value === 'undefined') {
      extraInfo = 'Unknown Enum Value - ';
    } else if (this.state.stale) {
      extraInfo = 'Stale - ';
      color = 'red';
    } else if (this.props.colorMap) {
      color = this.props.colorMap[this.state.value] || 'black';
    }

    return (
      <div className='form-group row' style={this.props.style}>
        <div className='col-sm-6'>
          <div className='Generic-Value'>
            <b>{extraInfo}</b>
            <span style={{color: color}}>{value}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default EnumStatusDisplay;
