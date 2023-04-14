import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Abajo from '../../../../assets/images/LOGO-MOVIL-abajo.png'

export default function ImageAbajo() {
    const {height, width} = useWindowDimensions();
    const TopMargin = height * 0.79;
    return (
        <View style={[styles.containerImages, {width: width * 0.8}, {height: height * 0.2}, {marginTop:TopMargin, position: 'absolute'}]}>
            <Image source={Abajo} style={[styles.slides, {marginBottom: 40}]} resizeMode="contain"/>
        </View>
    )
}

const styles = StyleSheet.create({
    containerImages: {
        position: 'absolute',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    slides: {
        marginRight: -40,
    }
})
