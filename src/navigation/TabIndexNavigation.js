import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from '../screens/IndexScreen';
import EscanerScreen from '../screens/EscanerScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { Icon } from 'react-native-elements';

export default function TabIndexNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: "#9500f9",
      }, headerTintColor: '#fff', // Establece el color del texto del encabezado
      headerTitleStyle: {
        fontWeight: 'bold', // Establece el estilo del texto del encabezado
      },
      tabBarActiveTintColor: "#68179f",
      tabBarInactiveTintColor: "#9500f9",
      tabBarIcon: ({ color, size }) => iconos(route, color, size)
    })}>
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Escanear" component={EscanerScreen} />
      <Tab.Screen name="Reportes" component={IndexScreen} />
    </Tab.Navigator>
  )
}
function iconos(router, color, size) {
  let name;
  if (router.name === 'Reportes') {
    name = 'alert'
  }
  if (router.name === 'Escanear') {
    name = 'camera'
  }
  if (router.name === 'Perfil') {
    name = "account"
  }
  return (
    <Icon type='material-community' name={name} color={color} size={size} />
  );
}

const styles = StyleSheet.create({})