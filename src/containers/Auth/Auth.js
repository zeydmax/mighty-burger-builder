import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth, setRedirectPath} from '../../store/auth/actions'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Auth.css'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail',
          autoComplete: 'off',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          isEmail: true,
        },
        touched: false,
        valid: false,
        errorMessage: null,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Password',
          autoComplete: 'off',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        touched: false,
        valid: false,
        errorMessage: null,
      },
    },
    isSignUp: true,
  }
  componentDidMount() {
    if (!this.props.isBuilding && this.props.redirectPath !== '/') {
      this.props.onSetRedirectPath('/')
    }
  }
  checkValidity(value, rules) {
    let isValid = true
    let message = null

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
      if (value.trim() === '') {
        message = 'This value is required.'
      }
    }
    if (rules.isEmail) {
      const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
      isValid = regex.test(value) && isValid
      if (regex.test(value) === false) {
        message = 'Enter correct e-mail adress.'
      }
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
      if (!value.length < rules.minLength && !message) {
        message = 'Entered value is too short.'
      }
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
      if (value.length > rules.maxLength) {
        message = 'Entered value is too long.'
      }
    }

    return {isValid, message}
  }
  inputChangeHandler = event => {
    let value = event.target.value
    let name = event.target.name

    const updatedForm = {...this.state.controls}
    const updatedField = updatedForm[name]

    updatedField.value = value
    if (updatedField.validation) {
      updatedField.valid = this.checkValidity(value, this.state.controls[name].validation).isValid
      updatedField.touched = true
      updatedField.errorMessage = this.checkValidity(value, this.state.controls[name].validation).message
    }

    updatedForm[name] = updatedField

    let formIsValid = true
    for (let fieldName in updatedForm) {
      if (updatedForm[fieldName].validation) {
        formIsValid = updatedForm[fieldName].valid && formIsValid
      }
    }

    this.setState({controls: updatedForm, formIsValid: formIsValid})
  }
  toggleSignUp = () => {
    const newBool = !this.state.isSignUp
    this.setState({isSignUp: newBool})
  }
  authHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp ? 'signup' : 'signin',
    )
  }
  render() {
    let inputs = []
    for (let inputName in this.state.controls) {
      inputs.push({id: inputName, config: this.state.controls[inputName]})
    }
    const mappedInputs = inputs.map(input => {
      return (
        <Input
          key={input.id}
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

    let errorMessage = null

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    let form = (
      <form onSubmit={this.authHandler}>
        {mappedInputs}
        <Button btnType="Success">{this.state.isSignUp ? 'Register' : 'Login'}</Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    let authRedirect = null

    if (this.props.isLoggedIn) {
      authRedirect = <Redirect to={this.props.redirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        {!this.props.loading && (
          <Button btnType="Danger" clicked={this.toggleSignUp}>
            {`Switch to ${this.state.isSignUp ? 'Sign In' : 'Sign Up'}`}
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLoggedIn: state.auth.token !== null,
    isBuilding: state.builder.building,
    redirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, method) => dispatch(auth(email, password, method)),
    onSetRedirectPath: path => dispatch(setRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
