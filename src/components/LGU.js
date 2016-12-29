import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class LGU extends Component {
	constructor(props) {
		super(props)
        this.set = {
            lift: [
                {
                    fwd1: {
                        direction: {
                            up: true, down: false
                        },
                        speed: {
                            low: 0, high: 10000, tick: 1
                        }
                    }
                },
                {
                    fwd2: {
                        direction: {
                            up: true, down: false
                        },
                        speed: {
                            low: 0, high: 10000, tick: 1
                        }
                    }
                },
                {
                    aft1: {
                        direction: {
                            up: true, down: false
                        },
                        speed: {
                            low: 0, high: 10000, tick: 1
                        }
                    }
                },
                {
                    aft2: {
                        direction: {
                            up: true, down: false
                        },
                        speed: {
                            low: 0, high: 10000, tick: 1
                        }
                    }
                }
            ]
        }
	}

	componentDidMount() {
        var _this = this;
	}

	updatestreamingControl(e) {
		socket.emit('power:streamingControl', {status: e.target.value})
	}

	render() {

	    return (
		    	<div className="Overview-content">
                    {this.set.lift.map(function(item, index){

                            
                                    return (<form key={index}>
                                        <fieldset>
                                            <legend>{Object.keys(item)}</legend>
                                            <div className="form-group">
                                                <input type="radio" id={Object.keys(item) + '-' + Object.keys(item[Object.keys(item)].direction)[0]} name={Object.keys(item)} value={item[Object.keys(item)].direction.up} />
                                                <label htmlFor={Object.keys(item) + '-' + Object.keys(item[Object.keys(item)].direction)[0]}>{Object.keys(item[Object.keys(item)].direction)[0]}</label>
                                                <br />
                                                <input type="radio" id={Object.keys(item) + '-' + Object.keys(item[Object.keys(item)].direction)[1]} name={Object.keys(item)} value={item[Object.keys(item)].direction.down} />
                                                <label htmlFor={Object.keys(item) + '-' + Object.keys(item[Object.keys(item)].direction)[1]}>{Object.keys(item[Object.keys(item)].direction)[1]}</label>
                                            </div>
                                        </fieldset>
                                    </form>);
                    })}
				</div>
	    );
	}
}

export default LGU;

