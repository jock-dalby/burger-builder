import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    // local UI state
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[ key ])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true})
    } else {
      this.props.history.push('/auth')
    }
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  continuePurchaseHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {

    let disabledInfo = {};
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {

      Object.keys(this.props.ingredients).forEach(ingredient => {
        disabledInfo[ ingredient ] = this.props.ingredients[ ingredient ] <= 0;
      });

      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls ingredients={this.props.ingredients}
            addIngredient={type => this.props.onIngredientAdded(type)}
            removeIngredient={type => this.props.onIngredientRemoved(type)}
            disabledInfo={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            isAuthenticated={this.props.isAuthenticated}
            totalPrice={this.props.totalPrice}
            purchase={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = <OrderSummary ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchaseHandler={this.continuePurchaseHandler} />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
          onClicked={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient({ ingredientName })),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient({ ingredientName })),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));