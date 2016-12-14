import React, { Component } from 'react';

class MainLayout extends Component {
	render() {
	    return (
	      <div className="App">
	        <div className="App-header">
	          <h2>Groundstation</h2>
	        </div>
	        {this.props.children}
	      </div>
	    );
	}
}

export default MainLayout;

