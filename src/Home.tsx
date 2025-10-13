import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

/* ---------------------- styled-components ---------------------- */

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Banner = styled.ImageBackground`
  width: 100%;
  height: 200px;
  justify-content: flex-end;
  align-items: center;
`;

const BannerText = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Section = styled.View`
  margin: 20px 16px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const IconRow = styled.ScrollView`
  flex-direction: row;
`;

const Circle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  color: white;
  font-weight: bold;
`;

const CrewCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  elevation: 2;
`;

const CrewLogo = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

const CrewInfo = styled.View`
  flex: 1;
`;

const CrewTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const CrewDesc = styled.Text`
  font-size: 13px;
  color: gray;
`;

const TabBar = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-top-width: 1px;
  border-top-color: #ddd;
`;

const TabText = styled.Text`
  font-size: 12px;
  color: #333;
`;

/* ---------------------- Component ---------------------- */

const Home = () => {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상단 배너 */}
        <Banner source={{ uri: "https://via.placeholder.com/400x200" }}>
          <BannerText>어떤 러닝크루 꾸준한 뭐 어쩌구 모집</BannerText>
        </Banner>

        {/* 크루 모집 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>크루 모집</SectionTitle>
          </SectionHeader>
          <IconRow horizontal showsHorizontalScrollIndicator={false}>
            {["#2ecc71", "#3498db", "#95a5a6", "#7f8c8d"].map((color, idx) => (
              <Circle key={idx} style={{ backgroundColor: color }}>
                <IconText>PDF</IconText>
              </Circle>
            ))}
          </IconRow>
        </Section>

        {/* 우리 동네 크루 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>우리 동네 크루</SectionTitle>
          </SectionHeader>

          <CrewCard>
            <CrewLogo source={{ uri: "https://via.placeholder.com/50" }} />
            <CrewInfo>
              <CrewTitle>러닝 크루 MZ</CrewTitle>
              <CrewDesc>한강을 기준으로 어떤 러닝을 목표로 합니다</CrewDesc>
            </CrewInfo>
          </CrewCard>

          <CrewCard>
            <CrewLogo source={{ uri: "https://via.placeholder.com/50" }} />
            <CrewInfo>
              <CrewTitle>배드민턴 크루 MZ</CrewTitle>
              <CrewDesc>배드민턴 대회 제외 취미로 하는 배드민턴</CrewDesc>
            </CrewInfo>
          </CrewCard>
        </Section>
      </ScrollView>

      {/* 하단 탭바 */}
      <TabBar>
        <TabText>목록</TabText>
        <TabText>추가</TabText>
        <TabText>홈</TabText>
        <TabText>즐겨찾기</TabText>
        <TabText>내 정보</TabText>
      </TabBar>
    </Container>
  );
};

export default Home;
