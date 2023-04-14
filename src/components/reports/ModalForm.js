import { StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CheckBox, Button } from 'react-native-elements';



export default function ModalForm(props) {
    const [opciones, setOpciones] = useState([]);
    const [comentariosExtra, setComentariosExtra] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const enviarFormulario = () => {

        console.log(`Opciones seleccionadas: ${opciones}`);
        console.log(`Comentarios: ${comentariosExtra}`)

        // Aquí puedes agregar el código para enviar los datos del formulario a tu servidor o hacer lo que necesites con ellos

        setOpciones([]);
        setComentariosExtra('');
    }

    const options = [
        {
            label: 'Cables desconectados',
            value: 1
        },
        {
            label: 'Pantalla dañada',
            value: 2
        },
        {
            label: 'Equipo prendido',
            value: 3
        },
        {
            label: 'Teclado/Ratón no funcionan',
            value: 4
        },
        {
            label: 'Entorno sucio',
            value: 5
        },
        {
            label: 'No inicia Windows',
            value: 6
        }
    ];

    return (
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
                        <Text style={styles.titulo}>Formulario de reportes</Text>
                        <View style={styles.opcionesContainer}>
                            <Text style={styles.label}>Seleccione sus Opciones:</Text>
                            {options.map((option, index) => (
                                <CheckBox
                                    key={index}
                                    title={option.label}
                                    checked={opciones.includes(option.value)}
                                    onPress={() => {
                                        const newOptions = [...opciones];
                                        if (opciones.includes(option.value)) {
                                            newOptions.splice(opciones.indexOf(option.value), 1);
                                        } else {
                                            newOptions.push(option.value);
                                        }
                                        setOpciones(newOptions);
                                    }}
                                    containerStyle={{ ...styles.opcionContainer, width: '90%' }}
                                    checkedColor="#6d09af"
                                />
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Agrega un comentario extra"
                            onChangeText={(valor) => setComentariosExtra(valor)}
                            value={comentariosExtra}
                        />
                        <Button title="Enviar" 
                        containerStyle={styles.btnContainer} buttonStyle={styles.btn} onPress={enviarFormulario} />
                        <Button title="Cerrar"
                        containerStyle={styles.btnContainer}buttonStyle={styles.btn} onPress={props.onCloseModal} />

                    </View>
                )}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
      modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      },
      modalButton: {
        width: "100%",
      },
      btnContainer: {
        marginTop: 20,
        width: "100%",
        height: 50,
      },
      btn: {
        borderRadius: 5,
        backgroundColor: "#009475",
        marginHorizontal: 10,
        width: "90%",
      },
})