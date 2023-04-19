import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Input, Icon, Button } from "react-native-elements";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ModalPicker from "./ModalPicker";
import Loader from "../../Loader";
import { host } from "../../global";
export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Selecciona tu grupo");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@utez\.edu\.mx$/;;
  const setData = (option) => {
    setSelectedValue(option);
  }
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  }
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellidos: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe ser de 8 caracteres"),
    repeatPassword: Yup.string()
      .required("contraseña obligatoria")
      .oneOf([Yup.ref("password")], "La contraseña no coincide")
      .min(8, "La contraseña debe ser de 8 caracteres"),
  });
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellidos: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    validateOnChange: false, //Evita que valide cada cambio
    onSubmit: async (formValue) => {
      console.warn("entro");
      console.log(formValue.nombre, formValue.apellidos, formValue.grupo, formValue.email, formValue.password, formValue.repeatPassword);
      if (emailRegex.test(formValue.email)) {
        if (selectedValue == "Selecciona tu grupo") {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Selecciona un grupo",
          });
        } else {
          setIsLoading(true);
          fetch(`${host}/api-gebit/student/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name : formValue.nombre,
          lastname : formValue.apellidos,
          status : true,
          group : {
            id : selectedValue.id,
          },
          user : {
            username : formValue.email,
            password : formValue.password,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok" + response);
          }
          
          return response.json();
        })
        .then((json) => {
          console.log("segundo then")
          console.log(json);
          console.log(json.status)
          console.log(json.error)
          console.log(json.message)
          if (json.status === 400) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: json.message,
            });
          } else if (json.status === 200) {
            navigation.navigate("login", {params: {mensaje: "registro",}});
          }
          
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Ocurrio un error al registrar el usuario",
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        }
      }else{
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: "El correo debe ser instucional",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    },
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const showHideRepeatPass = () => {
    setShowRepeatPass(!showRepeatPass);
  };
  const  onPressTouchable = () => {
    console.log(selectedValue.id) 
    changeModalVisibility(true)
  }
  
  return (
    <View>
      {isLoading && <Loader />}
      {!isLoading && (
        <View style={styles.viewContent}>
          <Input
        containerStyle={styles.input}
        placeholder="Nombre(s)"
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        errorMessage={formik.errors.nombre}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Apellidos"
        onChangeText={(text) => formik.setFieldValue("apellidos", text)}
        errorMessage={formik.errors.apellidos}
      />

      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
        onPress={onPressTouchable } style={styles.touchableOpacity}>
          <Text style={[styles.text, {color: selectedValue != "Selecciona tu grupo" ? 'black': 'gray'}]}>
          {selectedValue && selectedValue.id ? `${selectedValue.degree} ${selectedValue.letter} ` : 'Selecciona tu grupo'}
          </Text>
        </TouchableOpacity>
        <Modal transparent={true} animationType='fade' visible={isModalVisible}
         nRequestClose={()=>changeModalVisibility(false)}>
          <ModalPicker changeModalVisibility={changeModalVisibility} setData={setData}  />
        </Modal>

      </SafeAreaView>
        

      <Input
        containerStyle={styles.input}
        placeholder="Correo electronico"
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        containerStyle={styles.input}
        placeholder="Repetir contraseña"
        secureTextEntry={showRepeatPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideRepeatPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        //onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      <Button
        icon={<Icon name="arrow-left" type="font-awesome" size={20} color="white" iconStyle={styles.regresar} />}
        title="Regresar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={()=> navigation.navigate("login")}
      />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: 30,
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginTop: 15,
  },
  icon: {
    color: "#c1c1c1",
  },
  regresar: {
    marginRight: 10,
    
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#9500f9",
    borderRadius: 10,
  },
  container: {
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '95%',
    height: 5,
  },
  text: {
    fontSize: 20,
  },
  touchableOpacity: {
    paddingHorizontal: 0,
    height: 25,
  },
});
/* <Input
                containerStyle={styles.input}
                placeholder="Edad"
                keyboardType="numeric"
                onChangeText={(text) => formik.setFieldValue("edad", text)}
                errorMessage={formik.errors.edad}
                onBlur={formik.handleBlur("edad")}


                <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Selecciona tu grupo" value="0" />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
            />*/
