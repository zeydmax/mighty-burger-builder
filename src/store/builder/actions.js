import * as types from './actionTypes'
import {fetchIngredients} from '../../services/requests'

export const addIngredient = ingredientType => dispatch => dispatch({type: types.ADD_INGREDIENT, ingredientType})
export const removeIngredient = ingredientType => dispatch => dispatch({type: types.REMOVE_INGREDIENT, ingredientType})

export const getIngredients = () => dispatch => {
  dispatch({type: types.GET_INGREDIENTS})
  fetchIngredients()
    .then(res => {
      if (res) {
        dispatch({type: types.GET_INGREDIENTS_SUCCESS, data: res})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_INGREDIENTS_FAILED})
    })
}

export const setBuilding = () => ({type: types.SET_BUILDING})
