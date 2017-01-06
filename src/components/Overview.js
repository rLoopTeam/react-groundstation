import React, { Component } from 'react';
import io from 'socket.io-client';
var socket;

class Overview extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
	}

	componentWillUnmount(){

    }


	render() {

	    return (
			<div>remove elements. need the correct UI to go here -></div>
		);
	}
}

export default Overview;

