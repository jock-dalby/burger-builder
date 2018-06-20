import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const initialState = {
  ingredients: null,
  totalPrice: 5.5,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedAddIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient)
      const updatedAddIngredientState = {
        ingredients: updatedAddIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, updatedAddIngredientState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedRemoveIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient)
      const updatedRemoveIngredientState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, updatedRemoveIngredientState);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
          ingredients: action.ingredients,
          error: false,
          totalPrice: 5.5
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
}

export default reducer;