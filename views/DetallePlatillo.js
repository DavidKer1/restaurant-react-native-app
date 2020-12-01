import React, {useContext} from 'react';
import {Image} from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { Card, CardItem, Container, Footer, Content, FooterTab, Button, Body, Text, H1 } from 'native-base';
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native';
export default function DetallePedido() {
  // Pedido context
  const {platillo} = useContext(PedidoContext);
  const {nombre, imagen, descripcion, precio} = platillo

  const navigation = useNavigation()
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>{nombre}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image source={{uri: imagen}} style={globalStyles.imagen}/>
              <Text style={{marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button 
            style={globalStyles.boton}
            onPress={
              () => navigation.navigate('FormularioPlatillo')

            }
          >
            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
