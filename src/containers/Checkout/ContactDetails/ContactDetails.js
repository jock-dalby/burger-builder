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

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
          {this.state.orderForm.map(element => (
            <Input elementType elementConfig value/>
          ))}
          <Input inputtype="input" type="text" name="name" placeholder="Your name..." />
          <Input inputtype="input" type="email" name="email" placeholder="Your email..." />
          <Input inputtype="input" type="text" name="street" placeholder="Street" />
          <Input inputtype="input" type="text" name="postcode" placeholder="Postcode" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>}
      </div>
    );
  }
}

export default ContactDetails;