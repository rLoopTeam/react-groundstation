import React, { Component } from 'react';

class EnumStatusDisplay extends GenericParameterDisplay {
  /*
  * This component inherits all code from GenericParameterDisplay. Look there for implemetation details
  */
  render () {
    let value = this.props.enumMap[this.state.value];
    let color = 'black';
    if (this.state.stale) {
      value = 'STALE';
      color = 'red';
    }
    if (this.props.colorMap && !this.state.stale) {
      color = this.props.colorMap[this.state.value] || 'black';
    }
    return (
      <div className='form-group row' style={this.props.style}>
        <label className='col-sm-6' style={{fontWeight: 600}}>
        {this.props.name}
        </label>
        <div className='col-sm-6'>
          <div className='Generic-Value'>
            <span style={{color: color}}>{value}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default EnumStatusDisplay;
