import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { styles } from 'src/screens/EditMedicationScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { database } from 'src/Database/database';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import normalize from 'src/config/normalize';
import { Edit, PlusIcon, Trash2Icon } from 'lucide-react-native';
import Button from 'src/components/Button/Button';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import AddEditMedicationBottomSheet from 'src/components/AddEditMedicationBottomSheet/AddEditMedicationBottomSheet';

type medicineData = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
  label: string;
  value: string;
};

type medicationTypes = {
  id: string;
  medicineName: string;
  category: string;
  medicationTime: string;
};

const dummyData = [
  {
    id: '1',
    medicineName: 'Calpol1',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '2',
    medicineName: 'Calpol2',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '3',
    medicineName: 'Calpol3',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '4',
    medicineName: 'Calpol4',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '5',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '6',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '7',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '8',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '9',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '10',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
  {
    id: '11',
    medicineName: 'Calpol5',
    category: 'Tablet',
    medicationTime: 'After Dinner',
  },
];

const EditMedicationScreen = () => {
  const currentStyles = styles();
  const flatlistRef = useRef(null);

  const [medicationData, setMedicationData] =
    useState<medicationTypes[]>(dummyData);
  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <View style={currentStyles.container}>
        <View style={{ maxHeight: normalize(500, 'height') }}>
          <FlatList
            data={medicationData}
            renderItem={({ item, index }) => (
              <View style={[currentStyles.boxContainer]}>
                <CustomTextInput
                  label="Medicine name"
                  allStyle={commonStyles.w138}
                  borderColor={colors.borderColor}
                  value={item.medicineName}
                  placeholder="Calpol-650"
                  style={{ backgroundColor: colors.pureWhite }}
                  editable={false}
                />
                <CustomTextInput
                  label="Medication Time"
                  allStyle={commonStyles.w138}
                  borderColor={colors.borderColor}
                  value={item.medicationTime}
                  placeholder="Before Lunch"
                  style={{ backgroundColor: colors.pureWhite }}
                  editable={false}
                />
                <View>
                  <TouchableOpacity
                    style={commonStyles.mt16}
                    onPress={() => {
                      setEdit(true);
                    }}
                  >
                    <Edit />
                  </TouchableOpacity>
                  <TouchableOpacity style={commonStyles.mt16}>
                    <Trash2Icon color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={commonStyles.mt10} />}
          />
        </View>

        <View style={commonStyles.mt30}>
          <Button
            label="Add Medicine"
            mainStyle={currentStyles.addMedicineStyle}
            labelStyle={currentStyles.addMedicineLabelStyle}
            icon={<PlusIcon size={20} />}
            onPress={() => {}}
          />
          <Button
            label="Save Details"
            mainStyle={[
              commonStyles.w100per,
              commonStyles.mt10,
              commonStyles.aic,
            ]}
            onPress={() => {}}
          />
        </View>
      </View>
      {isEdit ? (
        <AddEditMedicationBottomSheet
          onClose={() => setEdit(false)}
          isVisible={isEdit}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default EditMedicationScreen;
