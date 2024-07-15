import React, {useContext, useState} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {useTheme, Input, Text, Image} from '@rneui/themed';
import {COLORS} from '../../assets/colors';

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthUserContext);
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    backgroundTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5%',
      backgroundColor: `${COLORS.primary}`,
    },
    logoBackground: {
      padding: 20,
      alignItems: 'center',
    },
    divSuperior: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -10,
    },
    divInferior: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
    },
    textEsqueceuSenha: {
      fontSize: 15,
      color: `${COLORS.primaryDark}`,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    divOuHr: {
      width: '100%',
      height: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    divHr: {
      width: '30%',
      height: 1,
      borderBottomColor: theme.colors.grey4,
      borderBottomWidth: 2,
    },
    textOu: {
      marginLeft: 20,
      marginRight: 20,
      fontSize: 18,
      color: theme.colors.grey4,
    },
    divCadastrarSe: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    textNormal: {
      fontSize: 14,
      color: `${COLORS.primaryDark}`,
    },
    textCadastrarSe: {
      fontSize: 15,
      color: `${COLORS.primaryDark}`,
      marginLeft: 5,
      fontWeight: 'bold',
    },
    imageStyle: {
      width: 300,
      height: 300,
      marginBottom: 40,
      resizeMode: 'contain',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: 'center',
      color: `${COLORS.blackGray}`,
      marginTop: -20,
      fontWeight: 'bold',
    },
    inputStyle: {
      textAlign: 'center',
      borderColor: theme.colors.grey3,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    inputFocused: {
      borderColor: `${COLORS.primaryDark}`,
    },
  });

  const [focusedInput, setFocusedInput] = useState(null);

  const entrar = async () => {
    let msgError = '';
    if (email && password) {
      setLoading(true);
      msgError = await signIn(email, password);
      if (msgError === 'ok') {
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } else {
        setLoading(false);
        Alert.alert('Ops!', msgError);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundTop} />
      <ScrollView>
        <View style={styles.divSuperior}>
          <View style={styles.logoBackground}>
            <Image
              containerStyle={styles.imageStyle}
              style={styles.imageStyle}
              source={require('../../assets/images/logo.png')}
              accessibilityLabel="logo do app"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <Input
              placeholder=""
              keyboardType="email-address"
              returnKeyType="next"
              inputStyle={[
                styles.inputStyle,
                focusedInput === 'email' && styles.inputFocused,
              ]}
              onChangeText={t => setEmail(t)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              containerStyle={{paddingHorizontal: 0}}
              inputContainerStyle={{borderBottomWidth: 0}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <Input
              secureTextEntry
              placeholder=""
              keyboardType="default"
              returnKeyType="go"
              inputStyle={[
                styles.inputStyle,
                focusedInput === 'password' && styles.inputFocused,
              ]}
              onChangeText={t => setPassword(t)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              containerStyle={{paddingHorizontal: 0}}
              inputContainerStyle={{borderBottomWidth: 0}}
            />
          </View>
          <Text
            style={styles.textEsqueceuSenha}
            onPress={() => navigation.navigate('ForgotPassWord')}>
            Esqueceu sua senha?
          </Text>
          <MyButtom text="ENTRAR" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não possui uma conta?</Text>
            <Text
              style={styles.textCadastrarSe}
              onPress={() => navigation.navigate('SignUp')}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      <Loading visivel={loading} />
    </SafeAreaView>
  );
};
