import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {postOrderInit} from '../../store/order/actions'

class Checkout extends Component {
  componentDidMount() {
    this.props.onOrderInit()
  }
  checkoutCancelHandler = () => this.props.history.goBack()
  checkoutContinueHandler = () => this.props.history.replace('/checkout/contact-data')

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            onCheckoutCancel={this.checkoutCancelHandler}
            onCheckoutContinue={this.checkoutContinueHandler}
            ingredients={this.props.ingredients}
          />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </div>
      )
    }
    return summary
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
