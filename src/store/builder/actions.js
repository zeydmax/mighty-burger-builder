import * as types from './actionTypes'
import {fetchIngredients} from '../../services/requests'

export const addIngredient = ingredientType => dispatch => dispatch({type: types.ADD_INGREDIENT, ingredientType})
export const removeIngredient = ingredientType => dispatch => dispatch({type: types.REMOVE_INGREDIENT, ingredientType})
export const toggleLoader = () => dispatch => dispatch({type: types.TOGGLE_LOADER})
export const getIngredients = () => dispatch => {
  dispatch(toggleLoader())
  fetchIngredients()
    .then(res => {
      if (res) {
        dispatch({type: types.GET_INGREDIENTS, data: res})
      }
    })
    .finally(() => dispatch(toggleLoader()))
}
