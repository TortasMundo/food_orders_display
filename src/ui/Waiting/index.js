import React from 'react'
import { styles } from './styles'

export const Waiting = (props) => {
  return (
    <div style={styles.text}>
     <img style={styles.logo} src="tortas.jpg" alt="Tortas Mundo" />
     <div>Esperando ordenes...</div>
    </div>)
}