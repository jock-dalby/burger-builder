import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      bacon: 1,
      meat: 2
    },
    totalPrice: 4
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
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    let updatedPrice = this.state.totalPrice;
    if (updatedIngredients[type] !== 0) {
      updatedIngredients[type] = updatedIngredients[type] - 1;
      this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice
      })
    }
  }

  render () {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;