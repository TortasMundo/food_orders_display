import React from 'react'
import { styles } from './styles'

export const Totals = (props) => {
  return (<div style={styles.container}>
    <span style={styles.item}>Total orden: ${props.totalOrden}</span>
    <span style={styles.item}>Total día: ${props.dayTotal}</span>
    <span style={styles.item}>Comisión: ${props.commission}</span>
  </div>)
}