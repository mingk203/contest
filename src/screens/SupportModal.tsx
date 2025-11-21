import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SupportModal() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.text}>동호회 지원 하시겠습니까?</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2e5c4d" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>예</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>아니오</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: "80%",
    backgroundColor: "#E7EFE9",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  text: { fontSize: 16, fontWeight: "600", marginBottom: 20 },
  buttons: { flexDirection: "row", gap: 12 },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});