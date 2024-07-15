import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MyButtom = ({text, onClick}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onClick}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#56ba50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButtom;
