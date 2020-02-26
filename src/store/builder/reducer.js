import * as types from './actionTypes'
import {updateObject} from '../../utilities'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: false,
  building: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    building: true,
  })
}
const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
    building: true,
  })
}
const getIngredients = state => updateObject(state, {loading: true})
const getIngredientsSuccess = (state, action) =>
  updateObject(state, {ingredients: action.data, loading: false, totalPrice: 4, building: false})
const getIngredientsFailed = state => updateObject(state, {loading: false, error: true})
const setBuilding = state => updateObject(state, {building: !state.building})

const builder = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INGREDIENTS:
      return getIngredients(state)
    case types.GET_INGREDIENTS_SUCCESS:
      return getIngredientsSuccess(state, action)
    case types.GET_INGREDIENTS_FAILED:
      return getIngredientsFailed(state)
    case types.ADD_INGREDIENT:
      return addIngredient(state, action)
    case types.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case types.SET_BUILDING:
      return setBuilding(state)
    default:
      return state
  }
}

export default builder
