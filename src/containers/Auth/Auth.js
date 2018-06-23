import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
    }
  }

  onChangeHandler = (a, b) => {

  }
  render() {
    const formElements = Object.keys(this.state.controls).map(key => (
      <Input label={key}
        key={key}
        valueType={key}
        invalid={!this.state.controls[key].valid}
        touched={this.state.controls[key].touched}
        shouldValidate={this.state.controls[key].validation}
        onChangeHandler={(event) => this.onChangeHandler(event, key)}
        inputtype={this.state.controls[key].elementType}
        elementConfig={this.state.controls[key].elementConfig}
        value={this.state.controls[key].value}
        />
    ));
    return (
      <div>
        <form>
          {formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;