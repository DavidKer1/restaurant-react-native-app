import React, {useContext, useEffect, useState} from 'react';
import {
  Container,
  Form,
  Icon,
  Input,
  Grid,
  Col,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import globalStyles from '../styles/global';
import {Alert, Keyboard} from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';

export default function Formulario() {
  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(0);
  // Context
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;
  const navigation = useNavigation()
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };
  const decrementarUno = () => {
    Keyboard.dismiss();

    if (!cantidad) setCantidad(1);

    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(nuevaCantidad);
    }
  };

  const incrementarUno = () => {
    Keyboard.dismiss();
    const nuevaCantidad = parseInt(cantidad);
    if (!nuevaCantidad) setCantidad(1);
    if (nuevaCantidad < 10) {
      const nuevaCantidad = parseInt(cantidad) + 1;
      setCantidad(nuevaCantidad);
    }
  };

  // Almacena la cantidad vía input
  const calcularCantidad = (cantidadInput) => {
    const nuevaCantidad = parseInt(cantidadInput);
    if (nuevaCantidad > 0) {
      setCantidad(nuevaCantidad);
    }
    if (!nuevaCantidad) {
      setCantidad('');
    }
  };
  const ajustarCantidad = () => {
    if (cantidad > 10) {
      setCantidad(10);
      Alert.alert('Revisa la cantidad', 'Maximo 10 por cada articulo', [
        {text: 'OK'},
      ]);
    }
    if (cantidad < 1) {
      setCantidad(1);
    }
  };

  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas Confirmar tu pedido?',
      'Un pedido confirmado no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const pedido = {
              ...platillo,
              cantidad,
              total
            }
            guardarPedido(pedido)
            navigation.navigate('ResumenPedido')
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                dark
                style={{height: 80, justifyContent: 'center', width: '100%'}}
                onPress={() => decrementarUno()}>
                <Icon name="remove" style={{fontSize: 40}} />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 20}}
                value={cantidad.toString()}
                keyboardType="numeric"
                onFocus={() => setCantidad('')}
                onEndEditing={() => ajustarCantidad()}
                onChangeText={(cantidad) => calcularCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                dark
                style={{height: 80, justifyContent: 'center', width: '100%'}}
                onPress={() => incrementarUno()}>
                <Icon name="add" style={{fontSize: 40}} />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
