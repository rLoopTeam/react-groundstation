import React, { Component } from 'react';
import createSocket from '../shared/socket';

let socket = createSocket();

class Stop extends Component {
  constructor (props) {
    super(props);
    this.streamingControl = [
      {
        selected: true, value: false, title: 'Off'
      },
      {
        selected: false, value: true, title: 'On'
      }
    ];
  }

  componentDidMount () {
    var _this = this;
  }

  stopPod (e) {
    e.preventDefault();
    socket.emit('stop:Pod');
  }

  podPower (e) {
    e.preventDefault();
    var _enterPodSafe = confirm('Are you sure you would like to enter pod safe mode? This could be CATASTROPHIC...');
    if (_enterPodSafe) { socket.emit('PodSafe'); }
  }

  powerLatch (value, e) {
    e.preventDefault();
    var _value = value;

    if (value === 0) { socket.emit('PowerA:LatchRelay', {}); }
    if (value === 1) { socket.emit('PowerB:LatchRelay', {}); }
  }

  render () {
    return (
          <div className="col-xs-5 pull-right">
          <div className="col-sm-2 pull-right">
            <button className="btn btn-danger" onClick={this.stopPod.bind(this)}>STOP</button>
          </div>
          <div className="col-sm-3 pull-right">
            <button className="btn btn-warning" onClick={this.podPower.bind(this)}>Pod Safe</button>
          </div>
          <div className="col-sm-3 pull-right">
            <button className="btn btn-warning" onClick={this.powerLatch.bind(this, 1)}>Latch B</button>
          </div>
          <div className="col-sm-3 pull-right">
            <button className="btn btn-warning" onClick={this.powerLatch.bind(this, 0)}>Latch A</button>
          </div>
        </div>
    );
  }
}

export default Stop;

