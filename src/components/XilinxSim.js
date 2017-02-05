import React, { Component } from 'react';
import io from 'socket.io-client';
let socket = io();

class XilinxSim extends Component {
  constructor (props) {
    super(props);
    this.state = {
      command: 'XilinxSim'
    };
  }

  componentDidMount () {
    var _this = this;

    socket.on('server event', function (data) {
          console.log(data);
          socket.emit('client event', { socket: 'io connected' });
      });
  }

  startRun (e) {
    e.preventDefault();
    socket.emit('XilinxSim:StartRun');
  }
  stopRun (e) {
    e.preventDefault();
    socket.emit('XilinxSim:StopRun');
  }
  Laser0_On (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser0_On');
  }
  Laser0_Off (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser0_Off');
  }
  Laser1_On (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser1_On');
  }
  Laser1_Off (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser1_Off');
  }
  Laser2_On (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser2_On');
  }
  Laser2_Off (e) {
    e.preventDefault();
    socket.emit('XilinxSim:Laser2_Off');
  }

  render () {
      return (
        <div>
          <div className="Overview-content">
            <legend>FPGA Run Control</legend>
            <button className="btn btn-success" onClick={this.startRun.bind(this)}>Start Run</button>
            <button className="btn btn-danger" onClick={this.stopRun.bind(this)}>Stop Run</button>
          </div>

          <br></br>
          <br></br>

          <div className="Manual Signal Control-content">
            <legend>Manual Laser Control</legend>
            <button className="btn btn-success" onClick={this.Laser0_On.bind(this)}>Laser0 On</button>
            <button className="btn btn-danger" onClick={this.Laser0_Off.bind(this)}>Laser0 Off</button>
            <br></br>
            <button className="btn btn-success" onClick={this.Laser1_On.bind(this)}>Laser1 On</button>
            <button className="btn btn-danger" onClick={this.Laser1_Off.bind(this)}>Laser1 Off</button>
            <br></br>
            <button className="btn btn-success" onClick={this.Laser2_On.bind(this)}>Laser2 On</button>
            <button className="btn btn-danger" onClick={this.Laser2_Off.bind(this)}>Laser2 Off</button>
          </div>
        </div>
      );
  }
}

export default XilinxSim;

