import builder from './builder/reducer'
import order from './order/reducer'
import auth from './auth/reducer'
import {combineReducers} from 'redux'

export const mainReducer = combineReducers({
  builder,
  order,
  auth,
})
