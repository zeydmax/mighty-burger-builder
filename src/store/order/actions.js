import * as types from './actionTypes'
import {postOrder} from '../../services/requests'

export const postOrderSuccess = (id, data) => dispatch => {
  console.log(data)
  dispatch({type: types.POST_ORDER_SUCCESS, orderData: {...data, id}})
}
export const postOrderFail = error => dispatch => dispatch({type: types.POST_ORDER_FAILED, error})

export const postOrderStart = orderData => dispatch => {
  dispatch({type: types.POST_ORDER})
  postOrder(orderData)
    .then(response => {
      console.log(response)
      dispatch(postOrderSuccess(response, orderData))
    })
    .catch(error => dispatch(postOrderFail(error)))
}

export const postOrderInit = () => dispatch => dispatch({type: types.POST_ORDER_INIT})
