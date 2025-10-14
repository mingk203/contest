import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup1 from './src/Signup1';  // Signup1 컴포넌트
import Signup2 from './src/Signup2';  // Signup2 컴포넌트
import Login from './src/Login';      // 로그인 화면 컴포넌트 추가

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 로그인 화면 */}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // 로그인 화면에서 헤더 숨기기
        />

        {/* 회원가입 화면 */}
        <Stack.Screen 
          name="Signup1" 
          component={Signup1} 
          options={{ headerShown: false }} // 회원가입 화면에서 헤더 숨기기
        />

        <Stack.Screen 
          name="Signup2" 
          component={Signup2} 
          options={{ headerShown: false }} // 회원가입 화면에서 헤더 숨기기
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
