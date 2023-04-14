import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Scan from '../../../assets/scan.png'

export default function HeaderComponent() {
  return (
    <View>
      <Image source={Scan} style={styles.image} />
      <Text style={styles.title}>Utiliza la Cámara</Text>
      <Text style={styles.text}>Usa la Cámara de tu dispositivo para escanear el codigo QR del equipo de cómputo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        marginTop: 30,
        marginBottom: 30,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
})