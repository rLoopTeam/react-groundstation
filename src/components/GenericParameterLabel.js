import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';

class GenericParameterLabel extends GenericParameterDisplay {
	/*
	* This component inherits all code from GenericParameterDisplay. Look there for implemetation details
	*/
	render() {
		return (
			<div className="Generic-Value">
				{this.getFormattedValue()} <b>{this.getUnits()}</b>
			</div>
		);
	}
} 

export default GenericParameterLabel;

