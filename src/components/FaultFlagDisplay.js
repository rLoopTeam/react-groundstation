import React from 'react';
import GenericParameterDisplay from './GenericParameterDisplay.js';
import faultFlagDefinitions from '../../config/faultFlagDefinitions.js';
import './FaultFlagDisplay.css';

class FaultFlagDisplay extends GenericParameterDisplay {
	constructor(props){
		super(props)
		this.definition = faultFlagDefinitions[this.props.parameter]
		if (!this.definition)
			throw new Error("Fault flag definition not found in packetDefinitions.js")

		this.preFilledArray = Array(this.props.bits).fill(0);
		this.template = this.definition.template;

		// map the property contained in the faulFlagDefinitions with a css class
		this.severityClassMap = {
			"warning":"warning-row",
			"danger":"danger-row",
			"critical":"critical-row"
		}
	}

	/*
	* This component inherits all code from GenericParameterDisplay. Look there for implemetation details
	*/
	render() {
		const self = this;
		const value = this.state.value.toString(2);
		const renderedFaultFlags = this.preFilledArray.map(renderRow);
		function renderRow(_, i) {
			var result;
			if (self.template[i] != undefined && self.template[i].severity) {
				const isTriggered = (value[i] == 1) ? true : false;			
				const severityClass = (isTriggered) ? self.severityClassMap[self.template[i].severity] : "";
				if (isTriggered) {
					result = (<tr key={"fault_flag_" + i} className={severityClass}><td>{i}</td><td>{value[i]},{self.template[i].name}</td></tr>);
				}
			}

			return result;
		}

		return (
			<div className="fault-flag-display">
				<div className="table-responsive flag-wrapper"> 
					<table className="table-bordered">
						<thead>
							<tr>
						   		<th></th>
						   		<th>{this.props.label}</th>
						 	</tr>
						</thead>
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
	parameter: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired
};

FaultFlagDisplay.defaultProps = {
  	hex: 'true',
  	hexType: 32,
	bits: 32
};
export default FaultFlagDisplay;

