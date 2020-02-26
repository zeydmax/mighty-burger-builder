import * as types from './actionTypes'
import {updateObject} from '../../utilities'

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: '/',
}

const authStart = state => updateObject(state, {loading: true, error: null})
const authSuccess = (state, action) =>
  updateObject(state, {loading: false, token: action.authData.idToken, userId: action.authData.localId, error: null})
const authFailed = (state, action) => updateObject(state, {loading: false, error: action.error})
const authLogout = state => updateObject(state, {token: null, userId: null})
const setAuthRedirectPath = (state, action) => updateObject(state, {authRedirectPath: action.path})

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state)
    case types.AUTH_SUCCESS:
      return authSuccess(state, action)
    case types.AUTH_FAILED:
      return authFailed(state, action)
    case types.AUTH_LOGOUT:
      return authLogout(state)
    case types.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
    default:
      return state
  }
}

export default auth
