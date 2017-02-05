import React, { Component } from 'react';
import './ConfirmButton.css';

class ConfirmButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      disabled: false,
      ready: false
    };
    this.mainTimeout = null;
    this.innerTimeout = null;
  }

  setMainTimeout (callback) {
    this.mainTimeout = setTimeout(callback, this.props.delay);
  }
  clearMainTimeout () {
    clearTimeout(this.mainTimeout);
  }
  setInnerTimeout (callback) {
    this.innerTimeout = setTimeout(callback, 1000);
  }
  clearInnerTimeout () {
    clearTimeout(this.innerTimeout);
  }

  confirmClick () {
    const self = this;

    if (this.state.disabled)    {
      this.clearMainTimeout();
      this.clearInnerTimeout();
      this.setState({disabled: false, ready: false});
      return;
    } else if (this.state.ready)    {
      this.props.action();
      return;
    }

    if (this.state.disabled === false)     {
      // disable button for some time
      this.setMainTimeout(function () {
        // enable button for one second
        self.setInnerTimeout(function () {
          self.setState({disabled: false, ready: false});
        });
        self.setState({disabled: false, ready: true});
      });
      this.setState({disabled: true});
    }
  }

  render () {
    let classes = this.props.className;
    if (this.state.disabled === true)     {
      classes += ' clicked-status-wait';
    } else if (this.state.ready === true)     {
      classes += ' clicked-status-ready';
    }

    return (
      <button type="button" className={classes} onClick={this.confirmClick.bind(this)} style={this.props.style}>{this.props.children}</button>
    );
  }
}

ConfirmButton.propTypes = {
  action: React.PropTypes.func.isRequired,
  delay: React.PropTypes.number.isRequired
};

export default ConfirmButton;
