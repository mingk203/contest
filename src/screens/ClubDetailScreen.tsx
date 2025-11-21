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
import { useNavigation } from "@react-navigation/native";   // ✅ 추가

export default function ClubDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // ✅ 뒤로가기 활성화
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* 상단 safearea */}
      <View style={{ height: insets.top, backgroundColor: "#2e5c4d" }} />

      {/* 헤더 */}
      <View style={styles.header}>

        {/* 🔥 뒤로가기 버튼 추가 */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.location}>📍 충청남도 아산시 신창면</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* 본문 */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 동호회 사진 */}
        <View style={styles.photoBox}>
          <Text style={styles.photoText}>동호회 사진</Text>
        </View>

        {/* 기본 정보 */}
        <View style={styles.infoBox}>
          <Text style={styles.clubName}>동호회 명</Text>
          <Text style={styles.clubTag}>#어떤 동호회</Text>
        </View>

        {/* 세부내용 제목 */}
        <Text style={styles.sectionTitle}>동호회세부내용</Text>

        {/* 세부내용 박스 */}
        <View style={styles.detailBox}>
          <Text style={styles.detailItem}>목표</Text>
          <Text style={styles.detailItem}>모집 크루 조건</Text>
          <Text style={styles.detailItem}>장소 및 일시</Text>
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
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
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

  /** 헤더 + 뒤로가기 버튼 */
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

  /** 사진 */
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

  /** 기본 정보 */
  infoBox: {
    marginTop: 15,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
  },
  clubName: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  clubTag: { color: "#666", fontSize: 13 },

  /** 세부 내용 */
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

  /** 지원하기 버튼 */
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

  /** 모달 */
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