import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseInit = (state) => {
  return updateObject(state, { purchased: false });
}

const setLoadingToTrue = (state) => {
  return updateObject( state, { loading: true });
}

const setLoadingToFalse = (state) => {
  return updateObject( state, { loading: false });
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject (action.orderDetails, { id: action.orderId });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  });
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.ATTEMPT_PURCHASE_BURGER:
    case actionTypes.ATTEMPT_FETCH_ORDERS:
      return setLoadingToTrue(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILURE:
    case actionTypes.FETCH_ORDERS_FAILURE:
      return setLoadingToFalse(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    default:
      return state;
  }
}

export default reducer;