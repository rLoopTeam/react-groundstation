import React, { Component } from 'react';

class GenericParameterLabel extends Component {
	constructor(props) {
		super(props)
		this.dataCallback = this.dataCallback.bind(this);
		
		this.props.StreamingPageManager.RequestParameterWithCallback(this.props.parameter, this.dataCallback);
		
		this.state = {
			stale: false,
			value: 0
		}
	}
	
	dataCallback(parameterData){
		this.setState({value: parameterData.value, stale: parameterData.stale});
	}

	render() {
	    return (
		    	<div className="Generic-Value">
				{this.state.value} {this.props.units}
				</div>
	    );
	}
}

export default GenericParameterLabel;

