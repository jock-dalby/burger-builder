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

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(attemptPurchaseBurger());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFailure = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error
  }
}

export const attemptFetchOrders = () => {
  return {
    type: actionTypes.ATTEMPT_FETCH_ORDERS
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(attemptFetchOrders());
    axios.get('/orders.json?auth=' + token)
      .then(response => {
        const orders = Object.keys(response.data).map(key => ({ id: key, ...response.data[key]}));
        dispatch(fetchOrdersSuccess(orders))
      }).catch(error => {
        dispatch(fetchOrdersFailure(error))
      })
  }
}

