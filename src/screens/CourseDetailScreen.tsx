import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CourseDetailScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backBtn}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>체육 이용권 상세 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backBtn: { fontSize: 22, fontWeight: "700", color: "#2e5c4d" },
  title: { fontSize: 22, fontWeight: "800", marginTop: 20 },
});