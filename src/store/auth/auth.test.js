import auth from './reducer'
import * as types from './actionTypes'

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/',
    })
  })

  it('should store token on login', () => {
    expect(
      auth(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: '/',
        },
        {
          type: types.AUTH_SUCCESS,
          authData: {
            idToken: 'some-token',
            localId: 'some-id',
          },
        },
      ),
    ).toEqual({
      token: 'some-token',
      userId: 'some-id',
      loading: false,
      error: null,
      authRedirectPath: '/',
    })
  })
})
