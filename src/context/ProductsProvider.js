import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';
import {ApiContext} from './ApiProvider';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

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
          urlFoto: d.fields.urlFoto?.stringValue || '',
        });
      });
      data.sort((a, b) => a.Nome.localeCompare(b.Nome));
      setProducts(data);
    } catch (response) {
      setError('Erro ao buscar produtos. Tente novamente mais tarde.');
      console.error('ProductsProvider, fetchProducts: ', response);
    }
  };

  const addProduct = async (nome, valor, urlDevice) => {
    try {
      let urlFoto = '';
      if (urlDevice) {
        urlFoto = await sendImageToStorage(urlDevice, nome);
        if (!urlFoto) {
          throw new Error('Failed to upload image');
        }
      }

      await api.post('/Produtos/', {
        fields: {
          Nome: {stringValue: nome},
          Valor: {doubleValue: valor},
          urlFoto: {stringValue: urlFoto},
        },
      });
      showToast('Produto adicionado com sucesso.');
      fetchProducts();
    } catch (response) {
      console.error('Error in addProduct:', response);
      throw new Error('Failed to add product');
    }
  };

  const updateProduct = async (id, nome, valor, urlDevice) => {
    try {
      let urlFoto = '';
      if (urlDevice) {
        urlFoto = await sendImageToStorage(urlDevice, nome);
        if (!urlFoto) {
          throw new Error('Failed to upload image');
        }
      }

      await api.patch(`/Produtos/${id}`, {
        fields: {
          Nome: {stringValue: nome},
          Valor: {doubleValue: valor},
          urlFoto: {stringValue: urlFoto},
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

  const sendImageToStorage = async (urlDevice, nomeProduto) => {
    try {
      let imageRedimensionada = await ImageResizer.createResizedImage(
        urlDevice,
        150,
        200,
        'PNG',
        80,
      );

      const pathToStorage = `images/produtos/${nomeProduto}/foto.png`;

      let url = '';
      const task = storage()
        .ref(pathToStorage)
        .putFile(imageRedimensionada.uri);
      task.on('state_changed', taskSnapshot => {});

      await task.then(async () => {
        url = await storage().ref(pathToStorage).getDownloadURL();
      });

      task.catch(e => {
        console.error('ProductsProvider, sendImageToStorage: ' + e);
        url = null;
      });

      return url;
    } catch (e) {
      console.error('ProductsProvider, sendImageToStorage: ' + e);
      return null;
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
