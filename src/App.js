import React, { Component } from 'react'
import './App.css'
import * as orderService from './services/orders'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
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
        <div className="OrderNo">#23</div>
        <div OrderDetails>
          Jamón (${this.orders[0].jamonQuantity}) <br />
          Lomo (${this.orders[0].lomoQuantity}) <br />
          Especial (${this.orders[0].especialQuantity}) <br />
          Refrescos (${this.orders[0].refrescosQuantity}) <br />
        </div>
      </div>
    )
  }
}

export default App
