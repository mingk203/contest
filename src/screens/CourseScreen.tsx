import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function CourseScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* 상단 safe area */}
      <View style={{ height: insets.top, backgroundColor: "#2e5c4d" }} />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <Text style={styles.location}>📚 체육 이용권</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 본문 */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 제목 */}
        <Text style={styles.title}>체육 이용권 목록</Text>

        {/* 필터 */}
        <View style={styles.filterContainer}>
          {["전체", "헬스", "요가", "수영"].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filterButton, i === 0 && styles.activeFilter]}
            >
              <Text
                style={[
                  styles.filterText,
                  i === 0 && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 이용권 카드 리스트 */}
        <View style={styles.cardContainer}>
          {/* 예시 1 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CourseDetail", {
                course: {
                  name: "헬스 1개월 이용권",
                  tag: "#헬스 #운동",
                  place: "아산시 헬스센터",
                  desc: "전 연령 이용 가능 / 자유 이용권",
                  schedule: "운영시간: 06:00 ~ 22:00",
                },
              })
            }
          >
            <View style={styles.imageBox} />
            <View style={styles.textBox}>
              <Text style={styles.courseName}>헬스 1개월 이용권</Text>
              <Text style={styles.tag}>#헬스 #운동</Text>
              <Text style={styles.place}>아산시 헬스센터</Text>
            </View>
          </TouchableOpacity>

          {/* 예시 2 */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CourseDetail", {
                course: {
                  name: "요가 클래스",
                  tag: "#요가 #스트레칭",
                  place: "요가 스튜디오 리나",
                  desc: "매주 2회 / 힐링 스트레칭 요가",
                  schedule: "화·목 19:00",
                },
              })
            }
          >
            <View style={styles.imageBox} />
            <View style={styles.textBox}>
              <Text style={styles.courseName}>요가 클래스</Text>
              <Text style={styles.tag}>#요가 #스트레칭</Text>
              <Text style={styles.place}>요가 스튜디오 리나</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    height: 50,
    paddingHorizontal: 16,
  },
  backBtn: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  location: { color: "#fff", fontWeight: "600", fontSize: 16 },

  body: { flex: 1 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 20,
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginRight: 10,
  },
  filterText: { fontSize: 14, color: "#333" },
  activeFilter: { backgroundColor: "#2e5c4d", borderColor: "#2e5c4d" },
  activeFilterText: { color: "#fff" },

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
  courseName: { fontSize: 16, fontWeight: "700" },
  tag: { fontSize: 13, color: "#555", marginVertical: 2 },
  place: { fontSize: 13, color: "#777" },
});