// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SplashScreen from './src/screens/SplashScreen';
import Registration from './src/screens/Registration';
import Dashboard from './src/screens/Dashboard';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splashscreen" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;