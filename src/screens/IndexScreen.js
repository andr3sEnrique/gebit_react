import { StyleSheet, Text, View, FlatList, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalForm from '../components/reports/ModalForm';
import ReportsTable from '../components/reports/ReportsTable'
import Toast from "react-native-toast-message";
import { Button, Icon } from 'react-native-elements';
export default function IndexScreen({ route }) {
  const [showModal, setShowModal] = useState(false);
  const mensaje = route.params?.mensaje;
  const id = route.params?.id;
  useEffect(() => {
    switch (mensaje) {
      case "escaneado":
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "QR escaneado correctamente",
        });
        break;
      default:
        break;
    }
  },[])
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addView}>
        <Button title='Añadir' iconRight={true} 
        icon={<Icon name="plus" type="font-awesome" size={20} color="white" iconStyle={styles.add}/> }
         containerStyle={styles.btnContainer} buttonStyle={styles.btn} onPress={()=>setShowModal(true)}  />
        <ModalForm showModal={showModal} onCloseModal={onCloseModal}  id={id}/>
      </View>
      <ReportsTable/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 20,
    width: "50%",
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "#009475",
    marginHorizontal: 10,
    width: "90%",
  },
  add: {
    marginLeft: 10,

  },
})