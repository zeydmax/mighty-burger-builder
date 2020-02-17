import * as types from './actionTypes'
import {updateObject} from '../../utilities'

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_ORDER_INIT:
      return updateObject(state, {purchased: false})
    case types.POST_ORDER:
      return updateObject(state, {loading: true})
    case types.POST_ORDER_SUCCESS:
      return updateObject(state, {loading: false, orders: [...state.orders, action.orderData], purchased: true})
    case types.POST_ORDER_FAILED:
      return updateObject(state, {loading: false, error: action.error})
    case types.GET_ORDERS:
      return updateObject(state, {loading: true})
    case types.GET_ORDERS_SUCCESS:
      return updateObject(state, {loading: false, orders: action.orders})
    case types.GET_ORDERS_FAILED:
      return updateObject(state, {loading: false, error: action.error})
    default:
      return state
  }
}

export default order
