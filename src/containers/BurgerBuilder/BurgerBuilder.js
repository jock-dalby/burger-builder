import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 5.5,
    purchaseable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
                  .map(key => ingredients[key])
                  .reduce((sum, el) => {
                    return sum + el;
                  }, 0);
    this.setState({
      purchaseable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedIngredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedIngredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngredients);
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
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      .then(res => console.log(res))
      .catch(err => console.log('error', err));
  }

  render () {

    let disabledInfo = {};

    Object.keys(this.state.ingredients).forEach(ingredient => {
      disabledInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
    });

    return (
      <Aux>
        <Modal show={this.state.purchasing}
          onClicked={this.cancelPurchaseHandler}>
          <OrderSummary ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchaseHandler={this.continuePurchaseHandler}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          purchaseable={this.state.purchaseable}
          totalPrice={this.state.totalPrice}
          purchase={this.purchaseHandler}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;