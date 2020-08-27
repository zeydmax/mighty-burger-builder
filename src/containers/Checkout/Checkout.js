import React, {useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {postOrderInit} from '../../store/order/actions'

const checkout = props => {
  useEffect(() => {
    props.onOrderInit()
  },[])

  const checkoutCancelHandler = () => props.history.goBack()
  const checkoutContinueHandler = () => props.history.replace('/checkout/contact-data')

  let summary = <Redirect to="/" />
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutCancel={checkoutCancelHandler}
          onCheckoutContinue={checkoutContinueHandler}
          ingredients={props.ingredients}
        />
        <Route path={props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }
  return summary
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    purchased: state.order.purchased,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderInit: () => dispatch(postOrderInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout)
