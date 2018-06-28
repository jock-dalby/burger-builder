import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends Component {

  componentDidMount() {
    // Dispatches logout method when component initialises
    this.props.onLogout();
  }

  render () {
    // Redirects when component renders
    return <Redirect to="/"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);