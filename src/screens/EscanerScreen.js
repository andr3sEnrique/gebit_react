import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useContext, useEffect} from 'react'
import { Button } from 'react-native-elements'
import CameraComponent from '../components/Scanner/CameraComponent'
import HeaderComponent from '../components/Scanner/HeaderComponent'
import { AuthContext } from '../components/AuthContext';	
export default function EscanerScreen() {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [picture, setPicture] = useState(null);
  const { Bitacora } = useContext(AuthContext);
  const handleTakePicture = (data) => {
    setPicture(data.uri);
    setIsCameraVisible(false);
  };
  useEffect(() => {
    console.log("bitacora ->",Bitacora);
  }, []);


  const handleCloseCamera = () => {
    setIsCameraVisible(false);
  };
  const buttonMessage = Bitacora ? "Escanear Salida" : "Escanear Equipo de Computo";
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title={buttonMessage}
        onPress={() => setIsCameraVisible(true)}
      />
      <CameraComponent
        isVisible={isCameraVisible}
        onClose={handleCloseCamera}
        onPictureTaken={handleTakePicture}
      />
       
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  previewContainer: {
    marginTop: 20,
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 180,
    height: 180,
  },
  btn: {
    backgroundColor: '#9500f9',
    borderRadius: 5,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    marginTop: 20,
    width: "95%",
},
});

/* {picture && (
        <View style={styles.previewContainer}>
          <Image
            style={styles.previewImage}
            source={{ uri: picture }}
          />
        </View>
      )}*/