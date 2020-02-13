import React, {Component} from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 2,
      cheese: 0,
      meat: 1,
      salad: 2,
    },
  }
  checkoutCancelHandler = () => this.props.history.goBack()
  checkoutContinueHandler = () => this.props.history.replace('/checkout-contact-data')

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    this.setState({ingredients: ingredients})
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
          ingredients={this.state.ingredients}
        />
      </div>
    )
  }
}

export default Checkout
