import React, { Component } from 'react'
import './App.css'
import config from './config'
import * as orderService from './services/orders'
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [
        {
          id: 0,
          jamonQuantity: 0,
          lomoQuantity: 0,
          especialQuantity: 0,
          refrescosQuantity: 0,
        },
      ],
      currentOrderId: 0,
    }
    this.socket = {}
  }

  async componentDidMount() {
    this.socket = io(config.API_URL)
    this.socket.emit('subscribe_for_order_placements', config.mocks.store_location)
    this.socket.on('placed_order', data => {
      this.setState({
        orders: [...this.state.orders, data.order],
      })
    })

    const response = await orderService.listOrders()
    if (response.data && response.data.length) {
      this.setState({ orders: response.data })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="OrderNo">#{this.state.orders[this.state.orders.length - 1].id}</div>
        <div className="OrderDetails">
          * Jamón - {this.state.orders[this.state.orders.length - 1].jamonQuantity} <br />* Lomo -{' '}
          {this.state.orders[this.state.orders.length - 1].lomoQuantity} <br />* Especial -{' '}
          {this.state.orders[this.state.orders.length - 1].especialQuantity} <br />* Refrescos -{' '}
          {this.state.orders[this.state.orders.length - 1].refrescosQuantity} <br />
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }
}

export default App
