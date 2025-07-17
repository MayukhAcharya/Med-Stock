import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
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
import { RouteProp, useRoute } from '@react-navigation/native';
import { MedicationProfileStack } from 'src/navigation/types';
import HealthProfile from 'src/Database/healthProfileModel';

type routeProps = RouteProp<MedicationProfileStack, 'EditMedicationScreen'>;

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
  medicineName: string;
  medicineId: string;
  medicationTime: any;
  category: string;
  id: string;
};

const EditMedicationScreen = () => {
  const currentStyles = styles();
  const flatlistRef = useRef<FlatList>(null);
  const route = useRoute<routeProps>();

  const [isEdit, setEdit] = useState<boolean>(false);
  const [allMedications, setAllMedications] = useState<medicationTypes[]>(
    route.params.editMedicationData.medication,
  );
  const [medicineEditData, setMedicineEditData] = useState<medicationTypes>({
    category: '',
    medicationTime: new Date(),
    medicineId: '',
    medicineName: '',
    id: '',
  });
  const [addMedicationData, setAddMedicationData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteMeicationMethod = (id: string) => {
    const filteredData = allMedications.filter(item => item.id !== id);

    setAllMedications(filteredData);
    updateMedicationsMethod(filteredData);
  };

  const updateMedicationsMethod = async (medications: medicationTypes[]) => {
    setIsLoading(true);
    try {
      const medicationUpdate = await database
        .get<HealthProfile>('healthProfiles')
        .find(route.params.editMedicationData.id);
      await database.write(async () => {
        await medicationUpdate.update(medicationDb => {
          medicationDb.medicineArray = JSON.stringify(medications);
        });
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <View style={currentStyles.container}>
        <View style={{ maxHeight: normalize(500, 'height') }}>
          <FlatList
            ref={flatlistRef}
            data={allMedications}
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
                  placeholder="8:40 am"
                  style={{ backgroundColor: colors.pureWhite }}
                  editable={false}
                />
                <View>
                  <TouchableOpacity
                    style={commonStyles.mt16}
                    onPress={() => {
                      setMedicineEditData(item);
                      setEdit(true);
                    }}
                  >
                    <Edit />
                  </TouchableOpacity>
                  {allMedications.length !== 1 ? (
                    <TouchableOpacity
                      style={commonStyles.mt16}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure?',
                          `Do you want to remove ${item.medicineName} from your medications?`,
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                deleteMeicationMethod(item.id);
                              },
                            },
                            {
                              text: 'No',
                              style: 'cancel',
                            },
                          ],
                        );
                      }}
                    >
                      <Trash2Icon color={colors.error} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => `${item.medicineId}${index}`}
            ItemSeparatorComponent={() => <View style={commonStyles.mt10} />}
          />
        </View>

        <View style={commonStyles.mt30}>
          <Button
            label="Add Medication"
            mainStyle={currentStyles.addMedicineStyle}
            labelStyle={currentStyles.addMedicineLabelStyle}
            icon={<PlusIcon size={20} />}
            onPress={() => {
              setAddMedicationData(true);
            }}
          />
        </View>
      </View>
      {isEdit ? (
        <AddEditMedicationBottomSheet
          onClose={() => setEdit(false)}
          isVisible={isEdit}
          medicineObject={medicineEditData}
          onSaveArray={data => {
            setAllMedications(data);
            updateMedicationsMethod(data);
          }}
          onSave={() => {}}
          allMedicineArray={allMedications}
        />
      ) : null}
      {addMedicationData ? (
        <AddEditMedicationBottomSheet
          onClose={() => {
            setAddMedicationData(false);
          }}
          isVisible={addMedicationData}
          onSave={data => {
            setAllMedications([...allMedications, data]);
            flatlistRef.current?.scrollToIndex({
              animated: true,
              index: allMedications.length - 1,
            });
            const medicationData = [...allMedications, data];
            updateMedicationsMethod(medicationData);
          }}
          onSaveArray={() => {}}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default EditMedicationScreen;
