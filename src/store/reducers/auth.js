import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState ={
  token: null,
  userId: null,
  error: null,
  loading: false
}

const attemptAuth = (state, action) => {
  return updateObject(
    state,
    {error: null, loading: true}
  );
};

const authSuccess = (state, action) => {
  return updateObject(state,
    {
      idToken: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
    }
  )
};

const authFailure = (state, action) => {
  return updateObject(state,
    {
      error: action.error,
      loading: false
    }
  )
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ATTEMPT_AUTH:
      return attemptAuth(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
      return authFailure(state, action);
    default:
      return state;
  }
}

export default reducer;