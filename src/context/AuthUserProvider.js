import React, {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  /*
    Cache criptografado do usuário
  */
  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          pass,
        }),
      );
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  async function signIn(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      console.log('Usuário logado com sucesso');
      if (auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, pass);
      return 'ok'; //retorna avisando que fez o login
    } catch (e) {
      console.error('Erro ao tentar logar:', e); // Adicione este log para ver detalhes do erro
      return launchServerMessageErro(e); //retorna uma mensagem de erro
    }
  }

  //função utilitária
  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administradorss';
    }
  }
  return (
    <AuthUserContext.Provider value={{signIn, retrieveUserSession}}>
      {children}
    </AuthUserContext.Provider>
  );
};
