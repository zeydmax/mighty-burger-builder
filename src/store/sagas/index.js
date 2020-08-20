import {takeEvery} from 'redux-saga/effects'

import * as authTypes from '../auth/actionTypes'
import * as builderTypes from '../builder/actionTypes'
import * as orderTypes from '../order/actionTypes'

import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth'
import { getIngredientsSaga } from './builder'
import { postOrderSaga, getOrdersSaga } from './order'

export function* watchAuth() {
  yield takeEvery(authTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(authTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(authTypes.AUTH_USER, authUserSaga)
  yield takeEvery(authTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
}

export function* watchBuilder() {
  yield takeEvery(builderTypes.GET_INGREDIENTS, getIngredientsSaga)
}

export function* watchOrder() {
  yield takeEvery(orderTypes.POST_ORDER_START, postOrderSaga)
  yield takeEvery(orderTypes.GET_ORDERS_START, getOrdersSaga)
}