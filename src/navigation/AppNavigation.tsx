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
import AllMedicinesScreen from 'src/screens/AllMedicinesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from 'src/screens/ProfileScreen/ProfileScreen';

const AppNavigation = () => {
  const UnAuthStack = createNativeStackNavigator<UnAuthStackParamList>();
  const AuthStack = createBottomTabNavigator<AuthStackParamList>();
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
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: true,
          header: () => <Header title="My Medicines" />,
        }}
      />
      <AuthStack.Screen
        name="AllMedicinesScreen"
        component={AllMedicinesScreen}
        options={{
          headerShown: true,
          header: () => <Header title="All Medicines" />,
        }}
      />
      <AuthStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: true,
          header: () => <Header title="Profile" />,
        }}
      />
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
