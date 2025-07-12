import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Edit, Trash2Icon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/screens/HealthProfileMedicationScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import MedicineListCard from 'src/components/MedicineListCard/MedicineListCard';
import { colors } from 'src/config/colors';
import { MedicationProfileStack } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';

type navigationPropsForMedication =
  NativeStackNavigationProp<MedicationProfileStack>;

const dummyData = [
  {
    id: '1',
    medicineName: 'Calpol1',
    category: 'Tablet',
  },
  {
    id: '2',
    medicineName: 'Calpol2',
    category: 'Tablet',
  },
  {
    id: '3',
    medicineName: 'Calpol3',
    category: 'Tablet',
  },
  {
    id: '4',
    medicineName: 'Calpol4',
    category: 'Tablet',
  },
  {
    id: '5',
    medicineName: 'Calpol5',
    category: 'Tablet',
  },
];

const HealthProfileMedicationScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForMedication>();

  const handleDeleteIcon = () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to delete your health profile? This will be deleted Permanently',
      [
        {
          text: 'Yes',
          onPress: () => {},
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <BackgroundFill showDesign={false}>
      <View style={currentStyles.container}>
        <View style={commonStyles.aic}>
          <FlatList
            data={dummyData}
            renderItem={({ item, index }) => {
              return (
                <MedicineListCard
                  medicineName={item.medicineName}
                  category={item.category}
                  onPress={() => {}}
                  medicationTime="Before Breakfast"
                  isHealthProfile={true}
                />
              );
            }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={commonStyles.mt20} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={commonStyles.flex1}>
          <View style={currentStyles.fabButtonStyle2}>
            <TouchableOpacity
              onPress={() => {
                handleDeleteIcon();
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Trash2Icon color={colors.pureWhite} />
            </TouchableOpacity>
          </View>
          <View style={currentStyles.fabButtonStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditMedicationScreen');
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Edit color={colors.pureWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default HealthProfileMedicationScreen;
