import React, {useEffect} from 'react'
import axios from '../../axios-orders'
import {connect} from 'react-redux'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {getOrdersStart} from '../../store/order/actions'

import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'

const orders = props => {
  useEffect(() => {
    props.onOrdersLoading()
  }, [])

  let body = <Spinner />
  if (!props.loading) {
    body = (
      <div>
        {props.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        })}
      </div>
    )
  }
  return <div>{body}</div>
}

const mapStateToProps = store => {
  return {
    orders: store.order.orders,
    loading: store.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrdersLoading: () => dispatch(getOrdersStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios))
