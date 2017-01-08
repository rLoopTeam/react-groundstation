import React from 'react';
import GenericParameterDisplay from '../../GenericParameterDisplay.js';

class BatteryParameterLabel extends GenericParameterDisplay {
	/*
	* This component inherits all code from GenericParameterDisplay. Look there for implemetation details
	*/
	updatedValue(){
		var values = this.getFormattedValue();

		for(var index in values)
		{
			return
		}
	}

	render() {
		return (
			<div className="Generic-Value">
				{this.updatedValue()} <b>{this.getUnits()}</b>
			</div>
		);
	}
} 

export default BatteryParameterLabel;

