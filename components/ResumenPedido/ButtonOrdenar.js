import React, { useContext } from 'react';
import { Alert} from 'react-native';
import {
  Text,
  Button,

} from 'native-base';
import globalStyles from '../../styles/global';
import FirebaseContext from '../../context/firebase/firebaseContext';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';

export default function ButtonOrdenar() {

  const {firebase} = useContext(FirebaseContext)
  const navigation = useNavigation();
  const {pedido, total, pedidoOrdenado} = useContext(PedidoContext);
  const progresoPedido = () => {
    Alert.alert('¿Listo para ordenar?','Una vez realices tu pedido, no podrás cambiarlo', [
      {
        text: 'Confirmar',
        onPress: async  () => {
          const pedidoObj = {
            tiempoentrega: 0,
            completado: false,
            total: Number(total),
            orden: pedido,
            creado: Date.now()
          }
          console.log(pedidoObj);

          try {
            const pedidoResponse = await firebase.db.collection('ordenes').add(pedidoObj)
            pedidoOrdenado(pedidoResponse.id)
            navigation.navigate('ProgresoPedido')

          } catch (error) {
            console.log(error);
          }
          
        }
      },
      {
        text: 'Seguir Pidiendo',
        style: 'cancel'
      }
    ] )
  }
  return (
    <Button onPress={() => progresoPedido()} style={[globalStyles.boton]} full>
      <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
    </Button>
  );
}
