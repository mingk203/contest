import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ClubScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selected, setSelected] = useState<"club" | "course">("club"); // 선택 상태

  return (
    <View style={styles.container}>
      {/* 상단 상태바 영역 */}
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
        {/* 제목 */}
        <Text style={styles.title}>지역 동호회</Text>

        {/* =====================
            🔥 카테고리 버튼
        ====================== */}
        <View style={styles.categoryContainer}>
          {/* 지역 동호회 */}
          <TouchableOpacity
            style={[
              styles.categoryBtn,
              selected === "club" && styles.activeCategory,
            ]}
            onPress={() => {
              setSelected("club");
              navigation.navigate("Club");
            }}
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

          {/* 체육 이용권 */}
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

        {/* ======================
            🔥 동호회 카드 리스트
        ======================= */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ClubDetail", {
                club: {
                  name: "농구의 신",
                  tags: "#운동 #농구",
                  place: "아산시 실내체육관",
                },
              })
            }
          >
            <View style={styles.imageBox} />
            <View style={styles.textBox}>
              <Text style={styles.clubName}>농구의 신</Text>
              <Text style={styles.tag}>#운동 #농구</Text>
              <Text style={styles.place}>아산시 실내체육관</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ClubDetail", {
                club: {
                  name: "달리기 모임",
                  tags: "#러닝 #건강",
                  place: "신창면 운동장",
                },
              })
            }
          >
            <View style={styles.imageBox} />
            <View style={styles.textBox}>
              <Text style={styles.clubName}>달리기 모임</Text>
              <Text style={styles.tag}>#러닝 #건강</Text>
              <Text style={styles.place}>신창면 운동장</Text>
            </View>
          </TouchableOpacity>
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