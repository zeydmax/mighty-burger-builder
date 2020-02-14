import React from 'react'

import classes from './Input.css'

const input = props => {
  let inputElement = null

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      )
      break
    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={props.value} onChange={props.onChange} name={props.name}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      )
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input
