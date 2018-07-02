import React, { Component } from 'react';
import classes from './ContactDetails.css'
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactDetails extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { name: 'Fastest', value: 'fastest' },
            { name: 'Cheapest', value: 'cheapest' },
          ]
        },
        validation: {},
        value: 'fastest',
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    // Prevent form from submitting
    event.preventDefault();

    const formDetails = {};

    Object.keys(this.state.orderForm).forEach(key => {
      formDetails[key] = this.state.orderForm[key].value;
    })

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderDetails: formDetails,
      userId: this.props.userId
    }

    this.props.onPurchaseBurger(orderData, this.props.token);
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
    const updatedFormElement = updateObject(
      this.state.orderForm[id],
      {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
        touched: true
      }
    )

    const orderForm = updateObject(
      this.state.orderForm,
      { [id]: updatedFormElement}
    )

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
        { this.props.loading ? <Spinner/> :
        <form onSubmit={this.orderHandler}>
          {formElements}
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetails, axios));