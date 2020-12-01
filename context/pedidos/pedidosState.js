import React, {useReducer} from 'react';

import PedidoReducer from './pedidosReducer'
import PedidoContext from './pedidosContext'
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO,MOSTRAR_RESUMEN, EIMINAR_PRODUCTO, PEDIDO_ORDENADO } from '../../types';


const PedidoState = (props) => {
  // Crear state inicial
  const initialState = {
    pedido: [],
    platillo: null,
    total: 0,
    idpedido: ''
  }
  
  // useReducer con dispatch
  const [state, dispatch] = useReducer(PedidoReducer, initialState)

  // Selecciona el producto que el usuario desaea ordenar
  const seleccionarPlatillo = (platillo) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo
    })
  }
  
  const guardarPedido = pedido => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PLATILLO,
      payload: pedido
    })
  }

  // Muestra el total a pagar
  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload: total
    })
  }

  const eliminarProducto = id => {
    dispatch({
      type: EIMINAR_PRODUCTO,
      payload: id
    })
  }
  
  const pedidoOrdenado = id => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id
    })
  }
  return (
    <PedidoContext.Provider 
    value = {{
      pedido: state.pedido,
      platillo: state.platillo,
      total: state.total,
      idpedido: state.idpedido,
      seleccionarPlatillo,
      guardarPedido,
      mostrarResumen,
      eliminarProducto,
      pedidoOrdenado
    }}
    >
      {props.children}
    </PedidoContext.Provider>
  )
}
export default PedidoState