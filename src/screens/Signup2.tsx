import React, { useState } from "react";
import styled from "styled-components/native";
// Firebase 인증 관련 모듈 가져오기
import { auth } from '../firebaseConfig'; // ⭐ 1. 만든 설정 파일에서 auth 인스턴스 가져오기
import { createUserWithEmailAndPassword } from 'firebase/auth'; // ⭐ 2. 회원가입 함수 가져오기

/* ---------------- styled-components ---------------- */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  width: 100%; /* 너비를 100%로 변경하여 버튼이 입력 필드와 같게 만듦 */
  height: 44px;
  background-color: #4f7b6c;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

// 에러 메시지 스타일 추가
const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;


/* ---------------- component ---------------- */

export default function Signup2({ navigation }: { navigation: any }) {
  // ⭐ 3. 상태 관리 (닉네임, 이메일/아이디, 비밀번호, 에러)
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState(''); // Firebase Authentication은 이메일 형식의 아이디를 사용
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ⭐ 4. 회원가입 처리 함수
  const handleSignUp = async () => {
    setError('');

    if (!email || !password || !nickname) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    try {
      // Firebase Authentication 호출하여 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
      console.log("회원가입 성공, UID:", user.uid);
      
      // TODO: ⭐ Firestore에 닉네임과 Signup1에서 받은 신체 정보 등 사용자 프로필 저장 로직 추가 필요
      // 지금은 일단 Signup3으로 이동
      navigation.navigate("Signup3", {
        userId: user.uid,
        nickname: nickname,
      });

    } catch (firebaseError: any) {
      // Firebase 오류 코드에 따른 메시지 처리
      let errorMessage = "회원가입에 실패했습니다.";
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = '이미 사용 중인 이메일(아이디)입니다.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = '유효하지 않은 이메일 형식입니다.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = '비밀번호는 6자리 이상이어야 합니다.';
      }
      
      setError(errorMessage);
      console.error("Firebase Auth Error:", firebaseError.message);
    }
  };


  return (
    <Container>
      <Logo source={{ uri: "https://via.placeholder.com/140x140" }} />
      <LogoText>크루핏</LogoText>
      <SubText>CREW.FIT 체육진흥공단 DATA</SubText>

      <Label>닉네임</Label>
      <Input 
        placeholder="닉네임을 입력하세요" 
        value={nickname}
        onChangeText={setNickname}
      />

      <Label>아이디 (이메일)</Label> 
      <Input 
        placeholder="아이디를 입력하세요 (이메일 형식)" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Label>비밀번호</Label>
      <Input 
        placeholder="비밀번호를 입력하세요" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      
      {/* 에러 메시지 표시 */}
      {error ? <ErrorText>{error}</ErrorText> : null}

      {/* 버튼 클릭 시 handleSignUp 실행 */}
      <Button onPress={handleSignUp}> 
        <ButtonText>다음</ButtonText>
      </Button>
    </Container>
  );
}