import { StyleSheet, Text, View, FlatList, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'


export default function ReportsTable() {
    
    
    
    const data = [
      { id: 1, col1: 'dato 1', col2: 'dato 2', col3: 'dato 3', col4: 'dato 4'},
      { id: 2, col1: 'dato 1', col2: 'dato 2', col3: 'dato 3', col4: 'dato 4'},
      { id: 3, col1: 'dato 1', col2: 'dato 2', col3: 'dato 3', col4: 'dato 4' },
      //...
    ];
    const tableHeader = (
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Descripción</Text>
        <Text style={styles.tableHeader}>Status</Text>
        <Text style={styles.tableHeader}>Computadora</Text>
        <Text style={styles.tableHeader}>Razones</Text>
      </View>
    );
    const renderItem = ({ item }) => (
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>{item.col1}</Text>
          <Text style={styles.cell}>{item.col2}</Text>
          <Text style={styles.cell}>{item.col3}</Text>
          <Text style={styles.cell}>{item.col4}</Text>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
    
        <FlatList
        data={data}
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
  })