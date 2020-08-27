import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../store/auth/actions'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Auth.css'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidity} from '../../utilities'

const initalControls = {
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
}

const auth = props => {
  const [controls, setControls] = useState(initalControls)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const {isBuilding, redirectPath, onSetRedirectPath} = props

  useEffect(() => {
    if (!isBuilding && redirectPath !== '/') {
      onSetRedirectPath('/')
    }
  }, [isBuilding, redirectPath, onSetRedirectPath])

  const inputChangeHandler = event => {
    let value = event.target.value
    let name = event.target.name

    const updatedField = updateObject(controls[name], {
      value,
      valid: checkValidity(value, controls[name].validation).isValid,
      touched: true,
      errorMessage: checkValidity(value, controls[name].validation).message,
    })

    const updatedForm = updateObject(controls, {[name]: updatedField})

    let formIsValid = true
    for (let fieldName in updatedForm) {
      if (updatedForm[fieldName].validation) {
        formIsValid = updatedForm[fieldName].valid && formIsValid
      }
    }

    setControls(updatedForm)
    setFormIsValid(formIsValid)
  }
  const toggleSignUp = () => {
    const newBool = !isSignUp
    setIsSignUp(newBool)
  }
  const authHandler = event => {
    event.preventDefault()
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp ? 'signup' : 'signin',
    )
  }
  let inputs = []
  for (let inputName in controls) {
    inputs.push({id: inputName, config: controls[inputName]})
  }
  const mappedInputs = inputs.map(input => {
    return (
      <Input
        key={input.id}
        elementType={input.config.elementType}
        elementConfig={input.config.elementConfig}
        name={input.id}
        onChange={inputChangeHandler}
        value={input.config.value}
        invalid={!input.config.valid}
        shouldValidate={input.config.validation}
        touched={input.config.touched}
        errorMessage={input.config.errorMessage}
      />
    )
  })

  let errorMessage = null

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }

  let form = (
    <form onSubmit={authHandler}>
      {mappedInputs}
      <Button disabled={!formIsValid} btnType="Success">{isSignUp ? 'Register' : 'Login'}</Button>
    </form>
  )

  if (props.loading) {
    form = <Spinner />
  }

  let authRedirect = null

  if (props.isLoggedIn) {
    authRedirect = <Redirect to={redirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      {form}
      {!props.loading && (
        <Button btnType="Danger" clicked={toggleSignUp}>
          {`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
        </Button>
      )}
    </div>
  )
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
    onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
    onSetRedirectPath: path => dispatch(actions.setRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth)
