import builder from './builder/reducer'
import order from './order/reducer'
import {combineReducers} from 'redux'

export const mainReducer = combineReducers({
  builder,
  order,
})
