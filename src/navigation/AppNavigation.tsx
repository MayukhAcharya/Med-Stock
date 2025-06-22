import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  AuthStackParamList,
  MainStackParamList,
  UnAuthStackParamList,
} from 'src/navigation/types';
import LoginScreen from 'src/screens/LoginScreen';
import DashboardScreen from 'src/screens/DashboardScreen';
import Header from 'src/components/Header/Header';

const AppNavigation = () => {
  const UnAuthStack = createNativeStackNavigator<UnAuthStackParamList>();
  const AuthStack = createNativeStackNavigator<AuthStackParamList>();
  const MainStack = createNativeStackNavigator<MainStackParamList>();

  const UnAuthStackScreens = () => (
    <UnAuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoginRegisterScreen"
    >
      <UnAuthStack.Screen name="LoginRegisterScreen" component={LoginScreen} />
    </UnAuthStack.Navigator>
  );

  const AuthStackScreens = () => (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <Header title="My Medicines" />,
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
        <MainStack.Screen
          name="AuthStackScreens"
          component={AuthStackScreens}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
