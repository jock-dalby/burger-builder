import * as actionTypes from './actionTypes';
import axios from 'axios';
import { FIREBASE_AUTH_API_KEY } from '../../keys';

export const attemptAuth = () => {
  return {
    type: actionTypes.ATTEMPT_AUTH
  };
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId
  }
}

export const authFailure = (error) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    error
  }
}

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(attemptAuth());

    // https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    const signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + FIREBASE_AUTH_API_KEY;
    const signInUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + FIREBASE_AUTH_API_KEY;

    const url = method === 'signup' ? signUpUrl : signInUrl;

    axios.post(url, authData)
      .then(response => {
        console.log('Auth success', response);
        dispatch(authSuccess(response.data))
      })
      .catch(err => {
        console.error('Auth failure', err);
        dispatch(authFailure(err));
      })
  }
}