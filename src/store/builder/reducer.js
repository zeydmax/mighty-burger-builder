import * as types from './actionTypes'
import {updateObject} from '../../utilities'

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
  loading: false,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const builder = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INGREDIENTS: {
      return updateObject(state, {ingredients: action.data})
    }
    case types.ADD_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
      })
    case types.REMOVE_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
      })
    case types.TOGGLE_LOADER:
      return updateObject(state, {loading: !state.loading})
    default:
      return state
  }
}

export default builder
