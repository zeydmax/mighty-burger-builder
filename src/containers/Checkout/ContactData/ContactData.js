import React, {Component} from 'react'
import axios from '../../../axios-orders'
import {withRouter} from 'react-router-dom'

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
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: '',
      },
    },
    loading: false,
  }
  inputChangeHandler = event => {
    let value = event.target.value
    let name = event.target.name
    this.setState({
      orderForm: {
        ...this.state.orderForm,
        [name]: {
          ...this.state.orderForm[name],
          value,
        },
      },
    })
  }
  orderHandler = event => {
    event.preventDefault()
    this.setState({loading: true})
    const fieldData = {}
    for (let fieldId in this.state.orderForm) {
      fieldData[fieldId] = this.state.orderForm[fieldId]
    }
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: fieldData.name.value,
        address: {
          street: fieldData.street.value,
          zipCode: fieldData.zipCode.value,
          country: fieldData.country.value,
        },
        email: fieldData.email.value,
      },
      deliveryMethod: fieldData.deliveryMethod.value,
    }
    axios
      .post('/orders.json', data)
      .then(response => {
        this.setState({loading: false})
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading: false})
      })
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
        />
      )
    })
    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input autoComplete="off" type="text" name="name" placeholder="Your name" />
        <Input autoComplete="off" type="email" name="email" placeholder="Your email" />
        <Input autoComplete="off" type="text" name="street" placeholder="Your street" />
        <Input autoComplete="off" type="text" name="postalCode" placeholder="Your Postal Code" /> */}
        {mappedInputs}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    )
    if (this.state.loading) {
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

export default withRouter(ContactData)
