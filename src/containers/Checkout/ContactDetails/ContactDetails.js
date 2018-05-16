import React, { Component } from 'react';
import classes from './ContactDetails.css'
import Button from '../../../components/UI/Button/Button';

class ContactDetails extends Component {
  state = {
    name: null,
    email: null,
    address: {
      street: null,
      postcode: null
    }
  }

  render () {
    return (
      <div className={classes.ContactDetails}>
        <h4>Enter your contact details</h4>
        <form>
          <input type="text" className={classes.Input} name="name" placeholder="Your name..." />
          <input type="email" className={classes.Input} name="email" placeholder="Your email..." />
          <input type="text" className={classes.Input} name="street" placeholder="Street" />
          <input type="text" className={classes.Input} name="postcode" placeholder="Postcode" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactDetails;