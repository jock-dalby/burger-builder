import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.loading) {
      orders = this.props.orders.map((order, i) => (
        <Order key={i} ingredients={order.ingredients} price={order.price}/>)
      )
    }
    return (
      <div>
        { orders }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));