import 'react-native-gesture-handler';
import React from 'react';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './src/screens/Detail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Detalles" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
