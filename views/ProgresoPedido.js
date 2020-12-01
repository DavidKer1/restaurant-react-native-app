import React, { useContext, useEffect, useState } from 'react';
import { Container, Text, H1, H3, Button, View } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
export default function ProgresoPedido() {
  const navigation = useNavigation()
  const {idpedido} = useContext(PedidoContext)

  return (
    <Text>Desde Progreso</Text>
  )
}
