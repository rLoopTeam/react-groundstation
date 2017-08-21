import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';

class EnumStatusDisplay extends GenericParameterDisplay {
  /*
  * This component inherits all code from GenericParameterDisplay. Look there for implemetation details
  */
  render () {
    let color = 'inherit';
    let value;
    let extraInfo;

    if (isNaN(this.state.value)) {
      value = this.props.enumMap[this.state.value];
    } else {
      value = this.props.enumMap[Number(this.state.value)];
    }

    if (typeof value === 'undefined') {
      extraInfo = 'Unknown Enum Value - ';
      value = this.state.value;
    } else if (this.state.stale) {
      color = 'red';
    } else if (this.props.colorMap) {
      color = this.props.colorMap[this.state.value] || 'inherit';
    }

    if (this.props.inline) {
      return <span style={{color: color}}><b>{extraInfo}</b>{value}</span>;
    } else {
      return (
        <div className='Generic-Value'>
          <b>{extraInfo}</b>
          <span style={{color: color}}>{value}</span>
        </div>
      );
    }
  }
}

export default EnumStatusDisplay;
