import * as types from './actionTypes'
import {postOrder, getOrders} from '../../services/requests'

export const postOrderSuccess = (id, data) => dispatch =>
  dispatch({type: types.POST_ORDER_SUCCESS, orderData: {...data, id: id.name}})
export const postOrderFail = error => dispatch => dispatch({type: types.POST_ORDER_FAILED, error})

export const postOrderStart = orderData => dispatch => {
  dispatch({type: types.POST_ORDER})
  postOrder(orderData)
    .then(response => {
      dispatch(postOrderSuccess(response, orderData))
    })
    .catch(error => dispatch(postOrderFail(error)))
}

export const postOrderInit = () => dispatch => dispatch({type: types.POST_ORDER_INIT})

export const getOrdersSuccess = data => dispatch => dispatch({type: types.GET_ORDERS_SUCCESS, orders: data})

export const getOrdersFailed = errors => dispatch => dispatch({type: types.GET_ORDERS_FAILED, errors})

export const getOrdersStart = () => dispatch => {
  dispatch({type: types.GET_ORDERS})
  getOrders()
    .then(response => {
      const fetchedOrders = []
      for (let key in response) {
        fetchedOrders.push({...response[key], id: key})
      }
      dispatch(getOrdersSuccess(fetchedOrders))
    })
    .catch(error => dispatch(getOrdersFailed(error)))
}
