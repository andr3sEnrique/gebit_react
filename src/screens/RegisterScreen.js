import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Logo from '../../assets/logo.png'
import ImageArriba from '../components/account/Login/ImageArriba'
import ImageAbajo from '../components/account/Login/ImageAbajo'
import RegisterForm from '../components/account/register/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen() {
    const { height } = useWindowDimensions();
    return (
        <View style={styles.root}>
            <KeyboardAwareScrollView style={{marginTop:'20%'}}>
            <Image source={Logo} style={[styles.logo, { height: height * 0.1 }]} resizeMode="contain" />
            <RegisterForm />

        </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        borderColor: "#9500f9",
        borderWidth: 4,
        borderRadius: 10,
        padding: 20,
    },
    logo: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 20,
    },
})