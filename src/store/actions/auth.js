import * as actionTypes from './actionTypes';

export const attemptAuth = () => {
  return {
    type: actionTypes.ATTEMPT_AUTH
  };
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(attemptAuth());
  }
}