import * as types from './actionTypes'

export const authStart = () => ({type: types.AUTH_START})
export const authSuccess = authData => ({type: types.AUTH_SUCCESS, authData})
export const authFailed = error => ({type: types.AUTH_FAILED, error})
export const logout = () => {
  return {type: types.AUTH_INITIATE_LOGOUT}
}
export const logoutSucceed = () => ({
  type: types.AUTH_LOGOUT,
})
export const checkTokenTimeout = expirationTime => ({
  type: types.AUTH_CHECK_TIMEOUT,
  expirationTime,
})
export const auth = (email, password, method) => ({
  type: types.AUTH_USER,
  email,
  password,
  method
})

export const setRedirectPath = path => ({type: types.SET_AUTH_REDIRECT_PATH, path})

export const authCheckState = () => ({type: types.AUTH_CHECK_INITIAL_STATE})
