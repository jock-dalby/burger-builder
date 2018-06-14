import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.orderData,
            id: action.orderId
          }
        ],
        loading: false
      }
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}