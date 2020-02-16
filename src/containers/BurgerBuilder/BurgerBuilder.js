import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addIngredient, removeIngredient} from '../../store/ingredients/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  // componentDidMount() {
  //   axios
  //     .get('https://react-burger-7176b.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.props.setIngredients(response.data)
  //     })
  //     .catch(error => {
  //       this.setState({error: true})
  //     })
  // }

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
  // {
  //   const oldCount = this.props.ingredients[type]
  //   const updatedCount = oldCount + 1
  //   const updatedIngredients = {
  //     ...this.props.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
  //   this.setState({totalPrice: newPrice})
  //   this.props.setIngredients(updatedIngredients)
  //   this.updatePurchaseState(updatedIngredients)
  // }

  removeIngredientHandler = type => {
    this.props.removeIngredient(type)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ingredients !== this.props.ingredients) {
      this.updatePurchaseState(this.props.ingredients)
    }
  }

  // {
  //   const oldCount = this.props.ingredients[type]
  //   if (oldCount <= 0) {
  //     return
  //   }
  //   const updatedCount = oldCount - 1
  //   const updatedIngredients = {
  //     ...this.props.ingredients,
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction
  //   this.setState({totalPrice: newPrice})
  //   this.props.setIngredients(updatedIngredients)
  //   this.updatePurchaseState(updatedIngredients)
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Maksim Repin',
    //     adress: {
    //       street: 'Teststreet 72A',
    //       country: 'Russia',
    //     },
    //     email: 'test@test.com',
    //     deliveryMethod: 'fastest',
    //   },
    // }
    // axios
    //   .post('/orders.json', order)
    //   .then(response => this.setState({loading: false, purchasing: false}))
    //   .catch(error => this.setState({loading: false, purchasing: false}))
    const query = []
    for (let i in this.props.ingredients) {
      query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    }
    query.push('price=' + this.state.totalPrice)
    const queryString = query.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
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

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
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
    if (this.state.loading) {
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
    ingredients: state.ingredients.ingredients,
    totalPrice: state.ingredients.totalPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: type => dispatch(addIngredient(type)),
    removeIngredient: type => dispatch(removeIngredient(type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
