export type UnAuthStackParamList = {
  LoginRegisterScreen: undefined;
  OnboardingScreen: undefined;
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
  medicineName?: string;
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
  AddMedicineScreen: { addMedicineDetails: addMedicineParams }; //will be used only for first time
  CameraScreen: undefined;
};

//PROFILE STACK
export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

type healthProfileMedicationsType = {
  id: string;
  profileName: string;
  medicationName: string;
};

type editMedicationTypes = {
  id: string;
  medication: medicationTypes[];
  startDate: any;
  endDate: any;
  profileName: string;
  medicationType: string;
};

type medicationTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: any;
  category: string;
  id: string;
  notificationId: string;
};
type allMedicineTypes = {
  isHealthProfile: boolean;
  id?: any;
  allMedicineArray?: medicationTypes[];
  startDate?: string;
  profileName?: string;
};

type addHealthProfileTypes = {
  isFirstAdd: boolean;
};

//MEDICATION PROFILES STACK
export type MedicationProfileStack = {
  MedicationProfilesScreen: undefined;
  HealthProfileMedicationScreen: {
    medicationsData: healthProfileMedicationsType;
  };
  EditMedicationScreen: { editMedicationData: editMedicationTypes };
  MedicineDetailsScreen: { medicineDetails: medicineParams };
  AddMedicineScreen: { medicationData: allMedicineTypes };
  AddHealthProfileScreen: { addHealthProfileData: addHealthProfileTypes };
};
