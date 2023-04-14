import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Arriba from '../../../../assets/images/LOGO-MOVIL-arriba.png'

export default function ImageArriba() {
    const { height, width } = useWindowDimensions();
    const TopPosition = height * 0.026;
    return (
      <View style={[styles.containerImages, { width: width * 0.65 }, { height: height * 0.2 }, { top: TopPosition, position: 'absolute' }]}>
        <Image source={Arriba} style={[]} resizeMode="contain" />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    containerImages: {
      height: '6%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slides: {
  
    }
  })
  