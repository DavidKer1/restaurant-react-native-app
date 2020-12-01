import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  List,
  ListItem,
  Thumbnail,
  Left,
  H1,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Body,
  View,
} from 'native-base';
import globalStyles from '../styles/global';
import {Alert, StyleSheet} from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import FirebaseContext from '../context/firebase/firebaseContext';

export default function ResumenPedido() {
  const {pedido, total, mostrarResumen, eliminarProducto,pedidoOrdenado} = useContext(PedidoContext);
  const {firebase} = useContext(FirebaseContext)
  const navigation = useNavigation();
  useEffect(() => {
    calcularTotal();
  }, [pedido]);
  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );
    mostrarResumen(nuevoTotal);
  };

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
            const pedido = await firebase.db.collection('ordenes').add(pedidoObj)
            pedidoOrdenado(pedido.id)
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
  const  confirmarEliminacion = ({id, nombre}) => {
    Alert.alert('¿Deseas eliminar este articulo?',nombre, [
      {
        text: 'Confirmar',
        onPress:  () => {
          eliminarProducto(id)
        }
      },
      {
        text: 'Seguir Pidiendo',
        style: 'cancel'
      }
    ] )
  }
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen del Pedido</H1>
        {pedido.map((platillo, i) => {
          const {cantidad, nombre, imagen, id, precio} = platillo;
          return (
            <List key={i}>
              <ListItem thumbnail itemDivider>
                <Left>
                  <Thumbnail large square source={{uri: imagen}} />
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad: {cantidad}</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <Text>Precio: ${precio} </Text>
                    <Text>Subtotal: ${precio * cantidad}</Text>
                  </View>
                  <Button style={{marginTop: 5}} danger onPress={ () => confirmarEliminacion({id,nombre})}><Text>Eliminar</Text></Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.cantidad}>Total a pagar: ${total}</Text>
        <Button
            onPress={() => navigation.navigate('Menu')}
            dark
            full>
            <Text style={[globalStyles.botonTexto, {color: 'white'}]}>Seguir pidiendo</Text>
          </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            onPress={() => progresoPedido()}
            style={[globalStyles.boton]}
            full
            >
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>
  );
}
