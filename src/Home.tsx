import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";  //삼성은 아래에 네비게이션바?같은게 있어서 이걸 해서 안겹피게 만들어줨
import Swiper from "react-native-swiper";


// 📌 ScrollView 전체 컨테이너
const TotalContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 75,
  }
})`
  background-color: #ffffff;
`;
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

/* -------------------------------------
   📌 상단 배너
-------------------------------------- */



const BannerWrapper = styled.View`
  height: 180px;
  width: 100%;
  margin-bottom: 10px;
`;

const BannerSlide = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;


/* -------------------------------------
   📌 섹션 타이틀
-------------------------------------- */
const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 5px 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color:#2e5c4d;
`;

const ViewAllBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

/* -------------------------------------
   📌 우리 동네 크루 카드
-------------------------------------- */
const CrewCard = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 12px;
  margin: 0 20px 12px 20px;
  padding: 12px;
  border: 1px solid #ddd;
`;

const CrewImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 12px;
`;

const CrewInfo = styled.View`
  flex: 1;
`;

const CrewName = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const CrewDesc = styled.Text`
  font-size: 13px;
  color: #555;
  margin-top: 3px;
`;









const NearTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 10px 20px;
  color: #2e5c4d;
`;





type RootStackParamList = {
  Home: undefined;
  CreatePost: undefined;
  AllCrewsList: undefined;
  MyPage: undefined;
  CrewDetail: undefined;

};

const NearScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const NearCard = styled.View`
  width: 180px;
  height: 140px;
  border-radius: 12px;
  background-color: #ffffff;
  margin-right: 12px;
  border: 1px solid #ddd;
  padding: 12px;
`;

const NearName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NearDistance = styled.Text`
  font-size: 13px;
  color: #777;
`;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [nickname, setNickname] = useState("게스트");
    const insets = useSafeAreaInsets();


  useEffect(() => {
    const loadNickname = async () => {
      const savedNickname = await AsyncStorage.getItem("userNickname");
      if (savedNickname) setNickname(savedNickname);
    };
    loadNickname();
  }, []);

  return (
    <>
      <TotalContainer>

        <TopHeader>
  <Icon name="location-sharp" size={20} color="white" />
  <LocationText>충청남도 아산시 신창면</LocationText>
</TopHeader>

<BannerWrapper>
  <Swiper
    autoplay
    autoplayTimeout={3}
    showsPagination={true}
    dotColor="#ccc"
    activeDotColor="#3f7361"
  >
    <BannerSlide source={{ uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" }} />
    <BannerSlide source={{ uri: "https://images.unsplash.com/photo-1558611848-73f7eb4001ab" }} />
    <BannerSlide source={{ uri: "https://images.unsplash.com/photo-1583454110550-360ebd2d9f6c" }} />
  </Swiper>
</BannerWrapper>


       

        {/* ------------------------------- */}
        {/* 📌 우리 동네 크루 */}
        {/* ------------------------------- */}
        <SectionHeader>
          <SectionTitle>우리 동네 크루</SectionTitle>
          <ViewAllBtn onPress={() => navigation.navigate("AllCrewsList")}>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </ViewAllBtn>
        </SectionHeader>

        <CrewCard>
          <CrewImage
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Running_icon.png"
            }}
          />
          <CrewInfo>
            <CrewName>러닝 크루 MZ</CrewName>
            <CrewDesc>한강을 기준으로 어떤 러닝을 목표로 합니다</CrewDesc>
          </CrewInfo>
        </CrewCard>

        <CrewCard>
          <CrewImage
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/9/9b/Badminton_racket_and_shuttlecock.png"
            }}
          />
          <CrewInfo>
            <CrewName>배드민턴 크루 MZ</CrewName>
            <CrewDesc>배드민턴 대회 제외 취미로 하는 배드민턴</CrewDesc>
          </CrewInfo>
        </CrewCard>

     

        <NearTitle>나의 근처 체육시설</NearTitle>

<NearScroll>
  <NearCard>
    <Icon name="fitness" size={26} color="#3f7361" />
    <NearName>신창 헬스장</NearName>
    <NearDistance>450m</NearDistance>
  </NearCard>

  <NearCard>
    <Icon name="barbell" size={26} color="#3f7361" />
    <NearName>슬기로운 PT샵</NearName>
    <NearDistance>800m</NearDistance>
  </NearCard>

  <NearCard>
    <Icon name="walk" size={26} color="#3f7361" />
    <NearName>신창 걷기 코스</NearName>
    <NearDistance>300m</NearDistance>
  </NearCard>
</NearScroll>



    </TotalContainer>

      {/* 플로팅 버튼
      <FloatingButton onPress={() => navigation.navigate("CreatePost")}>
        <Icon name="add" size={32} color="#fff" />
      </FloatingButton> */}

      
    </>
  );
};

export default Home;
