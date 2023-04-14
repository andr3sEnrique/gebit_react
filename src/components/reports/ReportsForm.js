import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
export default function ReportsForm() {
  const [opciones, setOpciones] = useState([]);
  const [comentariosExtra, setComentariosExtra] = useState('');
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

  const enviarFormulario = () => {
    console.log(`Opciones seleccionadas: ${opciones}`);
    console.log(`Comentarios: ${comentariosExtra}`)

    // Aquí puedes agregar el código para enviar los datos del formulario a tu servidor o hacer lo que necesites con ellos

    setOpciones([]);
    setComentariosExtra('');
  }
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>AGREGAR REPORTE</Text>
      <Text style={styles.label}>Seleccione las opciones:</Text>
      <View style={styles.opcionesContainer}>
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
      <Text style={styles.label}>Comentarios extra:</Text>
      <TextInput
        style={styles.input}
        placeholder="Agrega un comentario extra"
        onChangeText={(valor) => setComentariosExtra(valor)}
        value={comentariosExtra}
      />
      <Button title="Enviar" containerStyle={styles.btnContainer} onPress={enviarFormulario} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  opcionesContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    alignItems: 'stretch',

  },
  label: {
    margin: 1,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,

  },
  opcionContainer: {
    backgroundColor: '#f2f2f2',
    margin: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
    height: 50,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "#009475",
  },
});