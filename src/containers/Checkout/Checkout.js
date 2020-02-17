import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  checkoutCancelHandler = () => this.props.history.goBack()
  checkoutContinueHandler = () => this.props.history.replace('/checkout/contact-data')

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients: ingredients, price: price})
  // }

  render() {
    return (
      <div>
        <CheckoutSummary
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHandler}
          ingredients={this.props.ingredients}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)
