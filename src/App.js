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
      ring: false
    }
    this.socket = {}
  }

  async componentDidMount() {
    this.socket = io(config.API_URL)
    this.socket.emit('subscribe_for_order_placements', config.mocks.store_location)
    this.socket.on('placed_order', order => {
      this.setState({
        ring: true
      })
      this.setState({
        orders: [...this.state.orders, order],
      })
      this.setState({
        currentOrderId: this.state.orders.length - 1
      })
    })

    const response = await orderService.listOrders()
    if (response.data && response.data.length) {
      this.setState({ orders: response.data })
      this.setState({
        currentOrderId: this.state.orders.length - 1
      })
    }
  }

  nextOrder = (e) => {
    e.preventDefault();
    this.setState({
      currentOrderId: Math.min(this.state.currentOrderId + 1, this.state.orders.length - 1)
    })
  }

  previousOrder = (e) => {
    e.preventDefault();
    this.setState({
      currentOrderId: Math.max(this.state.currentOrderId - 1, 0)
    })
  }

  render() {
    let sound
    if (this.state.ring) {
      sound = <ReactSound
        url="sound.mp3"
        playStatus={ReactSound.status.PLAYING}
      />
    }
    return (
      <div className="App" onClick={this.previousOrder} onContextMenu={this.nextOrder}>
        <div className="OrderNo">#{this.state.orders[this.state.currentOrderId].id}</div>
        <div className="OrderDetails">
          * Jamón - {this.state.orders[this.state.currentOrderId].jamonQuantity} <br />* Lomo -{' '}
          {this.state.orders[this.state.currentOrderId].lomoQuantity} <br />* Especial -{' '}
          {this.state.orders[this.state.currentOrderId].especialQuantity} <br />* Refrescos -{' '}
          {this.state.orders[this.state.currentOrderId].refrescosQuantity} <br />
        </div>
        {sound}
      </div>
    )
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }
}

export default App
