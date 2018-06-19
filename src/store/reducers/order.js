import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ATTEMPT_PURCHASE_BURGER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.orderDetails,
            id: action.orderId
          }
        ],
        loading: false,
        purchased: true
      }
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        loading: false
      }
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    default:
      return state;
  }
}

export default reducer;