import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import SelectCategoryScreen from './src/screens/SelectCategoryScreen';
import ClubScreen from './src/screens/ClubScreen';
import ClubDetailScreen from './src/screens/ClubDetailScreen';
import CourseScreen from './src/screens/CourseScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import SupportModal from './src/screens/SupportModal';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SelectCategory: undefined;
  Club: undefined;
  ClubDetail: { club?: { name?: string; tags?: string; place?: string } };
  Course: undefined;
  CourseDetail: undefined;
  SupportModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SelectCategory" component={SelectCategoryScreen} />
          <Stack.Screen name="Club" component={ClubScreen} />
          <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
          <Stack.Screen name="Course" component={CourseScreen} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen
            name="SupportModal"
            component={SupportModal}
            options={{ presentation: 'transparentModal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
