// CameraComponent.js
import Loader from '../Loader';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
export default function CameraComponent({ isVisible, onClose, onPictureTaken }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [codeData, setCodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        
        console.log("CODE ->", codeData); // Imprime el valor de codeData después de actualizarlos
        handleClose();
        navigation.navigate("index", { screen: "Reportes", params: { mensaje: "escaneado", id: idC } });

      }


    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
