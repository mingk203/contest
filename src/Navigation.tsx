// navigation.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// ⭐ 기존 Screens
import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";
import EditProfile from "./EditProfile";
import LoginScreen from "./screens/LoginScreen";

// ⭐ 친구 Screens
import ClubDetailScreen from "./screens/ClubDetailScreen";
import ClubScreen from "./screens/ClubScreen";
import CourseDetailScreen from "./screens/CourseDetailScreen";
import CourseScreen from "./screens/CourseScreen";
import SelectCategoryScreen from "./screens/SelectCategoryScreen";
import SplashScreen from "./screens/SplashScreen";
import SupportModal from "./screens/SupportModal";

// ⭐ Tabs
import Home from "./Home";
import MyPage from "./MyPage";
import CreatePost from "./CreatePost";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// -----------------------
// 🟢 하단 탭
// -----------------------
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
          tabBarIcon: ({ color }:{color:string}) => <Icon name="add" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color }:{color:string}) => (
            <Icon name="home" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: "내 정보",
          tabBarIcon: ({ color }:{color:string}) => (
            <Icon name="person" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// -----------------------
// 🟢 스택 네비게이션
// -----------------------
export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      {/* 로그인 / 회원가입 */}
      <Stack.Screen name="Signup1" component={Signup1} />
      <Stack.Screen name="Signup2" component={Signup2} />
      <Stack.Screen name="Signup3" component={Signup3} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* 메인 탭 */}
      <Stack.Screen name="Home" component={Home} />

      {/* 친구가 만든 페이지들 추가 */}
      <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
      <Stack.Screen name="Club" component={ClubScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="SelectCategory" component={SelectCategoryScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SupportModal" component={SupportModal} />

      {/* 프로필 수정 */}
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
