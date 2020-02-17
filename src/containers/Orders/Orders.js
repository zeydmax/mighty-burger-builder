import React, {Component} from 'react'
import axios from '../../axios-orders'
import {connect} from 'react-redux'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'
import {getOrdersStart} from '../../store/order/actions'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    this.props.onOrdersLoading()
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        })}
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
