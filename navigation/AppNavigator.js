import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../src/views/homescreen';
import History from '../src/views/history';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={History} />

      </Stack.Navigator>
  );
}