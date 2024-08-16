import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ProductsContext} from '../../context/ProductsProvider';

const AddProductForm = ({navigation}) => {
  const {addProduct} = useContext(ProductsContext);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNome('');
      setValor('');
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddProduct = async () => {
    try {
      await addProduct(nome, valor);
      setNome('');
      setValor('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={text => {
          if (!isNaN(text)) {
            setValor(text);
          }
        }}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button
          color="#56BA50"
          title="Adicionar Produto"
          onPress={handleAddProduct}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: `${COLORS.blackGray}`,
  },
  input: {
    borderWidth: 1,
    borderColor: `${COLORS.green}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: `${COLORS.blackGray}`,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AddProductForm;
