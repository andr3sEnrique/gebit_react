import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [Bitacora, setBitacora] = useState('');
  const [computer, setComputer] = useState('');

  const saveToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
      setToken(value);
    } catch (e) {
      console.log("Error al guardar el token en AsyncStorage", e);
    }
  }
  const saveComputer = async (value) => {
    try {
      await AsyncStorage.setItem('computer', value);
      setComputer(value);
    } catch (e) {
      console.log("Error al guardar la compu en AsyncStorage", e);
    }
  }

  const saveBitacora = async (value) => {
    try {
      await AsyncStorage.setItem('bitacora', value);
      setBitacora(value);
    } catch (e) {
      console.log("Error al guardar la bitacora en AsyncStorage", e);
    }
  }

  const saveId = async (value) => {
    try {
      await AsyncStorage.setItem('id', value);
      setId(value);
    } catch (e) {
      console.log("Error al guardar el id en AsyncStorage", e);
    }
  }
 

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken('');
    } catch (e) {
      console.log("Error al remover el token de AsyncStorage", e);
    }
  }
  const removeComputer = async () => {
    try {
      await AsyncStorage.removeItem('computer');
      setComputer('');
    } catch (e) {
      console.log("Error al remover la compu de AsyncStorage", e);
    }
  }

  const removeBitacora = async () => {
    try {
      await AsyncStorage.removeItem('bitacora');
      setBitacora('');
    } catch (e) {
      console.log("Error al remover la bitacora de AsyncStorage", e);
    }
  }

  const removeId = async () => {
    try {
      await AsyncStorage.removeItem('id');
      setId('');
    } catch (e) {
      console.log("Error al remover el id de AsyncStorage", e);
    }
  }

  const authContext = {
    token,
    saveToken,
    removeToken,
    id,
    saveId,
    removeId,
    Bitacora,
    saveBitacora,
    removeBitacora,
    computer,
    saveComputer,
    removeComputer
  }
  

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}
