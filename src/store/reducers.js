import ingredients from './ingredients/reducer'
import {createStore, combineReducers} from 'redux'

const mainReducer = combineReducers({
  ingredients,
})

const store = createStore(mainReducer)

export default store
