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
      summary = (
        <div>
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
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);