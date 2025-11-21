import React from "react";
import styled from "styled-components/native";

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
  width: 100px;
  height: 44px;
  background-color: #4f7b6c;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

/* ---------------- component ---------------- */

export default function Signup2({ navigation }: { navigation: any }) {
  return (
    <Container>
      <Logo source={{ uri: "https://via.placeholder.com/140x140" }} />
      <LogoText>크루핏</LogoText>
      <SubText>CREW.FIT 체육진흥공단 DATA</SubText>

      <Label>닉네임</Label>
      <Input placeholder="닉네임을 입력하세요" />

      <Label>아이디</Label>
      <Input placeholder="아이디를 입력하세요" />

      <Label>비밀번호</Label>
      <Input placeholder="비밀번호를 입력하세요" secureTextEntry />

      <Button onPress={() => navigation.navigate("Signup3")}>
        <ButtonText>다음</ButtonText>
      </Button>
    </Container>
  );
}
