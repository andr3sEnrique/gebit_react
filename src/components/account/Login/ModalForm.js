import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from 'react-native-elements';
import { Loader } from '../../Loader'
import Toast from "react-native-toast-message";
import { host } from '../../global'

export default function ModalForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const handleSubmit = () => {
        console.log("email -> ", email)
        handleFetch()
    }
    const handleFetch = async () => {
        console.log("entro al fetch")
        try {
            const response = await fetch(`${host}/api-gebit/reset/forgot_password/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": email,
                }),
            });
            const json = await response.json();
            console.log("json -> ", json)
            if (json.status === 404) {
                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Correo Enviado",
                    text2: "Se ha enviado un correo para recuperar tu contraseña",
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                props.onCloseModal()
            } else {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error",
                    text2: "No se ha podido enviar el correo",
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            }
        } catch (error) {
            console.log("error -> ", error)
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error",
                text2: "No se ha podido enviar el correo",
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
    }

  return (
    <View style={styles.viewModal}>
        <Modal
        visible={props.showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => { props.onCloseModal }}
      >
        <View style={styles.modalContainer}>
            {isLoading && <Loader />}
            {!isLoading && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Recuperación de Contraseña</Text>
              <Input 
                placeholder="Correo Electrónico"
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon type="material-community" name="at" iconStyle={styles.iconRight} />
                }
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  title="Cancelar"
                  onPress={props.onCloseModal}
                  style={styles.modalButton}
                  buttonStyle={{
                    borderColor: "orange",
                    borderWidth: 2,
                    backgroundColor: "transparent",
                  }}
                  titleStyle={{ color: "orange" }}
                />
                <Button
                    title="Enviar"
                    onPress={handleSubmit}
                    style={styles.modalButton}
                    buttonStyle={{
                        borderColor: "orange",
                        borderWidth: 2,
                        backgroundColor: "orange",
                    }}
                    titleStyle={{ color: "white" }}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    viewModal: {
        flex: 1,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        maxHeight: "90%",
        justifyContent: "center",
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      modalInput: {
        padding: 10,
        marginVertical: 10,
    
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
      },
      modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      },
      modalButton: {
        width: "100%",
      },
})