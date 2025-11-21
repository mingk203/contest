import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

const EditProfile = ({ navigation }) => {
  return (
<>
    <TopHeader>
        <Icon name="location-sharp" size={20} color="white" />
        <LocationText>충청남도 아산시 신창면</LocationText>
      </TopHeader>

    <Container>
      <ProfileWrapper>
        <ProfileCircle />
        <UploadBtn>
          <Icon name="camera" size={20} color="#fff" />
        </UploadBtn>
      </ProfileWrapper>

      <InputWrapper>
        <Label>닉네임</Label>
        <Input placeholder="닉네임을 입력하세요" value="노니" />
      </InputWrapper>

      <InputWrapper>
        <Label>아이디</Label>
        <Input placeholder="아이디를 입력하세요" value="NANYONI" />
      </InputWrapper>

      <InputWrapper>
        <Label>비밀번호</Label>
        <Input
          placeholder="비밀번호"
          secureTextEntry
          value="DDONG"
        />
      </InputWrapper>

      <SubmitButton onPress={() => navigation.goBack()}>
        <SubmitText>저장하기</SubmitText>
      </SubmitButton>
    </Container>
    </>
  );
};

export default EditProfile;

// ------------------------------------------------------
// ⭐ 스타일 컴포넌트들
// ------------------------------------------------------

const TopHeader = styled.View`
  width: 100%;
  background-color: #3f7361ff;
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
`;

const LocationText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: white;
  margin-left: 8px;
`;


const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 30px;
  align-items: center;
`;

const ProfileWrapper = styled.View`
  position: relative;
  margin-bottom: 30px;
`;

const ProfileCircle = styled.View`
  width: 120px;
  height: 120px;
  background-color: #e5e5e5;
  border-radius: 60px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

const UploadBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #3f7361;
  width: 38px;
  height: 38px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  elevation: 4;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 18px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #2e5c4d;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 46px;
  background-color: white;
  border: 1.5px solid #d0d0d0;
  border-radius: 10px;
  padding: 0 12px;

  /* 부드러운 그림자 */
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #3f7361;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  elevation: 4;
`;

const SubmitText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
`;
