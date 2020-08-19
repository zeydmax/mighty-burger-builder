import {takeEvery} from 'redux-saga/effects'

import * as authTypes from '../auth/actionTypes'
import * as builderTypes from '../builder/actionTypes'
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth'
import { getIngredientsSaga } from './builder'

export function* watchAuth() {
  yield takeEvery(authTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(authTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(authTypes.AUTH_USER, authUserSaga)
  yield takeEvery(authTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
}

export function* watchBuilder() {
  yield takeEvery(builderTypes.GET_INGREDIENTS, getIngredientsSaga)
}