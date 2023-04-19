import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements';
import { Loader } from '../Loader'

export default function ModalFormByUser(props) {
  console.log(props)
  
  console.log("item -> ", props.selectedItem)
  const [isLoading, setIsLoading] = useState(false);
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
              <Text style={styles.modalTitle}>Razones</Text>
              <Text style={styles.modalText}>{props.selectedItem.reasonString}</Text>
              <Text style={styles.modalTitle}>Comentarios Adicionales</Text>
              <Text style={styles.modalText}>{props.selectedItem.description}</Text>
              <View style={styles.modalButtonContainer}>
                <Text style={styles.modalTitle}>Hora de Entrada</Text>
                <Text style={styles.modalTitle}>Hora de Salida</Text>
              </View>
              <View style={styles.modalButtonContainer}>
                {props.selectedItem && props.selectedItem.bitacora && (
                  <>
                    <Text style={styles.modalText}>
                      {props.selectedItem.bitacora.created_at.substring(11, 19)}
                    </Text>
                    <Text style={styles.modalText}>
                      {props.selectedItem.bitacora.finish_at.substring(11, 19)}
                    </Text>
                  </>
                )}
              </View>
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