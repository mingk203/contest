import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, deleteDoc, getDoc , onSnapshot} from "firebase/firestore";
import { 
  collection, addDoc, serverTimestamp 
} from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore"; // v9 이상 사용법

export default function ClubDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
const route = useRoute();
const params: any = route.params;
const id = params?.id;   // 안전하게 꺼내기

const [club, setClub] = useState<any>(null);
const [isFavorite, setIsFavorite] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState<number | null>(null); // maxCapacity 상태 추가
  const [currentCapacity, setCurrentCapacity] = useState<number>(0); // 현재 정원 상태

const user = auth.currentUser;

// 🚨 params 검사는 여기서 하지 않는다 (Hook 위에서는 return 금지)
useEffect(() => {
  if (!id) return;

   const loadClub = async () => {
      const ref = doc(db, "crewPosts", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setClub({ id: snap.id, ...data });
        if (data?.maxCapacity) {
          setMaxCapacity(data.maxCapacity); // maxCapacity 값을 상태에 저장
        }
      }
    };

    loadClub();
  }, [id]);

useEffect(() => {
  if (!id || !user) return;

  const checkFavorite = async () => {
    const favRef = doc(db, "favorites", `${user.uid}_${id}`);
    const snap = await getDoc(favRef);
if (snap.exists()) {
  setIsFavorite(true);
}  };

  checkFavorite();
}, [id]);

  // 실시간으로 지원자 수 업데이트
  useEffect(() => {
    if (!id) return;

    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("crewId", "==", id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // 지원한 사람 수 계산
      const applicantCount = querySnapshot.size;
      setCurrentCapacity(applicantCount); // 현재 지원자 수 저장
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 실시간 리스너 제거
  }, [id]);

// ❗ early-return은 Hook 아래에서만 가능
if (!id) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>잘못된 접근</Text>
    </View>
  );
}

if (!club) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>불러오는 중...</Text>
    </View>
  );
}

  // 📌 3) 좋아요 토글
  const toggleFavorite = async () => {
  if (!user) {
    Alert.alert("로그인 필요", "찜 기능을 사용하려면 로그인하세요.");
    return;
  }

  const favRef = doc(db, "favorites", `${user.uid}_${id}`);
  const newState = !isFavorite;

  console.log("⭐ 찜 버튼 누름");
  console.log("⭐ user.uid:", user.uid);
  console.log("⭐ crew id:", id);
  console.log("⭐ 최종 문서ID:", `${user.uid}_${id}`);
  console.log("⭐ newState:", newState);

  setIsFavorite(newState);

  try {
    if (newState) {
      console.log("⭐ Firestore setDoc 실행 직전:", {
        uid: user.uid,
        id: club.id,
        name: club.name,
        desc: club.desc,
        location: club.location,
      });

      await setDoc(favRef, {
        uid: user.uid,
        id: club.id,
        name: club.name,
        desc: club.desc,
        location: club.location ?? "",
      });

      console.log("⭐ Firestore setDoc 성공!");
    } else {
      console.log("⭐ deleteDoc 실행:", `${user.uid}_${id}`);
      await deleteDoc(favRef);
      console.log("⭐ deleteDoc 성공!");
    }
  } catch (e) {
    console.log("🔥 Firestore 오류:", e);
    setIsFavorite(!newState);
  }
};

  const applyToClub = async () => {
  if (!user) {
    Alert.alert("로그인 필요", "지원하려면 로그인하세요.");
    return;
  }
  
    // 동호회 작성자가 지원하는 것을 방지
    if (user.uid === club.uid) {
      Alert.alert("지원 불가", "자신이 작성한 동호회에는 지원할 수 없습니다.");
      return;
    }


    try {
    // 1) 이미 지원한 동호회인지 확인
    const applicationsRef = collection(db, "applications"); // applications 컬렉션 참조
    const q = query(
      applicationsRef,
      where("crewId", "==", club.id), // 동호회 ID로 필터링
      where("applicantUid", "==", user.uid) // 사용자 ID로 필터링
    );

    // 2) 쿼리 실행
    const querySnapshot = await getDocs(q);

    // 이미 지원한 경우
    if (!querySnapshot.empty) {
      Alert.alert("이미 지원하셨습니다", "이 동호회에는 이미 지원하셨습니다.");
      return;
    }


  try {
    // 1) applications 컬렉션에 지원 정보 저장
    const applicationRef = await addDoc(collection(db, "applications"), {
      crewId: club.id,
      applicantUid: user.uid,
      applicantNickname: user.displayName ?? "익명",
      ownerUid: club.uid,              // 🔥 동호회 작성자 UID
      status: "pending",
      createdAt: serverTimestamp(),
    });

    // 2) notifications 컬렉션에 알림 생성
    await addDoc(collection(db, "notifications"), {
      toUid: club.uid,                 // 🔥 동호회 작성자에게 알림 보냄
      fromNickname: user.displayName ?? "익명",
      crewName: club.name,
      crewId: club.id,
      applicationId: applicationRef.id,
      read: false,
      createdAt: serverTimestamp(),
    });

    Alert.alert("지원 완료!", "지원이 성공적으로 접수되었습니다.");
    } catch (e) {
      console.log("🔥 지원 오류:", e);
    }
  } catch (e) {
    console.log("🔥 지원 확인 오류:", e);
  }
};

  return (
       <View style={styles.container}>

    {/* 📌 모달 영역 추가 — 여기에 넣으세요 */}
    {modalVisible && (
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>동호회 지원 하시겠습니까?</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={async () => {
                await applyToClub();
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalBtnText}>예</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>아니오</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
    {/* 📌 모달 끝 */}
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
        {/* 이미지 박스(임시) */}
        <View style={styles.photoBox}>
          <Text style={styles.photoText}>동호회 사진</Text>
        </View>

        {/* 기본 정보 */}
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
             {maxCapacity !== null && (
            <Text style={styles.detailItem}>
              최대 정원: {maxCapacity}명 / 현재 정원: {currentCapacity}명
            </Text>
          )}
        </View>

        {/* ❤️ 좋아요 버튼 */}
       <TouchableOpacity
  onPress={toggleFavorite}
  activeOpacity={0.8}
  style={{
    marginTop: 20,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#2e5c4d",
    backgroundColor: isFavorite ? "#2e5c4d" : "transparent",
  }}
>
  <Text
    style={{
      color: isFavorite ? "white" : "#2e5c4d",
      fontSize: 15,
      fontWeight: "700",
    }}
  >
    {isFavorite ? "찜됨 ❤️" : "찜하기 ♡"}
  </Text>
</TouchableOpacity>

        {/* 지원하기 버튼 */}
       <TouchableOpacity
  style={styles.applyButton}
  onPress={() => setModalVisible(true)}
>
  <Text style={styles.applyText}>지원하기</Text>
</TouchableOpacity>

      </ScrollView>
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
  position: "absolute",     // 🔥 화면 최상단으로 올림 (가장 중요)
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,                // 🔥 화면 전체 덮기
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,              // iOS용
  elevation: 999,           // Android용
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
