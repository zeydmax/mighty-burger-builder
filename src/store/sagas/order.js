import {put, select} from 'redux-saga/effects'
import * as actions from '../order/actions'
import { postOrder, getOrders } from '../../services/requests'
import { setBuilding } from '../builder/actions'

const tokenSelector = state => state.auth.token
const userIdSelector = state => state.auth.userId

export function* postOrderSaga(action) {
    yield put(actions.postOrderStart())
    const token = yield select(tokenSelector)
    try {
        const response = yield postOrder(action.orderData, token)
        yield put(setBuilding())
        yield put(actions.postOrderSuccess(response, action.orderData))
    }
    catch(error) {
        yield put(actions.postOrderFail(error))
    }
}

export function* getOrdersSaga(action) {
    yield put(actions.getOrdersInit())
    const token = yield select(tokenSelector)
    const userId = yield select(userIdSelector)
    try {
        const response = yield getOrders(token, userId)
        const fetchedOrders = []
        for (let key in response) {
            fetchedOrders.push({...response[key], id: key})
        }
        yield put(actions.getOrdersSuccess(fetchedOrders))
    }
    catch(error) {
        yield put(actions.getOrdersFailed(error))
    }
}