import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import APP_ROUTES from './routes';

import createSocket from './shared/socket';
import './App.css';

let socket = createSocket();

// Heartbeat signal
setInterval(function () {
  socket.emit('GS_Heartbeat');
}, 1000);

class App extends Component {
  render () {
    return (
      <Router key={Math.random()} history={browserHistory} routes={APP_ROUTES} />
    );
  }
}

export default App;
