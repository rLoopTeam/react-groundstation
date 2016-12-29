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

	handlePositionChange(e, index) {
        var _index = e;
        var e = index;
        var liftName = e.currentTarget.name;
        var liftDirection = e.currentTarget.value;
        var _lift = this.set.lift[_index][liftName].direction[liftDirection] = true;

        if(liftDirection === 'up')
        {
            this.set.lift[_index][liftName][direction][up] = true;
            this.set.lift[_index][liftName][direction][down] = false;
        }
        else
        {
            this.set.lift[_index][liftName][direction][up] = false;
            this.set.lift[_index][liftName][direction][down] = true;
        }
        
		socket.emit('lgu:positionChange', {liftName: liftName, liftDirection: liftDirection})
	}

	render() {
        var _this = this;
	    return (
		    	<div className="Overview-content">
                    {
                        this.set.lift.map(function(item, index){
                        var itemName = Object.keys(item),
                            direction = Object.keys(item[itemName].direction),
                            upKey = direction[0],
                            upVal = item[itemName].direction.up,
                            downKey = direction[1],
                            downVal = item[itemName].direction.down;

                                    return (<form key={index}>
                                        <fieldset>
                                            <legend>{itemName}</legend>
                                            <div className="form-group">
                                                <input type="radio" id={itemName + '-' + upKey} name={itemName} onChange={_this.handlePositionChange.bind(_this, index)} checked={upVal ? 'checked' : ''} value={upKey} />
                                                <label htmlFor={itemName + '-' + upKey}>{upKey}</label>
                                                <br />
                                                <input type="radio" id={itemName + '-' + downKey} name={itemName} onChange={_this.handlePositionChange.bind(_this, index)} checked={downVal ? 'checked' : ''} value={downKey} />
                                                <label htmlFor={itemName + '-' + downKey}>{downKey}</label>
                                            </div>
                                        </fieldset>
                                    </form>);
                    })}
				</div>
	    );
	}
}

export default LGU;

