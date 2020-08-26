import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {postOrderAction} from '../../../store/order/actions'
import {updateObject, checkValidity} from '../../../utilities'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.css'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 8,
        },
        touched: false,
        valid: false,
        errorMessage: null,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: null,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: null,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: null,
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        touched: false,
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: null,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
        errorMessage: null,
      },
    },
    formIsValid: false,
    loading: false,
  }
  inputChangeHandler = event => {
    let value = event.target.value
    let name = event.target.name
    const updatedField = updateObject(this.state.orderForm[name], {
      value,
      valid: checkValidity(value, this.state.orderForm[name].validation).isValid,
      touched: true,
      errorMessage: checkValidity(value, this.state.orderForm[name].validation).message,
    })

    const updatedForm = updateObject(this.state.orderForm, {[name]: updatedField})

    let formIsValid = true
    for (let fieldName in updatedForm) {
      if (updatedForm[fieldName].validation) {
        formIsValid = updatedForm[fieldName].valid && formIsValid
      }
    }

    this.setState({orderForm: updatedForm, formIsValid: formIsValid})
  }
  orderHandler = event => {
    event.preventDefault()
    if (!this.state.formIsValid) {
      return
    }
    const fieldData = {}
    for (let fieldId in this.state.orderForm) {
      fieldData[fieldId] = this.state.orderForm[fieldId].value
    }
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: fieldData,
      userId: this.props.userId,
    }
    this.props.onOrderPost(data)
  }
  render() {
    let inputs = []
    for (let inputName in this.state.orderForm) {
      inputs.push({id: inputName, config: this.state.orderForm[inputName]})
    }
    const mappedInputs = inputs.map(input => {
      return (
        <Input
          key={input.id}
          autoComplete="off"
          elementType={input.config.elementType}
          elementConfig={input.config.elementConfig}
          name={input.id}
          onChange={this.inputChangeHandler}
          value={input.config.value}
          invalid={!input.config.valid}
          shouldValidate={input.config.validation}
          touched={input.config.touched}
          errorMessage={input.config.errorMessage}
        />
      )
    })
    let form = (
      <form onSubmit={this.orderHandler}>
        {mappedInputs}
        <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderPost: data => dispatch(postOrderAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData))
