import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Preload from '../screens/Preload';
import ForgotPassWord from '../screens/ForgotPassword';
import {StatusBar, TouchableOpacity, Text, View} from 'react-native';
import {Icon, useTheme} from '@rneui/themed';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function AppStack({navigation}) {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Login',
          tabBarButton: () => (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() =>
                navigation.navigate('AuthStack', {screen: 'SignIn'})
              }>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Icon
                  type="ionicon"
                  name="log-in-outline"
                  color={
                    theme.mode === 'light'
                      ? theme.colors.blackGray
                      : theme.colors.black
                  }
                  size={20}
                />
                <Text style={{color: COLORS.blackGray}}>Login</Text>
              </View>
            </TouchableOpacity>
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
      <Stack.Screen component={SignUp} name="SignUp" />
      <Stack.Screen component={ForgotPassWord} name="ForgotPassWord" />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
