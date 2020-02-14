import React from 'react'

import classes from './Order.css'

const Order = props => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad ()</p>
      <p>
        Price: <strong>4$</strong>
      </p>
    </div>
  )
}

export default Order
