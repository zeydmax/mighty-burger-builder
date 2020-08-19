import {delay} from 'redux-saga/effects'
import {put} from 'redux-saga/effects'
import * as actions from '../auth/actions'
import { authorize } from '../../services/requests'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('userId')
  yield localStorage.removeItem('expirationDate')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
  const data = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }
  try {
    const response = yield authorize(data, action.method)
    const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000)
    const token = response.idToken
    const userId = response.localId
  
    localStorage.setItem('expirationDate', expirationDate)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    
    yield put(actions.authSuccess(response))
    yield put(actions.checkTokenTimeout(expirationDate))
  }
  catch(error) {
    yield put(actions.authFailed(error.error))
  }
}

export function* authCheckStateSaga(action) {
  const idToken = yield localStorage.getItem('token')
  if (!idToken) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else {
      const localId = yield localStorage.getItem('userId')
      yield put(actions.authSuccess({idToken, localId}))
      yield put(actions.checkTokenTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
  }
}
