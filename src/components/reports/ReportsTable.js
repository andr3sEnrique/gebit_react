import { StyleSheet, Text, View, FlatList, Modal, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { host } from '../global';
import { Input } from "react-native-elements";
import { AuthContext } from '../AuthContext';
import Toast from "react-native-toast-message";
import { Button } from 'react-native-elements';
import ModalFormByUser from './ModalFormByUser';
export default function ReportsTable() {
  const { token } = useContext(AuthContext);
  const { id } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      console.log("token-> ", token)
      try {
        const response = await fetch(`${host}/api-gebit/report/user/${id}`, {
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
        setIsLoading(true);
        const json = await response.json();
        console.log("json -> ", json);
        setReportData(json.data);

      } catch (error) {
        console.error("There was a problem with the request:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salio mal",
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    fetchData();
  }, []);

  const tableHeader = (
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Fecha</Text>
      <Text style={styles.tableHeader}>Computadora</Text>
      <Text style={styles.tableHeader}>Ver Mas</Text>
    </View>
  );

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  const renderItem = ({ item }) => (

    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.cell}>{JSON.stringify(item.bitacora.created_at.substring(0, 10))}</Text>
        <Text style={styles.cell}>{JSON.stringify(item.bitacora.computer.description) + " " + JSON.stringify(item.bitacora.computer.id)}</Text>
        <Text style={styles.cell}>
          <Button
            title="Ver Más"
            type="outline"
            buttonStyle={styles.btnVerMas}
            onPress={() => handleShowModal(item)}
          />
            <ModalFormByUser showModal={showModal} selectedItem={selectedItem} onCloseModal={onCloseModal}/>
          
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reportData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={tableHeader}
        style={styles.container}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  table: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRow: {
    marginTop: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#9500f9'
  },
  tableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',


    flex: 1,
    marginRight: 5,
    color: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',

    marginRight: 5,
  },
  btnVerMas: {
    marginTop: 10,
    borderRadius: 5,
  },
  
})