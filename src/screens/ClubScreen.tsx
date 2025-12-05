import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ClubScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selected, setSelected] = useState<"club" | "course">("club");
  const [clubs, setClubs] = useState<any[]>([]); // 🔥 Firestore에서 불러온 데이터 저장

  // 🔥 Firestore에서 crewPosts 가져오기
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "crewPosts"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClubs(list);
      } catch (error) {
        console.log("❌ Firestore 불러오기 실패:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <View style={styles.container}>
      {/* 상단 상태바 */}
      <View style={{ height: insets.top, backgroundColor: "#2e5c4d" }} />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.location}>📍 충청남도 아산시 신창면</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 본문 */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>지역 동호회</Text>

        {/* 카테고리 버튼 */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.categoryBtn,
              selected === "club" && styles.activeCategory,
            ]}
            onPress={() => setSelected("club")}
          >
            <Text
              style={[
                styles.categoryText,
                selected === "club" && styles.activeCategoryText,
              ]}
            >
              지역 동호회
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryBtn,
              selected === "course" && styles.activeCategory,
            ]}
            onPress={() => {
              setSelected("course");
              navigation.navigate("Course");
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selected === "course" && styles.activeCategoryText,
              ]}
            >
              체육 이용권
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 Firestore에서 가져온 동호회 카드들 */}
        <View style={styles.cardContainer}>
          {clubs.map((club) => (
            <TouchableOpacity
              key={club.id}
              style={styles.card}
             onPress={() =>
  navigation.navigate("ClubDetail", { id: club.id })
}

            >
              <View style={styles.imageBox} />
              <View style={styles.textBox}>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.tag}>{club.desc}</Text>
                <Text style={styles.place}>{club.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
/* ============================
    🎨 스타일
============================ */
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
  location: { color: "#fff", fontWeight: "600" },

  body: { flex: 1 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 20,
  },

  /* 🔥 카테고리 버튼 */
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  activeCategory: {
    backgroundColor: "#2e5c4d",
    borderColor: "#2e5c4d",
  },
  activeCategoryText: {
    color: "#fff",
  },

  /* 카드 */
  cardContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  imageBox: {
    width: 60,
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginRight: 12,
  },
  textBox: { flex: 1 },
  clubName: { fontSize: 16, fontWeight: "700" },
  tag: { fontSize: 13, color: "#555", marginVertical: 2 },
  place: { fontSize: 13, color: "#777" },
});