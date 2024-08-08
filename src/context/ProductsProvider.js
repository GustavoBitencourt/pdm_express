import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const ProductsContext = createContext({});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsCollection = await firestore().collection('Produtos').get();
      const productsList = productsCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    } catch (e) {
      console.error('ProductsProvider, fetchProducts: ' + e);
      setError('Erro ao buscar produtos. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const addProduct = async (nome, valor) => {
    try {
      await firestore().collection('Produtos').add({
        Nome: nome,
        Valor: valor,
      });
      fetchProducts();
    } catch (e) {
      console.error('Error in addProduct:', e);
      throw new Error('Failed to add product');
    }
  };

  const updateProduct = async (id, nome, valor) => {
    try {
      await firestore().collection('Produtos').doc(id).update({
        Nome: nome,
        Valor: valor,
      });
      fetchProducts();
    } catch (e) {
      console.error('Error in updateProduct:', e);
      throw new Error('Failed to update product');
    }
  };

  const removeProduct = async id => {
    try {
      await firestore().collection('Produtos').doc(id).delete();
      fetchProducts();
    } catch (e) {
      console.error('Error in removeProduct:', e);
      throw new Error('Failed to remove product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        removeProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
