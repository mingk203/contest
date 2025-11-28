import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/screens/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />   {/* Navigation.tsx 안에 NavigationContainer가 있음 */}
    </SafeAreaProvider>
  );
}