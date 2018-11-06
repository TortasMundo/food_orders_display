import React, { Component } from 'react'
import './App.css'
import * as orderService from './services/orders'
import { Totals } from './ui/Totals'
import { Header } from './ui/Header'
import { OrderDetails } from './ui/OrderDetails'
import { Waiting } from './ui/Waiting'
import moment from 'moment'
import momentDuration from 'moment-duration-format' // do not delete
import Swipeable from 'react-swipeable'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentOrderIndex: 0,
      orderedTimes: {},
    }
    this.audio = new Audio('sound.mp3')
  }

  async componentDidMount() {
    await this.getOrders()
    setInterval(this.getOrders, 10000)

    this.tick()
    this.timer = setInterval(() => this.tick(), 1000)
  }

  getOrders = async () => {
    const response = await orderService.listOrders()

    if (response && response.data && response.data.length) {
      if (response.data.length > this.state.orders.length && response.data.find(o => o.status === 'ORDERED')) {
        this.audio.play()
      }
      if (
        this.state.orders.length !== response.data.length &&
        this.state.currentOrderIndex === this.state.orders.length - 1 &&
        this.state.orders[this.state.currentOrderIndex].status !== 'ORDERED'
      ) {
        this.setState({
          orders: response.data,
          currentOrderIndex: Math.min(
            this.state.currentOrderIndex + 1,
            this.state.orders.length,
          ),
        })
      }
      else {
        this.setState({ orders: response.data })
      }
    }
  }

  tick = () => {
    const currentOrder = this.state.orders[this.state.currentOrderIndex]
    if (currentOrder) {
      const orderCode = currentOrder.code
      const seconds = (new Date().getTime() - moment(currentOrder.ordered_at)) / 1000
      const time = moment.duration(seconds, 'seconds').format('HH:mm:ss')
      this.setState({
        orderedTimes: {
          ...this.state.orderedTimes,
          [orderCode]: time,
        },
      })
    }
  }

  navigate = async e => {
    if (e.keyCode === 13) {
      if (this.state.orders[this.state.currentOrderIndex].status === 'ORDERED') {
        orderService.updateStatus(this.state.orders[this.state.currentOrderIndex].code, 'COOKED')
        this.state.orders[this.state.currentOrderIndex].status = 'DELIVERING'
      }
      this.setState({
        currentOrderIndex: Math.min(this.state.currentOrderIndex + 1, this.state.orders.length - 1),
      })
    }
    if (e.keyCode === 39) {
      this.nextOrder()
    }
    if (e.keyCode === 37) {
      this.previousOrder()
    }
  }

  nextOrder = () => {
    const nextIndex = Math.min(this.state.currentOrderIndex + 1, this.state.orders.length - 1)
    if (
      this.state.orders[this.state.currentOrderIndex].status !== 'ORDERED' ||
      this.state.orders[nextIndex].status !== 'ORDERED'
    ) {
      this.setState({
        currentOrderIndex: nextIndex,
      })
    }
  }

  previousOrder = () => {
    this.setState({
      currentOrderIndex: Math.max(this.state.currentOrderIndex - 1, 0),
    })
  }

  render() {
    if (!this.state.orders || !this.state.orders.length || !this.state.orders[this.state.currentOrderIndex]){
      return (<Waiting/>)
    }
    const dayTotal = this.state.orders.map(o => Number(o.total)).reduce((acc, val) => acc + val)
    const commission = dayTotal * 0.05
    const currentOrder = this.state.orders[this.state.currentOrderIndex]
    const totalOrden = currentOrder.total
    const orderNo = this.state.currentOrderIndex + 1
    const notes = currentOrder.notes
    const status = currentOrder.status
    const time = this.state.orderedTimes[currentOrder.code]
    return (
      <div className="App" onKeyDown={this.navigate} tabIndex="0" ref={c => (this._input = c)}>
        <Swipeable onSwipedRight={this.previousOrder} onSwipedLeft={this.nextOrder}>
          <Totals dayTotal={dayTotal} commission={commission} totalOrden={totalOrden}/>
          <Header orderNo={orderNo} notes={notes} totalOrden={totalOrden} status={status} time={time}/>
          <OrderDetails currentOrder={currentOrder}/>
        </Swipeable>
      </div>
    )
  }

  componentDidUpdate() {
    this._input && this._input.focus()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
}

export default App
