import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup1 from './src/Signup1';  // Signup1 컴포넌트
import Signup2 from './src/Signup2';  // Signup2 컴포넌트

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup1">
        <Stack.Screen name="Signup1" component={Signup1} />
        <Stack.Screen name="Signup2" component={Signup2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
