import { StyleSheet, Text, View, TextInput, Image, useWindowDimensions, Modal, } from "react-native";
import React, { useState, useContext } from "react";
import { Button, Input, Icon } from "react-native-elements";
import * as Yup from "yup";
import { useFormik } from "formik";
import Perfil from "../../../../assets/image.png";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../../LoaderPass";
import { host } from "../../global";
import { AuthContext } from "../../AuthContext";
export default function ProfileForm(props) {
  const { name, lastname, username, grado, grupo } = props;
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const { removeToken } = useContext(AuthContext);
  const { removeId } = useContext(AuthContext);
  const { removeBitacora } = useContext(AuthContext);
  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const showHideRepeatPass = () => {
    setShowRepeatPass(!showRepeatPass);
  };
  const showHideNewPass = () => {
    setShowNewPass(!showNewPass);
  };
  const logout = async () => {
    // Borrar el token de autenticación almacenado en el dispositivo
    await removeToken();
    await removeId();
    await removeBitacora();

    // Navegar a la pantalla de inicio de sesión
    navigation.navigate("login");
  };
  
  const handleShowModal = () => {
    setShowModal(true);
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe ser de 8 caracteres"),
    newPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe ser de 8 caracteres"),
    repeatNewPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf([Yup.ref("newPassword")], "La contraseña no coincide")
      .min(8, "La contraseña debe ser de 8 caracteres"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema,
    validateOnChange: false, //Evita que valide cada cambio
    onSubmit: async (formValue) => {
      if ( formValue.password === formValue.newPassword ) {
        setShowModal(false);
        Toast.show({
          type: "error",
          text1: "Error",
          position: "bottom",
          text2: "La contraseña nueva no puede ser igual a la actual",
          visibilityTime: 4000,
        });
        return;
      }else {
        setIsLoading(true);
      console.log("pass ->", formValue.password);
      console.log("newPass ->", formValue.newPassword);
      console.warn("entro al submit");
      fetch(`${host}/api-gebit/auth/reset-password`, {

        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: formValue.password,
          newPass: formValue.newPassword,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok" + response);
          }

          return response.json();
        })
        .then((json) => {
          console.log("then json ")
          console.log("json -> ", json);
          if (json.status === 400) {
            Toast.show({
              type: "error",
              position: "bottom",
              text1: json.message,
            });
          } else if (json.status === 200) {
            logout();
            navigation.navigate("login", {params: {mensaje: "cambiarP"}});
          }

        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Ocurrio un error al actualizar la contraseña",
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    },
  });
  return (
    <View style={styles.container}>
      <Image
        source={Perfil}
        style={[styles.logo, { height: height * 0.2 }]}
        resizeMode="contain"
      />
      <Text editable={false} style={styles.title}>
        ¡Hola Bienvenido!
      </Text>
      <View style={styles.containerInfo}>
        <TextInput editable={false} style={styles.labels}>
          Nombre:
        </TextInput>
        <TextInput editable={false} style={[styles.info]}>
          {name}
        </TextInput>
      </View>
      <View style={styles.containerInfo}>
        <TextInput editable={false} style={styles.labels}>
          Apellido:
        </TextInput>
        <TextInput editable={false} style={[styles.info]}>
          {lastname}
        </TextInput>
      </View>
      <View style={styles.containerInfo}>
        <TextInput editable={false} style={styles.labels}>
          Correo:
        </TextInput>
        <TextInput editable={false} style={[styles.info]}>
          {username}
        </TextInput>
      </View>
      <View style={styles.containerInfo}>
        <TextInput editable={false} style={styles.labels}>
          Grupo:
        </TextInput>
        <TextInput editable={false} style={[styles.info]}>
          {grado}° {grupo}
        </TextInput>
      </View>
      <View style={styles.btns}>
        <Button
          title="Cerrar Sesión"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={logout}
        />
        <Button
          title="Cambiar Contraseña"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={handleShowModal}
        />
      </View>
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
          {isLoading && <Loader />}
        {!isLoading && (
          <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar contraseña</Text>
          <Input
            style={styles.modalInput}
            placeholder="Contraseña actual"
            onChangeText={(text) => formik.setFieldValue("password", text)}
            errorMessage={formik.errors.password}
            secureTextEntry={showPass ? false : true}
            rightIcon={
              <Icon
                type="material-community"
                name={showPass ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showHidePass}
              />
            }
          />
          <Input
            style={styles.modalInput}
            placeholder="Nueva contraseña"
            onChangeText={(text) => formik.setFieldValue("newPassword", text)}
            errorMessage={formik.errors.newPassword}
            secureTextEntry={showNewPass ? false : true}
            rightIcon={
              <Icon
                type="material-community"
                name={showNewPass ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showHideNewPass}
              />
            }
          />
          <Input
            style={styles.modalInput}
            placeholder="Confirmar nueva contraseña"
            onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
            errorMessage={formik.errors.repeatNewPassword}
            secureTextEntry={showRepeatPass ? false : true}
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPass ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress={showHideRepeatPass}
              />
            }
          />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Cancelar"
              onPress={() => setShowModal(false)}
              style={styles.modalButton}
              buttonStyle={{
                borderColor: "orange",
                borderWidth: 2,
                backgroundColor: "transparent",
              }}
              titleStyle={{ color: "orange" }}
            />
            <Button
              title="Cambiar"
              onPress={formik.handleSubmit}
              style={styles.modalButton}
              buttonStyle={{
                borderColor: "#009475",
                borderWidth: 2,
                backgroundColor: "#009475",
              }}
            />
          </View>
        </View>
        )}
          </View>
        </Modal>
    </View>
  );
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
  
  btns: {
    marginTop: 20,
    width: "48%",
    flexDirection: "row",
  },
  containerInfo: {
    alignSelf: "flex-start",
    paddingLeft: 20,
    marginLeft: "16%",
  },
  container: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#9500f9",
    marginBottom: 20,
  },
  labels: {
    width: 150,
    padding: 10,
    height: 40,
    fontSize: 26,
    fontWeight: "bold",
  },
  info: {
    padding: 10,
    height: 40,
    fontSize: 26,
    marginLeft: 10,
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
});
