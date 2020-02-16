import * as types from './actionTypes'

export const addIngredient = ingredientType => ({type: types.ADD_INGREDIENT, ingredientType})
export const removeIngredient = ingredientType => ({type: types.REMOVE_INGREDIENT, ingredientType})
