import { CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, SELECCIONAR_PRODUCTO, EIMINAR_PRODUCTO,PEDIDO_ORDENADO } from "../../types"

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO: 
      return {
        ...state,
        platillo: action.payload
      }
    case CONFIRMAR_ORDENAR_PLATILLO: 
      return {
        ...state,
        pedido: [...state.pedido, action.payload]
      }
    case MOSTRAR_RESUMEN: 
      return {
        ...state,
        total: action.payload
      }
    case EIMINAR_PRODUCTO: 
      return {
        ...state,
        pedido: state.pedido.filter(articulo=> articulo.id !== action.payload )
      }
    case PEDIDO_ORDENADO:
      return {
        ...state,
        pedido: [],
        total: 0,
        idpedido: action.payload
      }
    default:
      return state
  }
}