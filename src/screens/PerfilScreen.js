import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'

import ProfileForm from '../components/account/Profile/ProfileForm';
import Toast from "react-native-toast-message";

export default function PerfilScreen({route}) {
  console.log("entro useEffect")
    console.log(route.params)
    const mensaje = route.params?.mensaje;
    const name = route.params?.name;
    const lastname = route.params?.lastname;
    const username = route.params?.username;
    const id = route.params?.id;
    const token = route.params?.token;
    const grado = route.params?.grado;
    const grupo = route.params?.grupo;
  useEffect(()=>{
    
    switch (mensaje) {
      case "acceso":
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Acceso correcto",
        });
        
        break;
      default:
        break;
    }
  })
  
  return (
    <View style={styles.container}>
      
      
      <ProfileForm name={name} lastname={lastname} username={username} grado={grado} grupo={grupo}     />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    alignItems: 'center',
  }
})