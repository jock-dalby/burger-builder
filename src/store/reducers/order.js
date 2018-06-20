import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.ATTEMPT_PURCHASE_BURGER:
    case actionTypes.ATTEMPT_FETCH_ORDERS:
      return updateObject( state, { loading: true });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject (action.orderDetails, { id: action.orderId });
      return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      });
    case actionTypes.PURCHASE_BURGER_FAILURE:
    case actionTypes.FETCH_ORDERS_FAILURE:
      return updateObject(state, { loading: false });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false
      });
    default:
      return state;
  }
}

export default reducer;