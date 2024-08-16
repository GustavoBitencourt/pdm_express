import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProductsContext} from '../../context/ProductsProvider';
import {COLORS} from '../../assets/colors';

const EditProductForm = ({route, navigation}) => {
  const {productId} = route.params;
  const {products, updateProduct} = useContext(ProductsContext);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [urlDevice, setUrlDevice] = useState('');
  const [urlFoto, setUrlFoto] = useState('');

  useEffect(() => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setNome(product.Nome);
      setValor(product.Valor.toString());
      setUrlFoto(product.urlFoto);
    }
  }, [productId, products]);

  const handleUpdateProduct = async () => {
    if (nome === '' || valor === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await updateProduct(
        productId,
        nome,
        parseFloat(valor),
        urlDevice || urlFoto,
      );
      ToastAndroid.show('Produto atualizado com sucesso!', ToastAndroid.LONG);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  const buscaNaGaleria = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (!response.didCancel) {
        const path = response.assets[0]?.uri;
        setUrlDevice(path);
      }
    });
  };

  const tiraFoto = () => {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (!response.didCancel) {
        const path = response.assets[0]?.uri;
        setUrlDevice(path);
      }
    });
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
      <Text style={styles.label}>Imagem</Text>
      <View style={styles.imageContainer}>
        {urlFoto !== '' && (
          <Image source={{uri: urlFoto}} style={styles.imagePreview} />
        )}
        {urlDevice !== '' && (
          <Image source={{uri: urlDevice}} style={styles.imagePreview} />
        )}
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={buscaNaGaleria}>
            <Text style={styles.imageButtonText}>Buscar na Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={tiraFoto}>
            <Text style={styles.imageButtonText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color="#56BA50"
          title="Atualizar Produto"
          onPress={handleUpdateProduct}
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
    color: COLORS.blackGray,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: COLORS.blackGray,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  imageButtonsContainer: {
    flexDirection: 'column',
  },
  imageButton: {
    backgroundColor: COLORS.grey,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default EditProductForm;
