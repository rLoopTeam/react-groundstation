import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import APP_ROUTES from './routes';
import createSocket from './shared/socket';
import './App.css';

let socket = createSocket();

// Heartbeat signal
setInterval(function () {
  socket.emit('GS_Heartbeat');
  socket.emit('Pwr_Heartbeat');
  // udp.tx.transmitPodCommand('Flight Control', 0x0400, 0x0, 0x0, 0x0, 0x0); //Heartbeat packet
}, 1000);

class App extends Component {
  render () {
    return (
      <Router key={Math.random()} history={browserHistory} routes={APP_ROUTES} />
    );
  }
}
export default App;
