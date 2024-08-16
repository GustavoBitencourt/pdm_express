import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';
import {ApiContext} from './ApiProvider';

export const ProductsContext = createContext({});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const {api} = useContext(ApiContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/Produtos');
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/gustavo-pdm/databases/(default)/documents/Produtos/',
        )[1];
        data.push({
          id: k,
          Nome: d.fields.Nome.stringValue,
          Valor: d.fields.Valor.doubleValue,
        });
      });
      data.sort((a, b) => a.Nome.localeCompare(b.Nome));
      setProducts(data);
    } catch (response) {
      setError('Erro ao buscar produtos. Tente novamente mais tarde.');
      console.error('ProductsProvider, fetchProducts: ', response);
    }
  };

  const addProduct = async (nome, valor) => {
    try {
      await api.post('/Produtos/', {
        fields: {
          Nome: {stringValue: nome},
          Valor: {doubleValue: valor},
        },
      });
      showToast('Produto adicionado com sucesso.');
      fetchProducts();
    } catch (response) {
      console.error('Error in addProduct:', response);
      throw new Error('Failed to add product');
    }
  };

  const updateProduct = async (id, nome, valor) => {
    try {
      await api.patch(`/Produtos/${id}`, {
        fields: {
          Nome: {stringValue: nome},
          Valor: {doubleValue: valor},
        },
      });
      showToast('Produto atualizado com sucesso.');
      fetchProducts();
    } catch (response) {
      console.error('Error in updateProduct:', response);
      throw new Error('Failed to update product');
    }
  };

  const removeProduct = async id => {
    try {
      await api.delete(`/Produtos/${id}`);
      showToast('Produto removido com sucesso.');
      fetchProducts();
    } catch (response) {
      console.error('Error in removeProduct:', response);
      throw new Error('Failed to remove product');
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        updateProduct,
        removeProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
