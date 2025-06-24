import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/AllMedicinesScreen/styles';
import MedicineListCard from 'src/components/MedicineListCard/MedicineListCard';
import { commonStyles } from 'src/config/commonStyles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { Plus } from 'lucide-react-native';
import { colors } from 'src/config/colors';

const dummyList = [
  {
    id: '1',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '2',
    medicineName: 'Rosuless-10',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '3',
    medicineName: 'Famoccid-10',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '4',
    medicineName: 'Paracetamol',
    date: '10/10/2025',
    category: 'Bandage',
  },
  {
    id: '5',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '6',
    medicineName: 'Paracetamol',
    date: '10/10/2025',
    category: 'Bandage',
  },
  {
    id: '7',
    medicineName: 'Paracetamol',
    date: '10/10/2025',
    category: 'Bandage',
  },
];

const AllMedicinesScreen = () => {
  const currentStyles = styles();
  return (
    <>
      <BackgroundFill showDesign={false} scroll={false}>
        <View style={currentStyles.container}>
          <View style={commonStyles.aic}>
            <FlatList
              data={dummyList}
              renderItem={({ item, index }) => {
                return (
                  <MedicineListCard
                    expiryDate={item.date}
                    medicineName={item.medicineName}
                    quantity="20"
                    category={item.category}
                    image={item.image ? item.image : null}
                  />
                );
              }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={commonStyles.mt20} />}
            />
          </View>
        </View>
      </BackgroundFill>
      <TouchableOpacity style={currentStyles.fab} onPress={() => {}}>
        <Plus color={colors.pureWhite} />
      </TouchableOpacity>
    </>
  );
};

export default AllMedicinesScreen;
