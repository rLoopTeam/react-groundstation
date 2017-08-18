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
  }

  setMainTimeout (callback) {
    this.mainTimeout = setTimeout(callback, this.props.delay);
  }

  clearMainTimeout () {
    clearTimeout(this.mainTimeout);
  }

  confirmClick () {
    const self = this;

    // Clear timeout before doing any actions that set timeouts.
    this.clearMainTimeout();

    if (this.state.disabled) {
      this.setState({disabled: false, ready: false});
      return;
    } else if (this.state.ready) {
      this.props.action();
      this.setState({disabled: false, ready: false});
      return;
    }

    if (this.state.disabled === false) {
      // Enable button for some time.
      this.setState({disabled: false, ready: true});

      this.setMainTimeout(function () {
        self.setState({disabled: false, ready: false});
      });
    }
  }

  render () {
    let classes = this.props.className;
    if (this.state.disabled === true) {
      classes += ' clicked-status-wait';
    } else if (this.state.ready === true) {
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
