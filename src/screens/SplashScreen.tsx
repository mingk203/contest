// src/screens/SplashScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // 1.5초 후 로그인 화면으로 이동
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image
        source={require("./크루.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>CREWFIT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e5c4d",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 2,
  },
});