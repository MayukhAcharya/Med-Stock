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
  AddMedicineScreen: { addMedicineDetails: addMedicineParams }; //will be used only for first time
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

type medicationsTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: string;
  category: string;
  id: string;
};

type editMedicationTypes = {
  id: string;
  medication: medicationsTypes[];
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
};
type allMedicineTypes = {
  isHealthProfile: boolean;
  id?: any;
  allMedicineArray?: medicationTypes[];
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
