import * as types from './actionTypes'
import {authorize} from '../../services/requests'

export const authStart = () => ({type: types.AUTH_START})
export const authSuccess = authData => ({type: types.AUTH_SUCCESS, authData})
export const authFailed = error => ({type: types.AUTH_FAILED, error})
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {type: types.AUTH_LOGOUT}
}
export const checkTokenTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout())
  }, expirationTime * 1000)
}
export const auth = (email, password, method) => dispatch => {
  dispatch(authStart())
  const data = {
    email,
    password,
    returnSecureToken: true,
  }
  authorize(data, method)
    .then(response => {
      localStorage.setItem('token', response.idToken)
      localStorage.setItem('userId', response.localId)
      localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.expiresIn * 1000))
      dispatch(checkTokenTimeout(response.expiresIn))
      dispatch(authSuccess(response))
    })
    .catch(error => {
      dispatch(authFailed(error.error))
    })
}

export const setRedirectPath = path => ({type: types.SET_AUTH_REDIRECT_PATH, path})

export const authCheckState = () => dispatch => {
  const idToken = localStorage.getItem('token')
  if (!idToken) {
    dispatch(logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      dispatch(logout())
    } else {
      const localId = localStorage.getItem('userId')
      dispatch(authSuccess({idToken, localId}))
      dispatch(checkTokenTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}
