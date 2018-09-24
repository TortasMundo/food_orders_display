import React, { Component } from 'react'
import './App.css'
import config from './config'
import * as orderService from './services/orders'
import io from 'socket.io-client'
import ReactSound from 'react-sound'

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
      ring: false,
    }
    this.socket = {}
  }

  async componentDidMount() {
    this.socket = io(config.API_URL)
    this.socket.emit('subscribe_for_order_placements', config.mocks.store_location)
    this.socket.on('placed_order', order => {
      this.setState({
        ring: true,
      })
      this.setState({
        orders: [...this.state.orders, order],
      })
      this.setState({
        currentOrderId: this.state.orders.length - 1,
      })
    })

    const response = await orderService.listOrders()
    if (response.data && response.data.length) {
      this.setState({ orders: response.data })
      this.setState({
        currentOrderId: this.state.orders.length - 1,
      })
    }
  }

  navigate = e => {
    // e.preventDefault()
    debugger
    if (e.keyCode === 39) {
      this.setState({
        ring: false,
        currentOrderId: Math.min(this.state.currentOrderId + 1, this.state.orders.length - 1),
      })
    }
    if (e.keyCode === 37) {
      this.setState({
        ring: false,
        currentOrderId: Math.max(this.state.currentOrderId - 1, 0),
      })
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.navigate} tabIndex="0">
        <div className="OrderNo">#{this.state.orders[this.state.currentOrderId].id}</div>
        <div className="OrderDetails">
          * Jamón - {this.state.orders[this.state.currentOrderId].jamonQuantity} <br />* Lomo -{' '}
          {this.state.orders[this.state.currentOrderId].lomoQuantity} <br />* Especial -{' '}
          {this.state.orders[this.state.currentOrderId].especialQuantity} <br />* Refrescos -{' '}
          {this.state.orders[this.state.currentOrderId].refrescosQuantity} <br />
        </div>
        {this.state.ring && <ReactSound url="sound.mp3" playStatus={ReactSound.status.PLAYING} />}
      </div>
    )
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }
}

export default App
