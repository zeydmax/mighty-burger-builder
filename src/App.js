import React, {useEffect, Suspense} from 'react'
import {Route, withRouter, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import {authCheckState} from './store/auth/actions'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const app = props => {
  useEffect(() => {
    props.onAuthCheckState()
  },[])

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )
  if (props.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app))
