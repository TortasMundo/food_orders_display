import React from 'react'
import { styles } from './styles'

export const OrderDetails = (props) => {
  const containerStyle = props.status === 'ORDERED' ?
    styles.container :
    { ...styles.container, ...styles.cooked }
  return (<div style={containerStyle}>
    <div style={styles.orderDetails}>
      * Jamón - {props.currentOrder.jamon_quantity} <br/>
      * Lomo - {props.currentOrder.lomo_quantity} <br/>
      * Especial - {props.currentOrder.especial_quantity} <br/>
      * Refrescos - {props.currentOrder.refrescos_quantity} <br/>
    </div>
  </div>)
}