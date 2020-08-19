import * as types from './actionTypes'

export const addIngredient = ingredientType => dispatch => dispatch({type: types.ADD_INGREDIENT, ingredientType})
export const removeIngredient = ingredientType => dispatch => dispatch({type: types.REMOVE_INGREDIENT, ingredientType})

export const getIngredients = () => ({type: types.GET_INGREDIENTS})
export const getIngredientsInit = () => ({type: types.GET_INGREDIENTS_INIT})
export const getIngredientsSuccess = (data) => ({type: types.GET_INGREDIENTS_SUCCESS, data})
export const getIngredientsFailed = () => ({type: types.GET_INGREDIENTS_FAILED})

export const setBuilding = () => ({type: types.SET_BUILDING})
