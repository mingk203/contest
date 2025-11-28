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
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 16px;
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 44px;
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 15px;
  margin-right: 10px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #4f7b6c;
  padding: 10px 16px;
  border-radius: 10px;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
`;

const FakeTag = styled.View`
  background-color: #c8d9c4;
  padding: 8px 14px;
  border-radius: 20px;
  margin: 5px;
`;

const FakeTagText = styled.Text`
  color: #2f4f4f;
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.TouchableOpacity`
  width: 140px;
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

export default function Signup3({ navigation }: { navigation: any }) {
  return (
    <Container>
      <LogoText>크루핏</LogoText>
      <SubText>CREW.FIT{"\n"}체육진흥공단 DATA</SubText>

      <Label>자신을 표현할 수 있는 키워드를 입력해주세요!</Label>

      <InputRow>
        <Input placeholder="ex) 자신만만, 런린이" />
        <AddButton>
          <AddButtonText>추가</AddButtonText>
        </AddButton>
      </InputRow>

      {/* 임시 빈 태그 영역 (UI 유지용) */}
      <TagContainer>
        <FakeTag><FakeTagText>#활동적</FakeTagText></FakeTag>
        <FakeTag><FakeTagText>#초보환영</FakeTagText></FakeTag>
      </TagContainer>

      <Button onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}>
        <ButtonText>회원가입</ButtonText>
      </Button>
    </Container>
  );
}
