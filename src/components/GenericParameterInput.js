import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';

class GenericParameterInput extends GenericParameterDisplay {
	/*
	* This component inherits all code from GenericParameterDisplay. Look there for implemetation details
	*/
  render () {
    return (
				<span>
					<input 	type="text"
							className="form-control"
							value={this.getFormattedValue()} readOnly={this.isReadOnly()} /><b>{this.getUnits()}</b>
				</span>
    );
  }
}

export default GenericParameterInput;

