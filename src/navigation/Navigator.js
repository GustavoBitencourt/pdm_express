import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Preload from '../screens/Preload';
import ForgotPassWord from '../screens/ForgotPassword';
import ProductsList from '../screens/ProductsList';
import AddProductForm from '../screens/ProductsAdd';
import EditProductForm from '../screens/ProductsUpdate';
import {StatusBar} from 'react-native';
import {Icon, useTheme} from '@rneui/themed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="home-outline"
              color={theme.colors.blackGray}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductsList"
        component={ProductsList}
        options={{
          tabBarLabel: 'Listar Produtos',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="list-outline"
              color={theme.colors.blackGray}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProductForm}
        options={{
          tabBarLabel: 'Adicionar Produto',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="add"
              color={theme.colors.blackGray}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
    </Stack.Navigator>
  );
}

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primaryDark} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen name="EditProduct" component={EditProductForm} />
        <Stack.Screen name="AddProduct" component={AddProductForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
