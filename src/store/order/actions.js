import * as types from './actionTypes'
import {getOrders} from '../../services/requests'

export const postOrderSuccess = (id, data) => dispatch =>
  dispatch({type: types.POST_ORDER_SUCCESS, orderData: {...data, id: id.name}})
export const postOrderFail = error => dispatch => dispatch({type: types.POST_ORDER_FAILED, error})

export const postOrderStart = () => ({type: types.POST_ORDER})
export const postOrderAction = orderData => ({type: types.POST_ORDER_START, orderData})

export const postOrderInit = () => dispatch => dispatch({type: types.POST_ORDER_INIT})

export const getOrdersSuccess = data => dispatch => dispatch({type: types.GET_ORDERS_SUCCESS, orders: data})

export const getOrdersFailed = errors => dispatch => dispatch({type: types.GET_ORDERS_FAILED, errors})

export const getOrdersInit = () => ({type: types.GET_ORDERS})

export const getOrdersStart = () => ({type: types.GET_ORDERS_START})
