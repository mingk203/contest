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
      navigation.navigate("Club");   // ✅ "Home" → "Club" 로 수정
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

      {/* 로그인 폼 */}
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

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity>
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
    marginBottom: 20,
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
    marginTop: 10,
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