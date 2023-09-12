import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';

const Tabs = createMaterialTopTabNavigator();

const AuthPage = () => {
  return (
    <Tabs.Navigator screenOptions={{tabBarStyle:{paddingTop:60}}}>
      <Tabs.Screen name="Signup" component={Register} />
      <Tabs.Screen name="login" component={Login} />
    </Tabs.Navigator>
  )
}

export default AuthPage