// CameraComponent.js
import Loader from '../Loader';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/native";
import { host } from '../global'
import { AuthContext } from "../AuthContext";
import Toast from "react-native-toast-message";
export default function CameraComponent({ isVisible, onClose, onPictureTaken }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [codeData, setCodeData] = useState(null);
  const { token } = useContext(AuthContext);
  const { saveBitacora, Bitacora, removeBitacora } = useContext(AuthContext);
  const { id } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { saveComputer, computer} = useContext(AuthContext);
  let camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    setIsLoading(true);
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setPhoto(data.uri);
      setIsPreview(true);
      const result = await BarCodeScanner.scanFromURLAsync(data.uri);
      console.log(result);
      if (!result || !result[0]) {
        handleClose();
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ocurrio un error al escanear el QR",
          text2: "Por favor intente de nuevo",
        });

      } else {
        console.log("entro al else")
        setCodeData(result[0].data); // Actualiza codeData con el valor de result.data
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("Nuevo valor de codeData:", result.data);
        const idC = result[0].data;
        console.log("id ->", idC);
        const newId = JSON.parse(id);

        console.log("CODE ->", codeData); // Imprime el valor de codeData después de actualizarlos
        handleClose();
        if (Bitacora) {
          console.log("entro if fetch2")
          fetchData2(idC);
        } else {
          console.log("entro if fetch1")
          console.log("Bitacora ->" ,Bitacora)
        
          fetchData(idC, newId);
        }
        
        

      }


    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const fetchData = async (idC, newId) => {
    console.log("token-> ", token)
    try {
      const response = await fetch(`${host}/api-gebit/bitacora/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          "computer":{
            "id":idC
        },
        "user":{
            "id":newId
        }
        })

      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("json -> ", json)
      console.log("id->",json.data.id)
      console.log("idc->",idC)
      saveComputer(JSON.stringify(idC));
      saveBitacora(JSON.stringify(json.data.id));
      
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "QR escaneado correctamente",
        text2: "No olvides escanear el QR al salir del aula",
        setTimeout: 3000,
      })
    } catch (error) {
      console.error("There was a problem with the request:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Algo salio mal",
      });
    }
  };
  const remove = async ()=> {await removeBitacora();}

  const fetchData2 = async (idC) => {
    console.log("token-> ", token)
    console.log("bitacora -> ", Bitacora)
    console.log("idComputer -> ", computer)
    console.log("idC-> ",idC)
    const newIdC = JSON.parse(computer);
    const newId = JSON.parse(Bitacora);
    if ( newIdC === idC){
      try {
        const response = await fetch(`${host}/api-gebit/bitacora/end/${newId}`, {
          method: "PUT",
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
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Salida registrada correctamente",
          text2: "Recuerda reportar cualquier problema / inconveniente",
          setTimeout: 3000,
        })
        remove();
        navigation.navigate("index", { screen: "Reportes", params: { mensaje: "escaneado", id: newId} });
      } catch (error) {
        console.error("There was a problem with the request:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salio mal",
        });
      }
    }else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "La bitacora no coincide con el QR escaneado",
      });
    }
  };

  const handleClose = () => {
    console.log('Entro a handleClose')
    setPhoto(null);
    onClose();
  }
  const retakePicture = () => {
    setPhoto(null);
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  

  return (
    <View style={[styles.container, isVisible ? null : styles.hidden]}>
      {isLoading && <Loader />}
      {!isLoading && (
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={(ref) => {
            camera = ref;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={takePicture}
            >
              <Text style={styles.text}>Escanear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleClose}
            >
              <Text style={styles.text}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hidden: {
    display: 'none',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#68179f',
    width: 100,
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },

});
