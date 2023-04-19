import { StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { CheckBox, Button } from 'react-native-elements';
import { host } from '../global';
import { AuthContext } from '../AuthContext';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ModalForm(props) {
    const [opciones, setOpciones] = useState([]);
    const [options, setOptions] = useState([]);
    const [comentariosExtra, setComentariosExtra] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const { token } = useContext(AuthContext);
    const idBitacora = props.id;
    const { id } = useContext(AuthContext);
    const enviarFormulario = () => {
        console.log(`Opciones seleccionadas: ${opciones}`);
        console.log(`Comentarios: ${comentariosExtra}`)

        fetchPost();

        setOpciones([]);
        setComentariosExtra('');
    }
    const mapOpcionesSeleccionadas = opciones => {
        return opciones.map(opcion => {
            return {
                id: opcion,
            }
        });
    }
    const fetchPost = async () => {
        try {
            console.log(mapOpcionesSeleccionadas(opciones))
            console.log("bitacora -> ", idBitacora)
            console.log("user -> ", id)

            const response = await fetch(`${host}/api-gebit/report/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    "description": comentariosExtra ? comentariosExtra : "Sin comentarios",
                    "status": 1,
                    "bitacora": {
                        "id": idBitacora
                    },
                    "user": {
                        "id": id
                    },
                    "reasons": mapOpcionesSeleccionadas(opciones)
                }),

            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            console.log("json -> ", json)
            setShowCommentInput(false);
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "Reporte enviado",
            });
            props.onCloseModal();
        } catch (error) {
            console.error("There was a problem with the request:", error);
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Algo salio mal",
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setShowCommentInput(false);
            setOpciones([]);
            console.log("token-> ", token)
            try {
                const response = await fetch(`${host}/api-gebit/reason/`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const json = await response.json();
                console.log("json -> ", json)
                const mappedOptions = json.data.map(item => ({ key: item.id, name: item.name }));
                setOptions(mappedOptions);
                setIsLoading(false);
            } catch (error) {
                console.error("There was a problem with the request:", error);
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Algo salio mal",
                });
            }
            console.log("data -> ", data)
        };


        fetchData();
    }, []);

    const changeVisibility = (opcionSeleccionada) => {
        if (opcionSeleccionada === "Otros") {
            setShowCommentInput(true);
        } else {
            setShowCommentInput(false);
        }
    }



    return (
        <Modal
            visible={props.showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => { props.onCloseModal }}
        >
            <KeyboardAwareScrollView
                style={{ flex: 1 }} // Asegúrate de que la vista ocupa todo el espacio disponible
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} // Centra el contenido verticalmente
                keyboardShouldPersistTaps="handled" // Evita que el teclado se oculte al tocar fuera de él
            >
                <View style={styles.modalContainer}>
                    {isLoading && <Loader />}
                    {!isLoading && (
                        <View style={styles.modalContent}>
                            <Text style={styles.titulo}>Formulario de reportes</Text>
                            <View style={styles.opcionesContainer}>
                                <Text style={styles.label}>Seleccione sus Opciones:</Text>
                                {options.map((option) => (
                                    <CheckBox
                                        key={option.key}
                                        title={option.name}
                                        checked={opciones.includes(option.key)}
                                        onPress={() => {

                                            const newOptions = [...opciones];
                                            if (opciones.includes(option.key)) {
                                                newOptions.splice(opciones.indexOf(option.key), 1);
                                            } else {
                                                newOptions.push(option.key);
                                            }
                                            setOpciones(newOptions);
                                            changeVisibility(option.name);
                                        }}
                                        containerStyle={{ ...styles.opcionContainer, width: '90%' }}
                                        checkedColor="#6d09af"
                                    />
                                ))}


                            </View>
                            {showCommentInput && (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Agrega un comentario extra"
                                    placeholderTextColor={"#969696"}
                                    onChangeText={(valor) => setComentariosExtra(valor)}
                                    value={comentariosExtra}
                                />
                            )}
                            <Button title="Enviar"
                                containerStyle={styles.btnContainer}
                                buttonStyle={styles.btn}
                                onPress={enviarFormulario}
                            />
                            <Button title="Cerrar"
                                containerStyle={styles.btnContainer}
                                buttonStyle={styles.btn}
                                onPress={props.onCloseModal}
                            />
                        </View>
                    )}

                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );

}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
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
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        width: "100%",
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "90%",
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