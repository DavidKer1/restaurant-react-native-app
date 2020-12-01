import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePedido from './views/DetallePlatillo';
import Formulario from './views/Formulario';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

import FirebaseState from './context/firebase/firebaseState';
import PedidoSate from './context/pedidos/pedidosState';
import BotonResumen from './components/ui/BotonResumen';
const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <FirebaseState>
      <PedidoSate>
        <NavigationContainer

        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ffda00',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTintColor: '#3d3c3c'
            }}>
            <Stack.Screen
              name="NuevaOrden"
              component={NuevaOrden}
              options={{
                title: 'Nueva Orden',
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Nuestro Menu',
                headerRight: props => <BotonResumen /> 
              }}
            />
            <Stack.Screen
              name="DetallePlatillo"
              component={DetallePedido}
              options={{
                title: 'Detalle Platillo',
              }}
            />
            <Stack.Screen
              name="FormularioPlatillo"
              component={Formulario}
              options={{
                title: 'Ordenar Platillo',
              }}
            />
            <Stack.Screen
              name="ResumenPedido"
              component={ResumenPedido}
              options={{
                title: 'Resumen del pedido',
              }}
            />
            <Stack.Screen
              name="ProgresoPedido"
              component={ProgresoPedido}
              options={{
                title: 'Progreso del pedido',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </PedidoSate>
      </FirebaseState>
    </>
  );
};

export default App;
