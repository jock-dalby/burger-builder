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
  }

  render () {

    let disabledInfo = {};

    Object.keys(this.state.ingredients).forEach(ingredient => {
      disabledInfo[ingredient] = this.state.ingredients[ingredient] <= 0;
    });

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;