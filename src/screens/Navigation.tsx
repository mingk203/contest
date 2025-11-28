import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// --- Screens ---
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";

import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";

import Home from "./Home";
import CreatePost from "./CreatePost";
import MyPage from "./MyPage";
import EditProfile from "./EditProfile";

import ClubScreen from "./ClubScreen";
import ClubDetailScreen from "./ClubDetailScreen";

import CourseScreen from "./CourseScreen";
import CourseDetailScreen from "./CourseDetailScreen";

import SupportModal from "./SupportModal";

// --- Navigators ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// 🟢 하단 탭 네비게이션
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3f7361",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >

      {/* 홈 */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name="home" size={26} color={color} />
          ),
        }}
      />

      {/* 작성 */}
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarLabel: "작성",
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name="add" size={26} color={color} />
          ),
        }}
      />

      {/* 마이페이지 */}
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "내 정보",
          tabBarIcon: ({ color }: { color: string }) => (
            <Icon name="person" size={26} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}


// 🟢 전체 네비게이션
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Signup1" // ✨ 여기를 'Signup1'로 변경했습니다. ✨
      >

        {/* 1) 스플래시 */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* 2) 로그인 */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 3) 회원가입 */}
        <Stack.Screen name="Signup1" component={Signup1} />
        <Stack.Screen name="Signup2" component={Signup2} />
        <Stack.Screen name="Signup3" component={Signup3} />

        {/* 4) 메인 탭 */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* 5) 동호회 */}
        <Stack.Screen name="Club" component={ClubScreen} />
        <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />

        {/* 6) 체육 이용권 */}
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />

        {/* 7) 프로필 수정 */}
        <Stack.Screen name="EditProfile" component={EditProfile} />

        {/* 8) 지원 모달 */}
        <Stack.Screen
          name="SupportModal"
          component={SupportModal}
          options={{ presentation: "transparentModal" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}