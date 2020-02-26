import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth, setRedirectPath} from '../../store/auth/actions'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Auth.css'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidity} from '../../utilities'

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

  inputChangeHandler = event => {
    let value = event.target.value
    let name = event.target.name

    const updatedField = updateObject(this.state.controls[name], {
      value,
      valid: checkValidity(value, this.state.controls[name].validation).isValid,
      touched: true,
      errorMessage: checkValidity(value, this.state.controls[name].validation).message,
    })

    const updatedForm = updateObject(this.state.controls, {[name]: updatedField})

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
