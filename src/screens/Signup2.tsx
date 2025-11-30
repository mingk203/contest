import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Text } from "react-native"; // Text 임포트
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔥 로컬 저장소 추가

import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; // 'firebase/auth/react-native' 대신 'firebase/auth' 사용
import { doc, setDoc } from "firebase/firestore";

/* --- 스타일 --- */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  alignItems: center;
  background-color: #ffffff;
  padding: 0 30px;
`;
const Logo = styled.Image`
  width: 140px;
  height: 140px;
  margin-bottom: 10px;
`;
const LogoText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: center;
`;
const SubText = styled.Text`
  font-size: 12px;
  color: #666666;
  text-align: center;
  margin-bottom: 40px;
`;
const Label = styled.Text`
  font-size: 15px;
  color: #888888;
  align-self: flex-start;
  margin-bottom: 6px;
`;
const Input = styled.TextInput`
  width: 100%;
  height: 44px;
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 15px;
  margin-bottom: 16px;
`;
const Button = styled.TouchableOpacity`
  width: 100%; 
  height: 44px;
  background-color: #4f7b6c;
  border-radius: 22px;
  justify-content: center;
  alignItems: center;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;
const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;

// Signup1에서 넘어온 데이터 타입 정의 (TypeScript용)
interface PhysicalInfo {
  age: number;
  height: number;
  weight: number;
  hasDisability: boolean;
}

export default function Signup2({ navigation, route }: { navigation: any; route: any }) {
  // Signup1에서 넘어온 데이터 받기
  const { physicalInfo } = route.params as { physicalInfo: PhysicalInfo } || {
    physicalInfo: { age: 0, height: 0, weight: 0, hasDisability: false }
  };
  
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");

    if (!email.trim() || !password.trim() || !nickname.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      // 1. Firebase Auth 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. 🔥 Firestore 문서 생성 (setDoc 사용)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        nickname: nickname,
        age: physicalInfo.age,
        height: physicalInfo.height,
        weight: physicalInfo.weight,
        hasDisability: physicalInfo.hasDisability,
        createdAt: new Date().toISOString(),
        tags: [], // Signup3에서 업데이트될 예정
      });
      
      // 3. 🔥 로컬 저장소에 닉네임 저장 (마이페이지 연동용 - DB 없이도 닉네임 표시)
      await AsyncStorage.setItem("userNickname", nickname);
      
      console.log("회원가입 및 프로필 저장 성공, UID:", user.uid);

      // 4. Signup3로 이동 (userId 전달)
      navigation.navigate("Signup3", { userId: user.uid });

    } catch (firebaseError: any) {
      let errorMessage = "회원가입 실패";
      if (firebaseError.code === "auth/email-already-in-use")
        errorMessage = "이미 사용 중인 이메일입니다.";
      else if (firebaseError.code === "auth/invalid-email")
        errorMessage = "이메일 형식이 올바르지 않습니다.";
      else if (firebaseError.code === "auth/weak-password")
        errorMessage = "비밀번호가 너무 약합니다.";
      else 
        errorMessage = `[오류]: ${firebaseError.code || firebaseError.message}`;

      setError(errorMessage);
      console.error("Firebase Auth Error:", firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        {/* 임시 이미지 사용 */}
        <Logo source={{ uri: "https://placehold.co/140x140/3f7361/ffffff?text=CREW" }} resizeMode="contain" />
        <LogoText>크루핏</LogoText>
        <SubText>CREW.FIT 체육진흥공단 DATA</SubText>

        <Label>닉네임</Label>
        <Input
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChangeText={setNickname}
          editable={!loading}
        />

        <Label>아이디 (이메일)</Label>
        <Input
          placeholder="아이디를 입력하세요 (이메일 형식)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <Label>비밀번호</Label>
        <Input
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {error !== "" && <ErrorText>{error}</ErrorText>}

        <Button onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <ButtonText>다음</ButtonText>
          )}
        </Button>
      </Container>
    </TouchableWithoutFeedback>
  );
}