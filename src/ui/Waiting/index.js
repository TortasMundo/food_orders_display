import React from 'react'
import { styles } from './styles'

export const Waiting = (props) => {
  return (
    <div style={styles.text}>
     <img src="logo-small.png" alt="Tortas Mundo" />
     <div>Esperando ordenes...</div>
    </div>)
}