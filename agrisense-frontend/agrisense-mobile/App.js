import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens from your src folder
import LoginScreen from './src/screens/LoginScreen'; 
import DashboardScreen from './src/screens/DashBoardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'AgriSense Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}