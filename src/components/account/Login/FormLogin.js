import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { Input, Icon, Button } from "react-native-elements";
import * as Yup from "yup";
import ButtonForm from "./ButtonForm";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../../Loader";
import { host } from '../../global'
import { AuthContext } from "../../AuthContext";
import ModalForm from "./ModalForm";
export default function FormLogin() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const btnForgotPass = () => {
    setShowModal(true);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("Contraseña obligatoria")
        .min(8, "La contraseña debe ser mayor a 8 caracteres"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.warn("entro");
      login(formValue.email, formValue.password);
    },
  });
  const mensaje = "acceso";
  const {saveToken } = useContext(AuthContext);
  const { saveId } = useContext(AuthContext);

  const login = (email, password) => {
    setIsLoading(true);
    console.log("entro al lg");
    console.log(email, password);
    // ipUtez: 192.168.67.18
    //ip casa: 192.168.100.233
    try {
      fetch(`${host}/api-gebit/auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setText("");
          setText2("");
  
          return response.json();
        })
        .then((json) => {
          console.log("Entro al log")
          console.log(json);
          console.log("token-> ", json.token)
          console.log("user-> ", json.user.id)
          console.log("user2 ->", json.student.user.id)
          saveToken(json.token);
          saveId(JSON.stringify(json.user.id));
          const nombre = json.student.name;
          console.log("nombre ", nombre);
          navigation.navigate("index", {screen: "Perfil", params: {mensaje: "acceso", 
          name: json.student.name, lastname: json.student.lastname, 
          username: json.user.username ,id: json.student.id, token: json.token, 
          grado: json.student.group.degree, grupo: json.student.group.letter}});
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
          
            setIsLoading(false);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Usuario y/o contraseña incorrectos",
          });
        });
    } catch (error) {
      console.log("error-> ",error)
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Ocurrio un error",
      });
    }
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const btnRegister = () => {
    console.warn("entro");
    navigation.navigate("register");
  };
  useFocusEffect(
    useCallback(() => {
      formik.resetForm();
      setText("");
      setText2("");
    }, [])
  );
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        { width: width * 0.79 },
        { height: height * 0.2 },
      ]}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        <View>
          <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputs}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icons} />
        }
        onChangeText={(text) => {
          formik.setFieldValue("email", text);
          if (formik.values.email !== text) {
            setText(text);
          }
        }}
        value={text}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={styles.errors}>{formik.errors.email}</Text>
      )}
      <Input
        secureTextEntry={showPass ? false : true}
        placeholder="Contraseña"
        containerStyle={styles.inputs}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icons}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => {
          formik.setFieldValue("password", text);
          if (formik.values.password !== text) {
            setText2(text);
          }
        }}
        value={text2}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errors}>{formik.errors.password}</Text>
      )}
      <ButtonForm
        text="¿Haz olvidado tu contraseña?"
        onPress={btnForgotPass}
        type="TERTIARY"
      />
      <Button
        onPress={formik.handleSubmit}
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
      <ButtonForm
        text="Registrate aquí"
        onPress={btnRegister}
        type="TERTIARY"
      />
        </View>
      )}
      <ModalForm showModal={showModal} onCloseModal={onCloseModal}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  errors: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
  container: {
    marginTop: 15,
    justifyContent: "center",
    borderColor: "#f2f2f2",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    zIndex: 1,
  },
  inputs: {
    width: "100%",
    marginTop: 18,
  },
  icons: {
    color: "#c1c1c1",
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
