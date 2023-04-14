import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
    <ActivityIndicator size="large" color="#9500f9" />
  </View>
);

export default Loader;
