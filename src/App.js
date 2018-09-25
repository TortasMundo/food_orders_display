import React, {Component} from 'react'
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
      currentOrderIndex: 0,
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
        orders: [...this.state.orders, order],
      })
    })

    const response = await orderService.listOrders()
    if (response.data && response.data.length) {
      this.setState({orders: response.data})
    }
  }

  navigate = e => {
    if (e.keyCode === 39) {
      if (this.state.orders)
      this.setState({
        ring: false,
        currentOrderIndex: Math.min(this.state.currentOrderIndex + 1, this.state.orders.length - 1),
      })
    }
    if (e.keyCode === 37) {
      this.setState({
        ring: false,
        currentOrderIndex: Math.max(this.state.currentOrderIndex - 1, 0),
      })
    }
  }

  render() {
    const dayTotal = this.state.orders.map(o => Number(o.total)).reduce((acc, val) => acc + val)
    const commission = dayTotal * 0.05
    const cookedClass = this.state.orders[this.state.currentOrderIndex].status !== 'ORDERED' ? 'Cooked' : ''
    return (
      <div className="App" onKeyDown={this.navigate} tabIndex="0">
        <div className={`OrderNo ${cookedClass}`}>#{this.state.orders[this.state.currentOrderIndex].id}</div>
        <div className={`Info ${cookedClass}`}>
          <div className="OrderDetails">
            * Jamón - {this.state.orders[this.state.currentOrderIndex].jamonQuantity} <br/>
            * Lomo - {this.state.orders[this.state.currentOrderIndex].lomoQuantity} <br/>
            * Especial - {this.state.orders[this.state.currentOrderIndex].especialQuantity} <br/>
            * Refrescos - {this.state.orders[this.state.currentOrderIndex].refrescosQuantity} <br/>
          </div>
          <div className="Totals">
            Total orden: <br />
            ${this.state.orders[this.state.currentOrderIndex].total}
            <br />
            <br />
            Total día: <br />
            ${dayTotal}
            <br />
            <br />
            Comisión: <br />
            ${commission}
          </div>
        </div>
        {this.state.ring && <ReactSound url="sound.mp3" playStatus={ReactSound.status.PLAYING}/>}
      </div>
    )
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }
}

export default App
