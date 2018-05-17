import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === 'totalPrice') {
        totalPrice = param[1]
      } else {
        const ingredientName = param[0];
        const ingredientAmount = +param[1];
        ingredients[ingredientName] = ingredientAmount;
      }
    };
    this.setState({ingredients, totalPrice});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-details');
  }

  render() {

    return(
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
          onCheckoutContinued={this.checkoutContinuedHandler}
          onCheckoutCancelled={this.checkoutCancelledHandler}/>
          <Route path={this.props.match.path + '/contact-details'}
            render={() => (
              <ContactDetails ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                {...this.props}
                />)}/>
      </div>
    )
  }
}

export default Checkout;