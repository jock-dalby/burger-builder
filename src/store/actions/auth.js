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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        // Todays date + expiry time and converting ms to sec
        const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('tokenExpirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        const errorMessage = err.response.data.error.message;
        // axios wraps the original response in an error object
        dispatch(authFailure(errorMessage));
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout());
    } else {
      const tokenExpirationDate = new Date(localStorage.getItem('tokenExpirationDate'));
      if (tokenExpirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({idToken: token, localId: userId}));
        const secondsRemaining = (tokenExpirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(secondsRemaining));
      } else {
        dispatch(logout())
      }
    }
  }
}