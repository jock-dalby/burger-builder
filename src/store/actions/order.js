import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderDetails) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderDetails
  }
}

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error
  }
}

export const attemptPurchaseBurger = () => {
  return {
    type: actionTypes.ATTEMPT_PURCHASE_BURGER
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(attemptPurchaseBurger());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
      });
  }
}