import React, { Component } from 'react'
import './App.css'
import * as orderService from './services/orders'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [{
        id: 0,
        jamonQuantity: 0,
        lomoQuantity: 0,
        especialQuantity: 0,
        refrescosQuantity: 0,
      }],
      currentOrderId: 0
    }
  }

  async componentDidMount() {
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
          * Jamón - {this.state.orders[this.state.orders.length - 1].jamonQuantity} <br />
          * Lomo - {this.state.orders[this.state.orders.length - 1].lomoQuantity} <br />
          * Especial - {this.state.orders[this.state.orders.length - 1].especialQuantity} <br />
          * Refrescos - {this.state.orders[this.state.orders.length - 1].refrescosQuantity} <br />
        </div>
      </div>
    )
  }
}

export default App
