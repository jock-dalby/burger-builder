import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = payload => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: payload.ingredientName
  }
}

export const removeIngredient = payload => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: payload.ingredientName
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  // dispatch is available here because of redux-thunk (added in index.js)
  return dispatch => {
    axios.get('https://burger-builder-73216.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  }
}