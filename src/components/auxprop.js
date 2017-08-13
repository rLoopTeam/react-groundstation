import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class auxprop extends Component {
  render () {
    return (
        <div>TEST</div>
    );
  }
}

export default auxprop;
