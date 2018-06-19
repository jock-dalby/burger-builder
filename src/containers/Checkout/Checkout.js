import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import { connect } from 'react-redux';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-details');
  }

  render() {
    let summary = <Redirect to="/"/>
    if(this.props.ingredients) {
      // By setting ternary and redering as first element, if condition is true, page will redirect and rest
      // of content below purchasedRedirect will never be shown. Essentially saying, when purchase is successful,
      // puchased will be set to true, and when that happens, redirect the page.
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          { purchasedRedirect }
          <CheckoutSummary ingredients={this.props.ingredients}
            onCheckoutContinued={this.checkoutContinuedHandler}
            onCheckoutCancelled={this.checkoutCancelledHandler}/>
          <Route path={this.props.match.path + '/contact-details'}
            component={ContactDetails}/>
        </div>)
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);