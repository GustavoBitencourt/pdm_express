import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyButtom from '../components/MyButtom';

export default function Home({navigation}) {
  console.log(navigation);

  return (
    <View style={styles.container}>
      <MyButtom
        style={styles.button}
        onClick={() => navigation.navigate('AuthStack', {screen: 'SignIn'})}
        text="Ir para SignIn"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
  },
});
