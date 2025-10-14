import React, { useState } from "react";
import styled from "styled-components/native";
import { NavigationProp } from '@react-navigation/native';

// RootStackParamList 정의 (여기서는 예시로 'Signup2' 화면만 포함)
type RootStackParamList = {
  Signup1: undefined;
  Signup2: undefined;
};

// 해당 화면에서 사용할 네비게이션의 타입 정의
type Signup1NavigationProp = NavigationProp<RootStackParamList, 'Signup1'>;

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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const SmallInput = styled.TextInput`
  flex: 1;
  height: 44px;
  border-width: 1px;
  border-color: #cccccc;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 15px;
`;

const Divider = styled.View`
  width: 10px;
`;

const RadioContainer = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const RadioLabel = styled.Text`
  font-size: 15px;
  color: #888888;
  margin-bottom: 8px;
`;

const RadioRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
`;

const RadioCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #aaa;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const SelectedCircle = styled.View`
  width: 10px;
  height: 10px;
  background-color: #4f7b6c;
  border-radius: 5px;
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

interface Signup1Props {
  navigation: Signup1NavigationProp;
}

/* ---------------- component ---------------- */
export default function Signup1({ navigation }: Signup1Props) {
  const [disability, setDisability] = useState("무");

  // "다음" 버튼 클릭 시 Signup2로 이동
  const handleNext = () => {
    navigation.navigate("Signup2"); // 데이터 없이 페이지 이동만 수행
  };

  return (
    <Container>
      {/* 로고 영역 */}
      <Logo source={{ uri: "https://via.placeholder.com/140x140" }} />
      <LogoText>크루핏</LogoText>
      <SubText>CREW.FIT  체육진흥공단 DATA</SubText>

      {/* 나이 */}
      <Label>나이</Label>
      <Input placeholder="나이를 입력하세요" keyboardType="numeric" underlineColorAndroid="transparent" />

      {/* 키 / 몸무게 */}
      <Label>키/몸무게</Label>
      <Row>
        <SmallInput placeholder="cm" keyboardType="numeric" />
        <Divider />
        <SmallInput placeholder="kg" keyboardType="numeric" />
      </Row>

      {/* 장애유무 */}
      <RadioContainer>
        <RadioLabel>장애유무</RadioLabel>
        <RadioRow>
          <RadioButton onPress={() => setDisability("유")}>
            <RadioCircle>{disability === "유" && <SelectedCircle />}</RadioCircle>
            <RadioLabel>유</RadioLabel>
          </RadioButton>
          <RadioButton onPress={() => setDisability("무")}>
            <RadioCircle>{disability === "무" && <SelectedCircle />}</RadioCircle>
            <RadioLabel>무</RadioLabel>
          </RadioButton>
        </RadioRow>
      </RadioContainer>

      {/* 버튼 */}
      <Button onPress={handleNext}>
        <ButtonText>다음</ButtonText>
      </Button>
    </Container>
  );
}
