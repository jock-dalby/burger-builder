import React, { Component } from 'react';
import classes from './ContactDetails.css'
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactDetails extends Component {
  state = {
    orderForm: {
      name: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postCode: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postcode'
        },
        value:'',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType:'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType:'select',
        elementConfig: {
          options: [
            { name: 'Fastest', value: 'fastest' },
            { name: 'Cheapest', value: 'cheapest' },
          ]
        },
        value:'',
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  }

  orderHandler = (event) => {
    // Prevent form from submitting
    event.preventDefault();
    this.setState({ loading: true });

    const formDetails = {};

    Object.keys(this.state.orderForm).forEach(key => {
      formDetails[key] = this.state.orderForm[key].value;
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderDetails: formDetails
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim().length > 0 && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  onBlurHandler = (id) => {
    const orderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...orderForm[id] };
    updatedFormElement.touched = true;
    orderForm[id] = updatedFormElement;
    this.setState({ orderForm });
  }

  onChangeHandler = (event, id) => {
    const orderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...orderForm[id] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    orderForm[id] = updatedFormElement;

    // Check overall form validity
    let formIsValid = true;
    Object.keys(orderForm).forEach(key => {
      formIsValid = orderForm[key].valid && formIsValid;
    })

    this.setState({ orderForm, formIsValid });
  }

  render () {

    const formElements = Object.keys(this.state.orderForm).map(key => (
      <Input label={key}
        key={key}
        valueType={key}
        invalid={!this.state.orderForm[key].valid}
        touched={this.state.orderForm[key].touched}
        shouldValidate={this.state.orderForm[key].validation}
        onBlurHandler={() => this.onBlurHandler(key)}
        onChangeHandler={(event) => this.onChangeHandler(event, key)}
        inputtype={this.state.orderForm[key].elementType}
        elementConfig={this.state.orderForm[key].elementConfig}
        value={this.state.orderForm[key].value}
        />
    ));
    return (
      <div className={classes.ContactDetails}>
        <h4>Enter your contact details</h4>
        { this.state.loading ? <Spinner/> :
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

export default ContactDetails;