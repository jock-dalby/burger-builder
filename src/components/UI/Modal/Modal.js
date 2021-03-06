import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // Will only update when modal is shown and hidden and when spinner and orderSummary are toggled
    return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} onClicked={this.props.onClicked}/>
        <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-500vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;