import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ClickActionButton extends PureComponent {
  /**
   * A button class that has a on click handler to pass back its props.
   */
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    this.props.action(this.props);
  }

  render () {
    let classes = this.props.className;

    return (
      <button type="button" className={classes} onClick={this.onClick} style={this.props.style} disabled={this.props.disabled}>{this.props.children}</button>
    );
  }
}

ClickActionButton.propTypes = {
  action: PropTypes.func.isRequired
};

export default ClickActionButton;
