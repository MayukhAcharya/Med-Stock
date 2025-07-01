export type UnAuthStackParamList = {
  LoginRegisterScreen: undefined;
};

export type AuthStackParamList = {
  ProfileStackScreens: undefined;
  DashboardStackScreens: undefined;
  AllMedicineStackScreens: undefined;
};

type medicineParams = {
  id: any;
};

type addMedicineParams = {
  isFirstAdd?: boolean;
};

export type DashboardStackParamList = {
  DashboardScreen: undefined;
  MedicineDetailsScreen: { medicineDetails: medicineParams };
  AddMedicineScreen: { addMedicineDetails: addMedicineParams }; //will be used only for first time
};

export type AllMedicineStackParamList = {
  AllMedicinesScreen: undefined;
  MedicineDetailsScreen: { medicineDetails: medicineParams };
  AddMedicineScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

export type MainStackParamList = {
  UnAuthStackScreens: undefined;
  AuthStackScreens: undefined;
  LoadingScreen: undefined;
};
