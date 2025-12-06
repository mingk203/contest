import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons"; // 아이콘 사용


export default function ApplicationDetail() {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const { applicationId } = route.params as any;

  const [application, setApplication] = useState<any>(null);

  // 🔥 지원서 로드
  useEffect(() => {
    const loadApplication = async () => {
      const ref = doc(db, "applications", applicationId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setApplication({ id: snap.id, ...snap.data() });
      }
    };
    loadApplication();
  }, []);

  // 🔥 Firestore에서 status 업데이트
  const updateStatus = async (newStatus: string) => {
  try {
    const ref = doc(db, "applications", applicationId);

    // 1) applications 상태 업데이트
    await updateDoc(ref, { status: newStatus });

    // 2) 지원자 UID 가져오기
    const applicantUid = application.applicantUid;

    // 3) 지원자에게 알림 보내기
    await addDoc(collection(db, "notifications"), {
      toUid: applicantUid,                 // 지원자에게 보내는 알림
      fromNickname: application.ownerUid,  // 크루장 UID (원하면 닉네임으로 교체 가능)
      crewId: application.crewId,
      crewName: application.crewName ?? "크루",
      status: newStatus,                   // accepted | rejected
      read: false,
      createdAt: serverTimestamp(),
    });

    // 4) 처리 완료 메시지
    Alert.alert(
      "처리 완료",
      newStatus === "accepted"
        ? "지원서를 수락했습니다."
        : "지원서를 거절했습니다."
    );

    // 5) 이전 화면으로 돌아가기
    navigation.goBack();

  } catch (e) {
    console.log("🔥 상태 업데이트 오류:", e);
  }
};

  if (!application) {
    return (
      <View style={styles.center}>
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>지원서 상세보기</Text>

      <View style={styles.box}>
        <Text style={styles.item}>지원자: {application.applicantNickname}</Text>
        <Text style={styles.item}>지원자 UID: {application.applicantUid}</Text>
        <Text style={styles.item}>크루 ID: {application.crewId}</Text>
        <Text style={styles.item}>현재 상태: {application.status}</Text>
      </View>

      {/* 수락 / 거절 버튼 */}
      <View style={{ flexDirection: "row", marginTop: 30, gap: 20 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2e6f42" }]}
          onPress={() => updateStatus("accepted")}
        >
          <Text style={styles.btnText}>수락</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#b33a3a" }]}
          onPress={() => updateStatus("rejected")}
        >
          <Text style={styles.btnText}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  box: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  item: { fontSize: 16, marginBottom: 10 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "700" },

  // 돌아가기 버튼 스타일
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#3f7361",
    padding: 10,
    borderRadius: 50,
  },
});