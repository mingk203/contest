import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SelectCategoryScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>원하는 메뉴를 선택하세요</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Club")}
      >
        <Text style={styles.btnText}>📣 지역 동호회</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Course")}
      >
        <Text style={styles.btnText}>🏋️ 체육 이용권</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 40,
    color: "#2e5c4d",
  },
  btn: {
    backgroundColor: "#2e5c4d",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "80%",
    marginBottom: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});