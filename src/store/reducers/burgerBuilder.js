import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const initialState = {
  ingredients: null,
  totalPrice: 5.5,
  error: false,
  // If the user is in process of building a burger.
  // Used as a flag so if the user builds and then is redirected
  // to login page, we know to redirect them to '/checkout/ after
  // auth instead of '/'
  isBuilding: false
}

const addIngredient = (state, action) => {
  const updatedAddIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient)
  const updatedAddIngredientState = {
    ingredients: updatedAddIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    isBuilding: true
  }
  return updateObject(state, updatedAddIngredientState);
}

const removeIngredient = (state, action) => {
  const updatedRemoveIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient)
  const updatedRemoveIngredientState = {
    ingredients: updatedRemoveIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    isBuilding: true
  }
  return updateObject(state, updatedRemoveIngredientState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 5.5,
    isBuilding: false
  });
}

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
}

export default reducer;