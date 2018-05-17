import React, { Component } from 'react';
import classes from './ContactDetails.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactDetails extends Component {
  state = {
    name: null,
    email: null,
    address: {
      street: null,
      postcode: null
    },
    loading: false
  }

  orderHandler = (event) => {
    // Prevent form from submitting
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Jock Dalby',
        address: {
          street: '30 Smith Street',
          postCode: '1234',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
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

  render () {
    return (
      <div className={classes.ContactDetails}>
        <h4>Enter your contact details</h4>
        { this.state.loading ? <Spinner/> : <form>
          <input type="text" className={classes.Input} name="name" placeholder="Your name..." />
          <input type="email" className={classes.Input} name="email" placeholder="Your email..." />
          <input type="text" className={classes.Input} name="street" placeholder="Street" />
          <input type="text" className={classes.Input} name="postcode" placeholder="Postcode" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

export default ContactDetails;