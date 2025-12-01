import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from '../firebaseConfig'; 
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔥 추가
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MyPage = ({ navigation }: { navigation: any }) => {
  const [userEmail, setUserEmail] = useState("-");
  const [userTags, setUserTags] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
const [displayNickname, setDisplayNickname] = useState("사용자");

  // 화면이 포커스 될 때마다 정보 갱신
 useEffect(() => {
  const fetchUserData = async () => {
    const user = auth.currentUser;

    if (user && user.email) {
      setUserEmail(user.email);
    } else {
      setUserEmail("게스트");
    }

    // 🔥 Firestore에서 닉네임 불러오기
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.nickname) {
            setDisplayNickname(userData.nickname);
          }
        }
      } catch (err) {
        console.log("닉네임 로드 실패:", err);
      }
    }

    // 🔥 저장된 태그 불러오기
    try {
      const savedTags = await AsyncStorage.getItem("userTags");
      if (savedTags) {
        setUserTags(JSON.parse(savedTags));
      } else {
        setUserTags(["#운동초보", "#열정만땅"]);
      }
    } catch (e) {
      console.log("태그 불러오기 실패", e);
    }
  };

  const unsubscribe = navigation.addListener('focus', fetchUserData);
  return unsubscribe;
}, [navigation]);

  return (
    <>
      <TopHeader>
        <Icon name="location-sharp" size={20} color="white" />
        <LocationText>충청남도 아산시 신창면</LocationText>
      </TopHeader>

      <Container>
        <Header>
          <ProfileSection>
            <ProfileCircle>
               <Icon name="person" size={35} color="#fff" />
            </ProfileCircle>
            
            <ProfileInfo>
              <NameText>{displayNickname} 님</NameText> 
              <EmailText>{userEmail}</EmailText>
              
              <TagRow>
                {/* 🔥 내가 선택한 태그들이 여기에 표시됨 */}
                {userTags.map((tag, index) => (
                  <TagBadge key={index}>
                    <TagText>{tag}</TagText>
                  </TagBadge>
                ))}
              </TagRow>
            </ProfileInfo>
          </ProfileSection>

          <MenuWrapper>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Icon name="ellipsis-vertical" size={24} color="#333" />
            </TouchableOpacity>

            {menuVisible && (
              <MenuBox>
                <MenuButton onPress={() => {
                   auth.signOut();
                   // 로그아웃 시 저장된 태그도 초기화하고 싶다면:
                   // AsyncStorage.removeItem("userTags");
                   navigation.reset({routes: [{name: "Login"}]});
                }}>
                  <MenuText style={{color: 'red'}}>로그아웃</MenuText>
                </MenuButton>
              </MenuBox>
            )}
          </MenuWrapper>
        </Header>

        <Section>
          <SectionTitle>🏃 가입된 동호회</SectionTitle>
          <PlaceholderBox><EmptyText>아직 가입된 동호회가 없습니다.</EmptyText></PlaceholderBox>
        </Section>

        <Section>
          <SectionTitle>❤️ 찜한 동호회</SectionTitle>
          <PlaceholderBox><EmptyText>찜한 동호회가 없습니다.</EmptyText></PlaceholderBox>
        </Section>
      </Container>
    </>
  );
};

export default MyPage;

/* 스타일 컴포넌트 */
const TopHeader = styled.View` width: 100%; background-color: #3f7361; padding: 15px 20px; flex-direction: row; align-items: center; `;
const LocationText = styled.Text` font-size: 17px; font-weight: 600; color: white; margin-left: 8px; `;
const Container = styled.ScrollView` flex: 1; background-color: #f8f9fa; padding: 20px; `;
const Header = styled.View` background-color: #fff; border-radius: 16px; padding: 20px; margin-bottom: 25px; flex-direction: row; justify-content: space-between; align-items: flex-start; elevation: 3; `;
const ProfileSection = styled.View` flex-direction: row; align-items: center; flex: 1; `;
const ProfileCircle = styled.View` width: 64px; height: 64px; background-color: #2e5c4d; border-radius: 32px; justify-content: center; align-items: center; `;
const ProfileInfo = styled.View` margin-left: 16px; flex: 1; `;
const NameText = styled.Text` font-size: 18px; font-weight: bold; color: #222; `;
const EmailText = styled.Text` font-size: 13px; color: #777; margin-top: 2px; margin-bottom: 6px;`;
const TagRow = styled.View` flex-direction: row; flex-wrap: wrap; gap: 6px; `;
const TagBadge = styled.View` background-color: #e8f5e9; padding: 4px 8px; border-radius: 6px; `;
const TagText = styled.Text` color: #2e5c4d; font-size: 11px; font-weight: 700; `;
const MenuWrapper = styled.View` position: relative; `;
const MenuBox = styled.View` position: absolute; top: 30px; right: 0; background-color: white; border-radius: 8px; elevation: 5; z-index: 10; min-width: 100px; `;
const MenuButton = styled.TouchableOpacity` padding: 12px; `;
const MenuText = styled.Text` font-size: 14px; color: #333; `;
const Section = styled.View` margin-bottom: 30px; `;
const SectionTitle = styled.Text` font-size: 17px; font-weight: bold; margin-bottom: 12px; color: #333; margin-left: 4px; `;
const PlaceholderBox = styled.View` width: 100%; height: 80px; background-color: #fff; border-radius: 12px; justify-content: center; align-items: center; border: 1px dashed #ccc; `;
const EmptyText = styled.Text` color: #999; font-size: 14px; `;