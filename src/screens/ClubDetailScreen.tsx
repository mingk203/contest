import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function ClubDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // 🔥 클릭한 동호회 데이터 받기
  const route = useRoute();
  const { club } = route.params as any;

  return (
    <View style={styles.container}>
      {/* 상단 safearea */}
      <View style={{ height: insets.top, backgroundColor: "#2e5c4d" }} />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.location}>📍 {club.location}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {/* 동호회 사진 */}
        <View style={styles.photoBox}>
          <Text style={styles.photoText}>동호회 사진</Text>
        </View>

        {/* 🔥 Firestore 기본 정보 */}
        <View style={styles.infoBox}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubTag}>{club.desc}</Text>
        </View>

        {/* 세부 내용 */}
        <Text style={styles.sectionTitle}>동호회 세부내용</Text>

        <View style={styles.detailBox}>
          <Text style={styles.detailItem}>목표: {club.goal}</Text>
          <Text style={styles.detailItem}>모집 조건: {club.condition}</Text>
          <Text style={styles.detailItem}>장소 및 일시: {club.schedule}</Text>
        </View>

        {/* 지원하기 버튼 */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.applyText}>지원하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 지원 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>동호회 지원 하시겠습니까?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setModalVisible(false);
                  Alert.alert("지원 완료!", "지원이 성공적으로 제출되었습니다.");
                }}
              >
                <Text style={styles.modalBtnText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#2e5c4d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
  },

  backBtn: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  location: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  photoBox: {
    backgroundColor: "#ddd",
    height: 140,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: { color: "#333", fontSize: 16, fontWeight: "700" },

  infoBox: {
    marginTop: 15,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
  },
  clubName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  clubTag: { color: "#666", fontSize: 13 },

  sectionTitle: {
    marginTop: 25,
    marginLeft: 22,
    fontSize: 16,
    fontWeight: "700",
  },

  detailBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    gap: 20,
  },
  detailItem: {
    fontSize: 15,
    fontWeight: "600",
  },

  applyButton: {
    backgroundColor: "#2e5c4d",
    marginHorizontal: 20,
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "75%",
    backgroundColor: "#c3d8cd",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },

  modalBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  modalBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
