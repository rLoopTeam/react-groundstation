import React, {Component} from 'react';

class NumericInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		}
	}
	render() {
		return (
			<span>
				<label>{this.props.label}</label>
				<input 	type="number" 
						className="form-control"
						value={this.state.value}
						onChange={this.props.onChange}
						onBlur={this.props.onBlur} />
			</span>
		);
	}
} 

export default NumericInput;

