import React, { Component } from 'react';
import styled from 'styled-components/native';

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
  margin-bottom: 20px;
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
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const SubText = styled.Text`
  font-size: 12px;
  color: #666666;
  text-align: center;
  margin-top: 20px;
`;

/* ---------------- component ---------------- */
class Login extends Component {
  render() {
    return (
      <Container>
        {/* 로고 텍스트 */}
        <LogoText>크루핏</LogoText>

        {/* 아이디 입력 */}
        <Label>아이디</Label>
        <Input placeholder="아이디를 입력하세요" />

        {/* 비밀번호 입력 */}
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호를 입력하세요" secureTextEntry />

        {/* 로그인 버튼 */}
        <Button>
          <ButtonText>로그인</ButtonText>
        </Button>

        {/* 비밀번호 찾기 */}
        <SubText>비밀번호를 잊으셨나요?</SubText>
      </Container>
    );
  }
}

export default Login;
