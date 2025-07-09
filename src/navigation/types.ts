export type UnAuthStackParamList = {
  LoginRegisterScreen: undefined;
};

export type AuthStackParamList = {
  ProfileStackScreens: undefined;
  DashboardStackScreens: undefined;
  AllMedicineStackScreens: undefined;
  MedicationProfileStackScreens: undefined;
};

export type MainStackParamList = {
  UnAuthStackScreens: undefined;
  AuthStackScreens: undefined;
  LoadingScreen: undefined;
};

type medicineParams = {
  id: any;
};

type addMedicineParams = {
  isFirstAdd?: boolean;
};

//DASHBOARD STACK
export type DashboardStackParamList = {
  DashboardScreen: undefined;
  MedicineDetailsScreen: { medicineDetails: medicineParams };
  AddMedicineScreen: { addMedicineDetails: addMedicineParams }; //will be used only for first time
};

//ALL MEDICINE STACK
export type AllMedicineStackParamList = {
  AllMedicinesScreen: undefined;
  MedicineDetailsScreen: { medicineDetails: medicineParams };
  AddMedicineScreen: undefined;
};

//PROFILE STACK
export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

//MEDICATION PROFILES STACK
export type MedicationProfileStack = {
  MedicationProfilesScreen: undefined;
  HealthProfileMedicationScreen: undefined;
};
