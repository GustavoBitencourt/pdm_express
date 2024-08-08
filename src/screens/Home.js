import React from 'react';
import {View, StyleSheet} from 'react-native';
import MyButtom from '../components/MyButtom';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <MyButtom
        style={styles.button}
        onClick={() => navigation.navigate('AuthStack', {screen: 'SignIn'})}
        text="Ir para SignIn"
      />
      <MyButtom
        style={styles.button}
        onClick={() => navigation.navigate('ProductsList')}
        text="Listar Produtos"
      />
      <MyButtom
        style={styles.button}
        onClick={() => navigation.navigate('AddProduct')}
        text="Adicionar Produto"
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
    width: '80%',
    marginVertical: 10,
  },
});
