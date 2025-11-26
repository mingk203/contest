import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';  // 🔥 네가 만든 Navigation.tsx 임포트

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />  {/* 🔥 이게 핵심! */}
    </NavigationContainer>
  );
}
