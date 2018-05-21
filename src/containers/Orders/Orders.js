import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = Object.keys(res.data)
          .map(key => ({ id: key, ...res.data[key]}));
        this.setState({
          loading: false,
          orders
        })
      }).catch(err => {
        this.setState({loading: false})
      })
  }

  render() {
    return (
      <div>
        <Order/>
        <Order/>
        <Order/>
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);