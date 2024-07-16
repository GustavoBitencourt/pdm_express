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
      const currentUser = auth().currentUser;

      if (currentUser && !currentUser.emailVerified) {
        await currentUser.sendEmailVerification();
        return 'Você deve validar seu email para continuar. Um email de verificação foi enviado.';
      }

      await storeUserSession(email, pass);

      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  const signUp = async (email, pass) => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      let userF = auth().currentUser;
      await userF.sendEmailVerification();
      return 'ok';
    } catch (e) {
      console.error('AuthUserProvider, signUp: ' + e);
      switch (e.code) {
        case 'auth/email-already-in-use':
          return 'Email já está em uso.';
        case 'auth/operation-not-allowed':
          return 'Problema em cadastrar o usuário.';
        case 'auth/invalid-email':
          return 'Email inválido.';
        case 'auth/weak-password':
          return 'Senha fraca, por favor utilizar uma senha forte.';
        default:
          return 'Erro desconhecido. Contate o administrador';
      }
    }
  };

  async function forgotPass(email) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  // função utilitária
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
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthUserContext.Provider
      value={{signIn, retrieveUserSession, forgotPass, signUp}}>
      {children}
    </AuthUserContext.Provider>
  );
};
