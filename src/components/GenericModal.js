import React, { Component } from 'react';
import './GenericModal.css';

class GenericModal extends Component {
  render () {
    const display = {'display': ((this.props.visibility) ? 'block' : 'none')};
    return (
      <div className="modal" style={display}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeHandler}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeHandler}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GenericModal;

