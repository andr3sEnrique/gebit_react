import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import Toast from "react-native-toast-message";
export default function ModalPicker(props) {
  const [data, setData] = useState([]);
  const [modalHeight, setModalHeight] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  useLayoutEffect(() => {
    let height = 0;
    data.forEach((item) => {
      height += 50; // Altura estimada de cada opción (ajustar según el diseño)
    });
    setModalHeight(height);
  }, [data]);

  useEffect(() => {
    fetch("http://192.168.100.233:8080/api-gebit/group/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        const sortedData = json.data.sort((a, b) => {
          if (a.degree === b.degree) {
            return a.letter.localeCompare(b.letter);
          }
          return a.degree - b.degree;
        });
        setData(sortedData);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Algo salio mal",
        });
      });
  }, []);
  

  
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
    
  }
  const option = data.map((item, index) => {
    return (
        <TouchableOpacity style={styles.option} key={index}
        onPress={()=>onPressItem(item)}>
            <Text style={styles.text}>{item.degree} {item.letter}</Text>

        </TouchableOpacity>
    )
  });   
  return (
    <TouchableOpacity onPress={() => props.changeModalVisibility(false)} style={styles.container}>
        <View style={[styles.modal, { width: width - 20, height: modalHeight }]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal:{
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderColor: '#9500f9',
        borderWidth: 2,
    },
    option:{
        alignItems: 'flex-start',
    },
    text:{
        fontSize: 20,
        margin: 10,
        color: 'black'
    },
})