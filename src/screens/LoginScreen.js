import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logo.png'
import ImageArriba from '../components/account/Login/ImageArriba'
import ImageAbajo from '../components/account/Login/ImageAbajo'
import FormLogin from '../components/account/Login/FormLogin'
import Toast from "react-native-toast-message";

const Login = ({ route }) => {
  const mensaje = route.params?.params?.mensaje;
  console.log(route.params)
  console.log("mensaje: " + mensaje)
  const {height} = useWindowDimensions();
  useEffect(()=>{
    
    switch (mensaje) {
      case "cambiarP":
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Contraseña cambiada correctamente",
        });
        
        break;
        case "registro":
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Usuario registrado correctamente",
        });
        
        break;
      default:
        break;
    }
  })
  
  return (
      <View style={styles.container}>
        <ImageArriba/>
        <View style={styles.root}>
          <Image source={Logo} style={[styles.logo, {height: height * 0.2}]} resizeMode="contain"/>
          <Text style={styles.title}>INICIO DE SESIÓN</Text>
          <FormLogin/>
        </View>
        <ImageAbajo/>
      </View>
  )
}
const styles = StyleSheet.create({
  containerImages: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root:{
    alignItems: 'center',
    marginTop: '25%', 
    zIndex: 2,
  },
  container:{
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '20%',
    color: '#9500f9',

  },
  labels:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo:{
    width: '60%', 
  },
  slides:{
    width: 600,
    height: 300,
  }
});
export default Login