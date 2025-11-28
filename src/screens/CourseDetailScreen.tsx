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
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CourseDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { course } = route.params; // ← 전달된 데이터 받기

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top, backgroundColor: "#2e5c4d" }} />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.location}>{course.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 본문 */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 이미지 박스 */}
        <View style={styles.photoBox}>
          <Text style={styles.photoText}>이용권 이미지</Text>
        </View>

        {/* 기본 정보 */}
        <View style={styles.infoBox}>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseTag}>{course.tag}</Text>
        </View>

        {/* 세부내용 */}
        <Text style={styles.sectionTitle}>이용권 상세정보</Text>

        <View style={styles.detailBox}>
          <Text style={styles.detailItem}>📍 장소: {course.place}</Text>
          <Text style={styles.detailItem}>📘 설명: {course.desc}</Text>
          <Text style={styles.detailItem}>⏰ 시간표: {course.schedule}</Text>
        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.applyText}>신청하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 모달 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>체육 이용권 신청할까요?</Text>

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
                  Alert.alert("신청 완료!", "제출되었습니다.");
                  setModalVisible(false);
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
    height: 50,
    paddingHorizontal: 16,
  },
  backBtn: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  location: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
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
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  courseName: { fontSize: 18, fontWeight: "700" },
  courseTag: { color: "#666", fontSize: 13 },

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
    gap: 15,
  },
  detailItem: { fontSize: 15, fontWeight: "600" },

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
  modalTitle: { fontSize: 15, fontWeight: "700", marginBottom: 20 },

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
  modalBtnText: { fontSize: 14, fontWeight: "600" },
});