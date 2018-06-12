import * as actionTypes from './actionTypes';

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