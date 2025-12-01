import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
// ... (styled-components 정의 부분은 기존 내용 그대로 유지)

/* --- 스타일 --- */
const Container = styled.View` flex: 1; justify-content: center; alignItems: center; background-color: #ffffff; padding: 0 30px; `;
const Logo = styled.Image` width: 140px; height: 140px; margin-bottom: 10px; `;
const LogoText = styled.Text` font-size: 18px; fontWeight: bold; color: #333333; text-align: center; `;
const SubText = styled.Text` font-size: 12px; color: #666666; text-align: center; margin-bottom: 40px; `;
const Label = styled.Text` font-size: 16px; fontWeight: bold; color: #000000; align-self: flex-start; margin-bottom: 8px; `;
const Input = styled.TextInput` width: 100%; height: 44px; border-width: 1px; border-color: #cccccc; border-radius: 10px; padding: 0 12px; font-size: 15px; margin-bottom: 16px; `;
const Row = styled.View` flexDirection: row; justifyContent: space-between; width: 100%; margin-bottom: 16px; `;
const SmallInput = styled.TextInput` flex: 1; height: 44px; border-width: 1px; border-color: #cccccc; border-radius: 10px; padding: 0 12px; font-size: 15px; `;
const Divider = styled.View` width: 10px; `;
const RadioContainer = styled.View` width: 100%; margin-bottom: 30px; `;
const RadioLabel = styled.Text` font-size: 15px; color: #444; margin-bottom: 8px; `;
const RadioRow = styled.View` flexDirection: row; alignItems: center; `;
const RadioButton = styled.TouchableOpacity` flex-direction: row; alignItems: center; margin-right: 25px; padding: 5px; `; // 터치 영역 확장
const RadioCircle = styled.View<{ selected: boolean }>` width: 20px; height: 20px; border-radius: 10px; border-width: 1px; border-color: #aaa; margin-right: 6px; background-color: ${(props) => (props.selected ? "#4f7b6c" : "transparent")}; `;
const RadioText = styled.Text` font-size: 15px; color: #333; `;
const Button = styled.TouchableOpacity` width: 140px; height: 44px; background-color: #4f7b6c; border-radius: 22px; justifyContent: center; alignItems: center; margin-top: 10px; `;
const ButtonText = styled.Text` color: white; font-size: 15px; font-weight: bold; `;
const LoginLink = styled.Text`
  color: #666;
  margin-top: 20px;
  font-size: 13px;
  text-decoration: underline;
`;
export default function Signup1({ navigation }: { navigation: any }) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hasDisability, setHasDisability] = useState<boolean | null>(null);

  const handleNext = () => {
    // 1. 빈 값 체크
    if (!age.trim() || !height.trim() || !weight.trim()) {
      Alert.alert("알림", "나이, 키, 몸무게를 모두 입력해주세요.");
      return;
    }
    // 2. 장애 유무 선택 체크
    if (hasDisability === null) {
      Alert.alert("알림", "장애 유무를 선택해주세요.");
      return;
    }

    // 3. 다음 화면으로 데이터 전달 (Signup2에서 physicalInfo 사용)
    navigation.navigate("Signup2", {
      physicalInfo: {
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        hasDisability: hasDisability,
      },
    });
  };

  return (
    // 키보드 내리기 기능 추가
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        {/* 로고와 텍스트 */}
        <Logo source={require("./크루.png")} />
        <LogoText>크루핏</LogoText>
        <SubText>CREW.FIT 체육진흥공단 DATA</SubText>

        <Label>나이</Label>
        <Input 
          placeholder="나이를 입력하세요" 
          keyboardType="numeric" 
          value={age}
          onChangeText={setAge}
          returnKeyType="next"
        />

        <Label>키 / 몸무게</Label>
        <Row>
          <SmallInput 
            placeholder="키 (cm)" 
            keyboardType="numeric" 
            value={height}
            onChangeText={setHeight}
          />
          <Divider />
          <SmallInput 
            placeholder="몸무게 (kg)" 
            keyboardType="numeric" 
            value={weight}
            onChangeText={setWeight}
          />
        </Row>

        <RadioContainer>
          <RadioLabel>장애유무</RadioLabel>
          <RadioRow>
            {/* TouchableOpacity 영역 확장 */}
            <RadioButton onPress={() => setHasDisability(true)} activeOpacity={0.7}>
              <RadioCircle selected={hasDisability === true} />
              <RadioText>유</RadioText>
            </RadioButton>

            <RadioButton onPress={() => setHasDisability(false)} activeOpacity={0.7}>
              <RadioCircle selected={hasDisability === false} />
              <RadioText>무</RadioText>
            </RadioButton>
          </RadioRow>
        </RadioContainer>

        <Button onPress={handleNext}>
          <ButtonText>다음</ButtonText>
        </Button>
        <LoginLink onPress={() => navigation.navigate("Login")}>
  로그인하러 가기
</LoginLink>
      </Container>
    </TouchableWithoutFeedback>
  );
}