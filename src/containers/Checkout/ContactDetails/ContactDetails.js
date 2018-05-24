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
        value:''
      },
      street: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value:''
      },
      postCode: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postcode'
        },
        value:''
      },
      country: {
        elementType:'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value:''
      },
      email: {
        elementType:'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value:''
      },
      deliveryMethod: {
        elementType:'select',
        elementConfig: {
          options: [
            { name: 'Fastest', value: 'fastest' },
            { name: 'Cheapest', value: 'cheapest' },
          ]
        },
        value:''
      }
    },
    loading: false
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

  onChangeHandler = (event, id) => {
    const orderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...orderForm[id] };
    updatedFormElement.value = event.target.value;
    orderForm[id] = updatedFormElement;
    this.setState({ orderForm })
  }

  render () {

    const formElements = Object.keys(this.state.orderForm).map(key => (
      <Input label={key}
        key={key}
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
          <Button btnType="Success">ORDER</Button>
        </form>}
      </div>
    );
  }
}

export default ContactDetails;