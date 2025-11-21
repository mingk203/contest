// navigation.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";
import EditProfile from "./EditProfile";

// Tabs
import Home from "./Home";
import MyPage from "./MyPage";
import CreatePost from "./CreatePost";

const Stack = createStackNavigator();
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
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarLabel: "작성",
          tabBarIcon: ({ color }) => (
            <Icon name="add" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "내 정보",
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 🟢 Stack 네비게이션 (로그인/회원가입 + 상세 페이지 + 탭)
export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="Signup1">
      {/* 로그인/회원가입 */}
      <Stack.Screen name="Signup1" component={Signup1} />
      <Stack.Screen name="Signup2" component={Signup2} />
      <Stack.Screen name="Signup3" component={Signup3} />

      {/* 메인 탭 */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* 기타 상세 페이지 */}
\      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
