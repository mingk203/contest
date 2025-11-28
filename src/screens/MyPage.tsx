import React, { useEffect,useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// ---------------------
// 📌 상단 위치 헤더 스타일 추가
// ---------------------
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

// ---------------------
// 📌 ScrollView
// ---------------------
const Container = styled.ScrollView`
  background-color: #fff;
  padding: 20px;
  padding-bottom: 80px; /* Footer와 겹치지 않도록 */
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  padding-bottom: 10px;
`;

// ---------------------
const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileCircle = styled.View`
  width: 60px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 30px;
`;

const ProfileInfo = styled.View`
  margin-left: 12px;
`;

const NameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const JoinText = styled.Text`
  font-size: 13px;
  color: #777;
`;

const MenuWrapper = styled.View`
  position: relative;
`;

const MenuBox = styled.View`
  position: absolute;
  top: 28px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const MenuButton = styled.TouchableOpacity`
  padding: 10px 14px;
  width: 130px;
  height: 40px;
`;

const MenuText = styled.Text`
  font-size: 14px;
  color: #006b5b;
`;

const Section = styled.View`
  margin-top: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #085c0eff;
`;

const PlaceholderBox = styled.View`
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
  border-radius: 12px;
`;

// ---------------------

const MyPage = ({ navigation }: { navigation: any }) => {
  const [menuVisible, setMenuVisible] = useState(false);

    // ✔ 메뉴 자동 닫기 타이머
  useEffect(() => {
    if (menuVisible) {
      const timer = setTimeout(() => {
        setMenuVisible(false);
      }, 2000); // 2초 후 자동 닫힘

      return () => clearTimeout(timer);
    }
  }, [menuVisible]);

  // ✔ EditProfile 페이지 이동 시 메뉴 자동 닫기
  const goEditProfile = () => {
    setMenuVisible(false);       // 메뉴 즉시 닫힘
    navigation.navigate("EditProfile");
  };


  return (
    <>
      {/* 📌 상단 위치 헤더 추가 */}
      <TopHeader>
        <Icon name="location-sharp" size={20} color="white" />
        <LocationText>충청남도 아산시 신창면</LocationText>
      </TopHeader>

      <Container>

        {/* 프로필 헤더 */}
        <Header>
          <ProfileSection>
            <ProfileCircle />
            <ProfileInfo>
              <NameText>노니</NameText>
              <JoinText>가입일: 2025.10.03</JoinText>
            </ProfileInfo>
          </ProfileSection>

          <MenuWrapper>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Icon name="ellipsis-vertical" size={24} color="#333" />
            </TouchableOpacity>

            {menuVisible && (
              <MenuBox>
                <MenuButton onPress={goEditProfile}>
                  <MenuText>내 정보 수정하기</MenuText>
                </MenuButton>
              </MenuBox>
            )}
          </MenuWrapper>
        </Header>

        {/* 가입된 동호회 */}
        <Section>
          <SectionTitle>가입된 동호회</SectionTitle>
          <PlaceholderBox />
        </Section>

        {/* 내가 좋아하는 동호회 */}
        <Section>
          <SectionTitle>내가 좋아하는 동호회</SectionTitle>
          <PlaceholderBox />
        </Section>

      </Container>
    </>
  );
};

export default MyPage;
