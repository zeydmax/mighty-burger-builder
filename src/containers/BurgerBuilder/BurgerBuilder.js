import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as builderActions from '../../store/builder/actions'
import * as authActions from '../../store/auth/actions'
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

  const {ingredients, error, loading, totalPrice, isBuilding} = useSelector(state => state.builder)
  const isLoggedIn = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()

  const addIngredient = type => dispatch(builderActions.addIngredient(type))
  const removeIngredient = type => dispatch(builderActions.removeIngredient(type))
  const getIngredients = useCallback(() => dispatch(builderActions.getIngredients()), [dispatch])
  const setRedirectPath = path => dispatch(authActions.setRedirectPath(path))

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
    addIngredient(type)
  }

  const removeIngredientHandler = type => {
    removeIngredient(type)
  }

  useEffect(() => {
    if (!isBuilding) {
      getIngredients()
    } else {
      updatePurchaseState(ingredients)
    }
  },[getIngredients])

  useEffect(() => {
    if (ingredients) return updatePurchaseState(ingredients)
  },[ingredients])

  const purchaseHandler = () => {
    if (isLoggedIn) {
      setPurchasing(true)
    } else {
      setRedirectPath('/checkout')
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
      ...ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={purchasable}
            ordered={purchaseHandler}
            price={totalPrice}
            isLoggedIn={isLoggedIn}
          />
        </React.Fragment>
      )
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      )
    }
    if (loading) {
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

export default withErrorHandler(burgerBuilder, axios)
