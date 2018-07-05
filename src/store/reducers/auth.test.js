import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should store the token upon login', () => {
    const idToken = "abc123";
    const userId = 'jockalot';
    const result = reducer(initialState, {type: actionTypes.AUTH_SUCCESS, idToken, userId });
    expect(result).toEqual({
      token: idToken,
      userId,
      error: null,
      loading: false,
      authRedirectPath: "/",
    })
  })
})