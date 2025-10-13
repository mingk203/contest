import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup1 from './src/Signup1'; // 기존 Signup1 컴포넌트
import Signup2 from './src/Signup2'; // 새로운 Signup2 컴포넌트 (추가할 페이지)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup1">
        <Stack.Screen name="Signup1" component={Signup1} options={{ title: '회원가입 1' }} />
        <Stack.Screen name="Signup2" component={Signup2} options={{ title: '회원가입 2' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
