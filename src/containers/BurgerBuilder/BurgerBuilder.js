import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addIngredient, removeIngredient, getIngredients} from '../../store/builder/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = type => {
    this.props.addIngredient(type)
  }

  removeIngredientHandler = type => {
    this.props.removeIngredient(type)
  }

  componentDidMount() {
    this.props.getIngredients()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients) {
      this.updatePurchaseState(this.props.ingredients)
    }
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // const query = []
    // for (let i in this.props.ingredients) {
    //   query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    // }
    // query.push('price=' + this.state.totalPrice)
    // const queryString = query.join('&')
    this.props.history.push({
      pathname: '/checkout',
    })
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </React.Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    if (this.props.loading) {
      orderSummary = <Spinner />
    }
    // {salad: true, meat: false, ...}
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    loading: state.builder.loading,
    error: state.builder.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: type => dispatch(addIngredient(type)),
    removeIngredient: type => dispatch(removeIngredient(type)),
    getIngredients: () => dispatch(getIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
