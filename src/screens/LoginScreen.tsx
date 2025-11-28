// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (id.trim() && password.trim()) {
      // 🔥 기존: navigation.navigate("SelectCategory");
      navigation.navigate("MainTabs");  // ← 여기가 정답!
    } else {
      Alert.alert("아이디와 비밀번호를 입력하세요.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 로고 */}
      <Image
        source={require("./크루.png")}
        style={styles.logo}
      />

      {/* 로그인 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#999"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>

      {/* 회원가입 / 찾기 */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup1")}>
        <Text style={styles.link}>회원가입 / 비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  input: {
    width: "75%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    fontSize: 15,
  },
  loginBtn: {
    width: "75%",
    backgroundColor: "#006b5b",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 12,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#777",
    marginTop: 20,
    fontSize: 13,
  },
});