import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {ProductsContext} from '../../context/ProductsProvider';
import Loading from '../../components/Loading';
import {COLORS} from '../../assets/colors';
import {Icon} from '@rneui/themed';

const windowWidth = Dimensions.get('window').width;

const ProductsList = ({navigation}) => {
  const {products, loading, error, removeProduct} = useContext(ProductsContext);

  const handleRemoveProduct = async id => {
    try {
      await removeProduct(id);
      Alert.alert('Produto removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o produto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Loading visivel={true} />
      ) : error ? (
        <Text>{error}</Text>
      ) : products && products.length > 0 ? (
        <View style={styles.productsContainer}>
          {products.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Text style={styles.productName}>{product.Nome}</Text>
              <Text style={styles.productPrice}>R$ {product.Valor}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProduct', {productId: product.id})
                  }>
                  <Icon name="pencil" type="ionicon" color="blue" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRemoveProduct(product.id)}>
                  <Icon name="trash" type="ionicon" color="red" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text>Nenhum produto encontrado.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productContainer: {
    width: windowWidth / 2 - 30,
    backgroundColor: `${COLORS.white}`,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: `${COLORS.gray300}`,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: `${COLORS.primaryDark}`,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: `${COLORS.blackGray}`,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default ProductsList;
