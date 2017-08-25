import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import createSocket from './shared/socket';

import './index.css';

let socket = createSocket();

// Heartbeat signal
setInterval(function () {
  socket.emit('Heartbeat:GS');
  socket.emit('Heartbeat:Power');
}, 1000);

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
