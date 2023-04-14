import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabIndexNavigation from './TabIndexNavigation';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='register' component={RegisterScreen} />
      <Stack.Screen name='index' component={TabIndexNavigation} />
    </Stack.Navigator>
  )
}

export default AppNavigation