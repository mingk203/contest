import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Notifications() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!auth.currentUser) return;

      const uid = auth.currentUser.uid;
      console.log("🔥 현재 로그인 UID:", uid);

      const q = query(
        collection(db, "notifications"),
        where("toUid", "==", uid)
      );

      const snap = await getDocs(q);

      const list = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("📩 불러온 알림:", list);

      setNotifications(list);
    };

    loadNotifications();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
        알림 🔔
      </Text>

      {notifications.length === 0 ? (
        <Text style={{ color: "#666" }}>알림이 없습니다.</Text>
      ) : (
        notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: item.read ? "#e0e0e0" : "#f5f5f5",
            }}
            onPress={async () => {
              console.log("🔔 알림 클릭:", item.applicationId);

              // ✔ 읽음 처리 저장
              const ref = doc(db, "notifications", item.id);
              await updateDoc(ref, { read: true });

              // ✔ 앱 화면에서도 즉시 반영
              setNotifications((prev) =>
                prev.map((noti) =>
                  noti.id === item.id ? { ...noti, read: true } : noti
                )
              );

              // ✔ 상세 페이지로 이동
              navigation.navigate("ApplicationDetail", {
                applicationId: item.applicationId,
                crewId: item.crewId,
              });
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {item.fromNickname} 님이 지원했습니다
            </Text>
            <Text style={{ marginTop: 4 }}>크루: {item.crewName}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
