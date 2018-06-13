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
import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    // local UI state
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map(key => ingredients[ key ])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  addIngredientHandler = (type) => {
    this.props.addIngredientHandler(type)
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[ type ] = updatedIngredients[ type ] + 1;
    // const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[ type ];
    // this.setState({
    //   ingredients: updatedIngredients,
    //   totalPrice: updatedPrice
    // })
    // this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    // if (this.state.ingredients[ type ] <= 0) {
    //   return
    // }
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[ type ] = updatedIngredients[ type ] - 1;
    // const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[ type ];
    // this.setState({
    //   ingredients: updatedIngredients,
    //   totalPrice: updatedPrice
    // })
    // this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  continuePurchaseHandler = () => {
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

    // if (this.props.loading) {
    //   orderSummary = <Spinner />;
    // };

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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient({ ingredientName })),
    onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient({ ingredientName })),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));