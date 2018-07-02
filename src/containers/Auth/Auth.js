import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true,
  }

  componentDidMount() {
    // If we have reached the auth login page and redirect path is still set
    // to checkout, but we are not building a burger, then reset authRedirectPath
    // back to '/'
    if (!this.props.isBuilding && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  onChangeHandler = (event, controlName) => {
    const controls = updateObject(
      this.state.controls,
      {
        [controlName]: updateObject(
          this.state.controls[controlName],
          {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
          }
        )
      }
    );
    this.setState({ controls });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp ? 'signup' : 'signIn'
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    })
  }

  render() {
    const formElements = Object.keys(this.state.controls).map(key => (
      <Input label={key}
        key={key}
        valueType={key}
        invalid={!this.state.controls[ key ].valid}
        touched={this.state.controls[ key ].touched}
        shouldValidate={this.state.controls[ key ].validation}
        onChangeHandler={(event) => this.onChangeHandler(event, key)}
        inputtype={this.state.controls[ key ].elementType}
        elementConfig={this.state.controls[ key ].elementConfig}
        value={this.state.controls[ key ].value}
      />
    ));

    const errorMessage = this.props.error
      ? (<p className={classes.Error}>{this.props.error}</p>)
      : null;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>;
    }

    return (
      <div className={classes.Auth}>
        <p>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</p>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {this.props.loading ? <Spinner /> : formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
          <Button clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);