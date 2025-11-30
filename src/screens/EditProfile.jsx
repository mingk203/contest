import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";

const EditProfile = ({ navigation }) => {
  return (
    <>
      <TopHeader>
        {/* 뒤로가기 버튼 기능 추가 */}
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </BackButton>
        <HeaderTitle>내 정보 수정</HeaderTitle>
        <View style={{width: 24}} /> 
      </TopHeader>

      <Container>
        <ProfileWrapper>
          <ProfileCircle>
             <Icon name="person" size={60} color="#fff" />
          </ProfileCircle>
          <UploadBtn onPress={() => Alert.alert("준비중", "사진 변경 기능은 준비중입니다.")}>
            <Icon name="camera" size={18} color="#fff" />
          </UploadBtn>
        </ProfileWrapper>

        <FormArea>
          <InputWrapper>
            <Label>닉네임</Label>
            <Input 
              placeholder="닉네임 입력" 
              defaultValue="ch" 
            />
          </InputWrapper>

          <InputWrapper>
            <Label>한줄 소개</Label>
            <Input 
              placeholder="나를 소개해주세요" 
              defaultValue="운동을 좋아하는 직장인입니다!" 
            />
          </InputWrapper>

          <InputWrapper>
            <Label>관심 태그</Label>
            <Input 
              defaultValue="#러닝 #배드민턴"
              editable={false} 
              style={{backgroundColor: '#f0f0f0', color: '#555'}}
            />
          </InputWrapper>
        </FormArea>

        <SubmitButton onPress={() => {
            Alert.alert("완료", "정보가 저장되었습니다! (데모)");
            navigation.goBack();
        }}>
          <SubmitText>저장하기</SubmitText>
        </SubmitButton>
      </Container>
    </>
  );
};

export default EditProfile;

// --- 스타일 ---
const TopHeader = styled.View`
  width: 100%;
  background-color: #3f7361;
  padding: 15px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BackButton = styled.TouchableOpacity``;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 30px 20px;
`;

const ProfileWrapper = styled.View`
  align-items: center;
  margin-bottom: 40px;
  position: relative;
`;

const ProfileCircle = styled.View`
  width: 110px; height: 110px;
  background-color: #d1e0db;
  border-radius: 55px;
  justify-content: center; align-items: center;
  border: 4px solid #fff;
  elevation: 5;
`;

const UploadBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 35%; 
  background-color: #2e5c4d;
  width: 34px; height: 34px;
  border-radius: 17px;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
`;

const FormArea = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 8px;
  margin-left: 4px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #fcfcfc;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 15px;
  color: #333;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #3f7361;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  elevation: 2;
  margin-bottom: 50px;
`;

const SubmitText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;