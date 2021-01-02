import React, {useContext, useEffect, useState} from 'react';
import {Container, Text, H1, H3, Button, View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import FirebaseContext from '../context/firebase/firebaseContext';
import globalStyles from '../styles/global';
import Countdown from 'react-countdown'
import { StyleSheet } from 'react-native';
export default function ProgresoPedido() {
  const navigation = useNavigation();
  const {idpedido} = useContext(PedidoContext);
  const {firebase} = useContext(FirebaseContext);
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false)
  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection('ordenes')
        .doc(idpedido)
        .onSnapshot(function (doc) {
          setTiempo(doc.data().tiempoentrega);
          setCompletado(doc.data().completado)
        });
    };
    obtenerProducto();
  }, []);

  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>{minutes}:{seconds}</Text>
    )
  }
  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Hemos recibido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Su orden estará lista en:
            </Text>
            <Text><Countdown date={Date.now() + tiempo * 60000} renderer={renderer}/></Text>
          </>
        )}
        {
          completado && (
            <>
              <H1 style={styles.textoCompletado}>Orden Lista</H1>
              <H3 style={styles.textoCompletado}>Por favor pase a recoger su pedido</H3>
              <Button style={[globalStyles.boton, {marginTop: 100}]} rounded full onPress={() => navigation.navigate("NuevaOrden")}><Text style={globalStyles.botonTexto}>Comenzar una nueva orden</Text></Button>
            </> 
          )
        }
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30
  },
  textoCompletado: {
    textAlign: 'center',
    marginBottom: 20
  }
})