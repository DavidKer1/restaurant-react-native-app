import React, { useContext } from 'react'
import { Button, Text } from 'native-base'
import globalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../../context/pedidos/pedidosContext'
export default function BotonResumen() {
  const navigation = useNavigation() 

  const {pedido} = useContext(PedidoContext)
  if(pedido.length === 0) return null
  return (
      <Button style={globalStyles.boton} onPress={() => navigation.navigate('ResumenPedido')}>
        <Text style={[ globalStyles.botonTexto, {fontWeight: "normal", textTransform: 'none'}]}>Ir a pedido</Text>
      </Button>
  )
}

