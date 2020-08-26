import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {mainReducer} from './store/reducers'
import thunk from 'redux-thunk'
import createSageMiddleware from 'redux-saga'
import {createStore, compose, applyMiddleware} from 'redux'
import {watchAuth, watchBuilder, watchOrder} from './store/sagas/'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const sagaMiddleware = createSageMiddleware()

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBuilder)
sagaMiddleware.run(watchOrder)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
