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
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  align-self: flex-start;
  margin-bottom: 8px;
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
  margin-bottom: 30px;
`;

const RadioLabel = styled.Text`
  font-size: 15px;
  color: #444;
  margin-bottom: 8px;
`;

const RadioRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RadioButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 25px;
`;

const RadioCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #aaa;
  margin-right: 6px;
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

export default function Signup1({ navigation }: { navigation: any }) {
  return (
    <Container>
      <Logo source={{ uri: "https://via.placeholder.com/140x140" }} />
      <LogoText>크루핏</LogoText>
      <SubText>CREW.FIT 체육진흥공단 DATA</SubText>

      <Label>나이</Label>
      <Input placeholder="나이를 입력하세요" keyboardType="numeric" />

      <Label>키 / 몸무게</Label>
      <Row>
        <SmallInput placeholder="cm" keyboardType="numeric" />
        <Divider />
        <SmallInput placeholder="kg" keyboardType="numeric" />
      </Row>

      <RadioContainer>
        <RadioLabel>장애유무</RadioLabel>

        <RadioRow>
          <RadioButton>
            <RadioCircle />
            <RadioLabel>유</RadioLabel>
          </RadioButton>

          <RadioButton>
            <RadioCircle />
            <RadioLabel>무</RadioLabel>
          </RadioButton>
        </RadioRow>
      </RadioContainer>

      <Button onPress={() => navigation.navigate("Signup2")}>
        <ButtonText>다음</ButtonText>
      </Button>
    </Container>
  );
}
