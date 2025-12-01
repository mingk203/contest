import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig"; //로그인한 유저 아이디 가져오기


/* ─────────────────────────────────────────────── */
/* 전체 컨테이너 */
const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 120,
  },
  keyboardShouldPersistTaps: "handled",
})`
  flex: 1;
  background-color: #ffffff;
`;
/* 상단 지역 헤더 */
const TopHeader = styled.View`
  width: 100%;
  background-color: #3f7361;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
`;

const LocationText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin-left: 8px;
`;

/* 타이틀 */
const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 20px 12px 20px;
  color: #2e5c4d;
`;

/* 카드 박스 */
const Card = styled.View`
  margin: 0 20px 20px 20px;
  padding: 18px 15px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  elevation: 2;
`;

/* 입력 타이틀 */
const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

/* 기본 입력창 */
const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  margin-bottom: 15px;
`;

/* 사진 업로드 박스 */
const PhotoBox = styled.TouchableOpacity`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-color: #efefef;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

/* 버튼 */
const UploadButton = styled.TouchableOpacity`
  background-color: #4f7b6c;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin: 20px 40px 40px 40px;
`;

const UploadText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

/* ─────────────────────────────────────────────── */
/* 메인 컴포넌트 */

const CreatePost = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [goal, setGoal] = useState("");
  const [condition, setCondition] = useState("");
  const [schedule, setSchedule] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // 사진 기능 추후 연결

  // const [location] = useState("충남 아산 신창면"); // 지금은 고정값
const location = "충남 아산 신창면";

  const handleUpload = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("로그인이 필요합니다.");
        return;
      }

      // 🔥 필수 입력값 체크
      if (!name.trim() || !desc.trim() || !goal.trim() || !condition.trim() || !schedule.trim()) {
        Alert.alert("모든 항목을 입력해주세요.");
        return;
      }

      const newPost = {
        name,
        desc,
        location,
        goal,
        condition,
        schedule,
        imageUrl,
        uid: user.uid,               // 🔥 현재 로그인된 사용자 UID
        createdAt: Timestamp.now(),  // Firestore 서버 시간
      };

      await addDoc(collection(db, "crewPosts"), newPost);

      Alert.alert("✅ 모집글이 성공적으로 등록되었습니다!");
      navigation.navigate("Club"); // 기존 AllCrewsList는 없어서 안전하게 Club로 이동
    } catch (error) {
      console.error("❌ Firestore 저장 실패:", error);
      Alert.alert("❌ 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container onStartShouldSetResponder={() => true}>
      {/* 상단 지역 헤더 */}
      <TopHeader>
        <Icon name="location-sharp" size={20} color="#fff" />
        <LocationText>{location}</LocationText>
      </TopHeader>

      {/* 동호회 사진 */}
      <SectionTitle>동호회 사진</SectionTitle>
      <Card>
        <PhotoBox onPress={() => Alert.alert("📷 사진 추가 기능은 추후 연결 예정")}>
          <Icon name="add" size={40} color="#888" />
        </PhotoBox>
      </Card>

      {/* 기본 정보 */}
      <SectionTitle>동호회 기본정보</SectionTitle>
      <Card>
        <Label>동호회 명</Label>
        <Input placeholder="예) 러닝크루 MZ" value={name} onChangeText={setName} />

        <Label>해시태그 / 종류</Label>
        <Input placeholder="#러닝 #운동 #친목" value={desc} onChangeText={setDesc} />
      </Card>

      {/* 세부 내용 */}
      <SectionTitle>동호회 세부 내용</SectionTitle>
      <Card>
        <Label>목표</Label>
        <Input placeholder="예) 주 2회 러닝" value={goal} onChangeText={setGoal} />

        <Label>모집 조건</Label>
        <Input placeholder="예) 초보 가능, 운동 좋아하는 분" value={condition} onChangeText={setCondition} />

        <Label>장소 및 일시</Label>
        <Input placeholder="예) 신창역 1번 출구 / 매주 수·토" value={schedule} onChangeText={setSchedule} />
      </Card>

      {/* 업로드 버튼 */}
      <UploadButton onPress={handleUpload}>
        <UploadText>모집글 등록하기</UploadText>
      </UploadButton>
    </Container>
  );
};

export default CreatePost;