import * as types from './actionTypes'
import {updateObject} from '../../utilities'

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
}

const postOrderInit = state => updateObject(state, {purchased: false})
const postOrder = state => updateObject(state, {loading: true})
const postOrderSuccess = (state, action) =>
  updateObject(state, {loading: false, orders: [...state.orders, action.orderData], purchased: true})
const postOrderFailed = (state, action) => updateObject(state, {loading: false, error: action.error})
const getOrders = state => updateObject(state, {loading: true})
const getOrdersSuccess = (state, action) => updateObject(state, {loading: false, orders: action.orders})
const getOrdersFailed = (state, action) => updateObject(state, {loading: false, error: action.error})

const order = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_ORDER_INIT:
      return postOrderInit(state)
    case types.POST_ORDER:
      return postOrder(state)
    case types.POST_ORDER_SUCCESS:
      return postOrderSuccess(state, action)
    case types.POST_ORDER_FAILED:
      return postOrderFailed(state, action)
    case types.GET_ORDERS:
      return getOrders(state)
    case types.GET_ORDERS_SUCCESS:
      return getOrdersSuccess(state, action)
    case types.GET_ORDERS_FAILED:
      return getOrdersFailed(state, action)
    default:
      return state
  }
}

export default order
