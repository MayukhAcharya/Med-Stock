import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from 'src/screens/DashboardScreen/DashboardScreen';
import {
  AuthStackParamList,
  MainStackParamList,
  UnAuthStackParamList,
} from 'src/navigation/types';
import LoginScreen from 'src/screens/LoginScreen';

const AppNavigation = () => {
  const UnAuthStack = createNativeStackNavigator<UnAuthStackParamList>();
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();
  const MainStack = createNativeStackNavigator<MainStackParamList>();

  const UnAuthStackScreens = () => (
    <UnAuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginScreen"
    >
      <UnAuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </UnAuthStack.Navigator>
  );

  const AuthStackScreens = () => (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="DashboardScreen" component={DashboardScreen} />
    </AuthStack.Navigator>
  );

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen
          name="UnAuthStackScreens"
          component={UnAuthStackScreens}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
