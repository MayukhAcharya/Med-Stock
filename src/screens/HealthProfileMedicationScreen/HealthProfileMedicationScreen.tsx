import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/HealthProfileMedicationScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import MedicineListCard from 'src/components/MedicineListCard/MedicineListCard';
import { Edit, Trash2Icon } from 'lucide-react-native';
import { colors } from 'src/config/colors';

const dummyData = [
  {
    id: '1',
    medicineName: 'Calpol',
    category: 'Tablet',
  },
  {
    id: '2',
    medicineName: 'Calpol',
    category: 'Tablet',
  },
  {
    id: '3',
    medicineName: 'Calpol',
    category: 'Tablet',
  },
  {
    id: '4',
    medicineName: 'Calpol',
    category: 'Tablet',
  },
  {
    id: '5',
    medicineName: 'Calpol',
    category: 'Tablet',
  },
];

const HealthProfileMedicationScreen = () => {
  const currentStyles = styles();

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
            <Pressable
              onPress={() => {
                handleDeleteIcon();
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Trash2Icon color={colors.pureWhite} />
            </Pressable>
          </View>
          <View style={currentStyles.fabButtonStyle}>
            <Pressable
              onPress={() => {}}
              style={currentStyles.plusIconPressStyle}
            >
              <Edit color={colors.pureWhite} />
            </Pressable>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default HealthProfileMedicationScreen;
