import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <NavigationContainer>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    </NavigationContainer>
  );
}