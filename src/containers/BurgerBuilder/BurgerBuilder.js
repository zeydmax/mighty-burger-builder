import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {addIngredient, removeIngredient, getIngredients} from '../../store/builder/actions'
import {setRedirectPath} from '../../store/auth/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export const burgerBuilder = props => {
  const [purchasable, setPurchasable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    setPurchasable(sum > 0)
  }

  const addIngredientHandler = type => {
    props.addIngredient(type)
  }

  const removeIngredientHandler = type => {
    props.removeIngredient(type)
  }

  useEffect(() => {
    if (!props.isBuilding) {
      props.getIngredients()
    } else {
      updatePurchaseState(props.ingredients)
    }
  },[])

  useEffect(() => {
    if (props.ingredients) return updatePurchaseState(props.ingredients)
  },[props.ingredients])

  const purchaseHandler = () => {
    if (props.isLoggedIn) {
      setPurchasing(true)
    } else {
      props.setRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.history.push({
      pathname: '/checkout',
    })
  }

    const disabledInfo = {
      ...props.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={purchasable}
            ordered={purchaseHandler}
            price={props.totalPrice}
            isLoggedIn={props.isLoggedIn}
          />
        </React.Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={props.ingredients}
          price={props.totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      )
    }
    if (props.loading) {
      orderSummary = <Spinner />
    }
    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    )
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    loading: state.builder.loading,
    error: state.builder.error,
    isLoggedIn: state.auth.token !== null,
    isBuilding: state.builder.building,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: type => dispatch(addIngredient(type)),
    removeIngredient: type => dispatch(removeIngredient(type)),
    getIngredients: () => dispatch(getIngredients()),
    setRedirectPath: path => dispatch(setRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios))
