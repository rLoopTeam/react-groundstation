import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class LGU extends Component {
  constructor (props) {
    super(props);

    this.interlockDirection = false;
    this.interlockSpeed = false;

    this.state = {
      lift: [
        {
          fwd1: {
            direction: {
              up: false, down: true
            },
            speed: {
              low: 0, high: 10000, value: 0
            }
          }
        },
        {
          fwd2: {
            direction: {
              up: false, down: true
            },
            speed: {
              low: 0, high: 10000, value: 0
            }
          }
        },
        {
          aft1: {
            direction: {
              up: false, down: true
            },
            speed: {
              low: 0, high: 10000, value: 0
            }
          }
        },
        {
          aft2: {
            direction: {
              up: false, down: true
            },
            speed: {
              low: 0, high: 10000, value: 0
            }
          }
        }
      ]
    };
  }

  componentDidMount () {
    var _this = this;
  }

  handleInterlockDirection (e) {
    if (this.interlockDirection) { this.interlockDirection = false; } else { this.interlockDirection = true; }
  }

  handleInterlockSpeed (e) {
    if (this.interlockSpeed) { this.interlockSpeed = false; } else { this.interlockSpeed = true; }
  }

  handleSpeedChange (e, index) {
    var _index = e;// not quite sure what's happening here
    var _e = index;// not quite sure what's happening here

        // set name of lift and value returned to variables
    var liftName = _e.currentTarget.name;
    var liftSpeed = _e.currentTarget.value;
    var liftArr = this.state.lift;

        // assign object to variable
    var _speed = liftArr[_index][liftName].speed;

        // set value on object item
    var val = _speed.value = liftSpeed;

    // set the value for all speed inputs to match the others
    if (this.interlockSpeed) {
      for (var _ind in liftArr) {
        if (_ind) { // eslint prefers to have for in body wrapped in if statement
          var lifts = liftArr[_ind];
          for (var lift in lifts) {
            if (lift) { // eslint prefers to have for in body wrapped in if statement
              var _liftName = Object.keys(lifts)[0];

              _speed = lifts[lift].speed.value = liftSpeed;

                            // send name of LGU and new value set
              socket.emit('lgu:speedChange', {liftName: _liftName, liftSpeed: liftSpeed});
            }
          }
        }
      }
    } else {
            // send name of LGU and new value set
      socket.emit('lgu:speedChange', {liftName: liftName, liftSpeed: liftSpeed});
    }

        // set state
    this.setState({_speed: _speed});
  }

  handlePositionChange (e, index) {
    var _index = e;// not quite sure what's happening here
    var _e = index;// not quite sure what's happening here

        // set name of lift and value returned to variables
    var liftName = _e.currentTarget.name;
    var liftDirection = _e.currentTarget.value;

        // assign object to variable
    var _direction = this.state.lift[_index][liftName].direction;
    var liftArr = this.state.lift;

    // set value on object items
    var upVal = _direction.up = false;
    var downVal = _direction.down = true;

    // set values if position is up
    if (liftDirection === 'up') {
      upVal = _direction.up = true;
      downVal = _direction.down = false;
    }

        // set the value for all speed inputs to match the others
    if (this.interlockDirection) {
      for (var _ind in liftArr) {
        if (_ind)// eslint prefers to have for in body wrapped in if statement
        {
          var lifts = liftArr[_ind];
          for (var lift in lifts) {
            if (lift)// eslint prefers to have for in body wrapped in if statement
            {
              var _liftName = Object.keys(lifts)[0];

              _direction = lifts[lift].direction;

                // set value on object items
              upVal = _direction.up = false;
              downVal = _direction.down = true;

                // set values if position is up
              if (liftDirection === 'up') {
                upVal = _direction.up = true;
                downVal = _direction.down = false;
              }

                // send name of LGU and new values to server
              socket.emit('lgu:positionChange', {liftName: _liftName, liftDirection: liftDirection});
            }
          }
        }
      }
    } else {
      // send name of LGU and new values to server
      socket.emit('lgu:positionChange', {liftName: liftName, liftDirection: liftDirection});
    }

        // set state object
    this.setState({_direction: _direction});
  }

  render () {
    var _this = this;
    return (
          <div className="Overview-content">
          <fieldset>
          <legend>
            Interlock controls
          </legend>
          <div className="form-group">
            <input type="checkbox" name="interlockDirection" id="interlockDirection" onChange={_this.handleInterlockDirection.bind(_this)} value={_this.interlockDirection} />

            <label htmlFor="interlockDirection">
              &nbsp; Interlock Direction
            </label>
          </div>
          <div className="form-group">
            <input type="checkbox" name="interlockSpeed" id="interlockSpeed" onChange={_this.handleInterlockSpeed.bind(_this)} value={_this.interlockSpeed} />

            <label htmlFor="interlockSpeed">
              &nbsp; Interlock Speed
            </label>
          </div>
        </fieldset>

                    {
                        this.state.lift.map(function (item, index) {
                          var itemName = Object.keys(item),
                            speedkey = Object.keys(item[itemName])[1],
                            speedLow = item[itemName].speed.low,
                            speedHigh = item[itemName].speed.high,
                            speedVal = item[itemName].speed.value,
                            directionkey = Object.keys(item[itemName])[0],
                            direction = Object.keys(item[itemName].direction),
                            upKey = direction[0],
                            upVal = item[itemName].direction.up,
                            downKey = direction[1],
                            downVal = item[itemName].direction.down;

                          return (<form key={index}>
                                        <fieldset>
                                            <legend>
                                              {itemName}
                                            </legend>

                                            <div className="form-group">
                                                <label htmlFor={itemName + '-' + speedkey}>{speedkey}
                                            </label>

                      <span>
                        &nbsp; {parseFloat(((speedVal / speedHigh) * 100).toString()).toFixed(4)}%
                      </span>
                                                <input type="range" name={itemName} id={itemName + '-' + speedkey} onChange={_this.handleSpeedChange.bind(_this, index)} value={speedVal} min={speedLow} max={speedHigh} />
                                                <div className="row">
                                                  <div className="col-xs-5">
                                                    0%
                                                  </div>
                                                  <div className="col-xs-2 text-center">
                                                    50%
                                                  </div>
                                                  <div className="col-xs-5 text-right">
                                                    100%
                                                  </div>
                        </div>
                                            </div>

                                            <div className="form-group">
                                                <label>{directionkey}</label>
                                                <br />
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

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js

// WEBPACK FOOTER //
// ./src/components/LGU.js
