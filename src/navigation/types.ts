export type UnAuthStackParamList = {
  LoginRegisterScreen: undefined;
};

export type AuthStackParamList = {
  ProfileScreen: undefined;
  DashboardStackScreens: undefined;
  AllMedicineStackScreens: undefined;
};

export type DashboardStackParamList = {
  DashboardScreen: undefined;
  MedicineDetailsScreen: undefined;
  AddMedicineScreen: undefined; //will be used only for first time
};

export type AllMedicineStackParamList = {
  AllMedicinesScreen: undefined;
  MedicineDetailsScreen: undefined;
  AddMedicineScreen: undefined;
};

export type MainStackParamList = {
  UnAuthStackScreens: undefined;
  AuthStackScreens: undefined;
};
