import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ButtonForm(props) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={props.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          style={[
            styles.container,
            styles[`container_${props.type}`],
            isPressed && styles.container_pressed,
          ]}
        >
          <Text
            style={[
              styles.text,
              styles[`text_${props.type}`],
              isPressed && styles.text_pressed,
            ]}
          >
            {props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container_PRIMARY: {
    backgroundColor: '#662d91',
  },
  container_TERTIARY: {},
  container_pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    height: 20,
  },
  text_TERTIARY: {
    color: 'gray',
  },
  text_pressed: {
    fontSize: 15,
  },
});
