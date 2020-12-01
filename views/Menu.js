import React, {Fragment, useContext, useEffect} from 'react';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';
import {StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Menu() {
  // Context de firebase
  const {obtenerProductos, menu} = useContext(FirebaseContext);
  // Redirection

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    const categoriaAnterior = menu[i - 1]?.categoria;
    if (i > 0 && categoriaAnterior === categoria) {
      return null;
    }
    return (
      <Separator style={styles.separador}>
        <Text style={styles.separadorTexto}>{categoria}</Text>
      </Separator>
    );
  };
  return (
    <Container style={globalStyles.contenedor}>
      <Content style={{backgroundColor: '#fff'}}>
        <List>
          {menu.map((platillo, i) => (
            <Fragment key={platillo.id}>
              {mostrarHeading(platillo.categoria, i)}
              <Platillo platillo={platillo} i={i} key={platillo.id} />
            </Fragment>
          ))}
        </List>
      </Content>
    </Container>
  );
}

const Platillo = ({platillo}) => {
  const {imagen, nombre, descripcion, precio} = platillo;
  const {seleccionarPlatillo} = useContext(PedidoContext);
  const navigation = useNavigation()

  return (
    <ListItem onPress={() => {
      seleccionarPlatillo(platillo)
      navigation.navigate('DetallePlatillo')
    }}>
      <Thumbnail source={{uri: imagen}} large square />
      <Body>
        <Text>{nombre}</Text>
        <Text note numberOfLines={2}>
          {descripcion}
        </Text>
        <Text>Precio: $ {precio}</Text>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#303030',
  },
  separadorTexto: {
    color: '#ffda00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
