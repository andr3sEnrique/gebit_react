import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from "react-native";
import AppNavigation from './src/navigation/AppNavigation';
import Toast from "react-native-toast-message"
import { AuthProvider } from './src/components/AuthContext';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavigationContainer styles={styles.container}>
          <AppNavigation />
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
