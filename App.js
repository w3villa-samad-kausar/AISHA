
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ImageFetcher from './src/screens/ImageGenerator';
import ChatBotScreen from './src/screens/ChatBotScreen';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Image Generator" component={ImageFetcher}  />
        <Stack.Screen name='Chat Bot' component={ChatBotScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;