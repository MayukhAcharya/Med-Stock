import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { Edit, PlusIcon, Trash2Icon } from 'lucide-react-native';
import notifee from '@notifee/react-native';

import { styles } from 'src/screens/EditMedicationScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { database } from 'src/Database/database';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import AddEditMedicationBottomSheet from 'src/components/AddEditMedicationBottomSheet/AddEditMedicationBottomSheet';
import { MedicationProfileStack } from 'src/navigation/types';
import HealthProfile from 'src/Database/healthProfileModel';
import DateComponent from 'src/components/DateComponent/DateComponent';

type routeProps = RouteProp<MedicationProfileStack, 'EditMedicationScreen'>;

type medicationTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: any;
  category: string;
  id: string;
  notificationId: string;
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
    notificationId: '',
  });
  const [addMedicationData, setAddMedicationData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(
    new Date(route.params.editMedicationData.startDate),
  );
  const [toDate, setToDate] = useState<Date>(
    new Date(route.params.editMedicationData.endDate),
  );

  const deleteMeicationMethod = async (id: string, notificationId: string) => {
    const filteredData = allMedications.filter(item => item.id !== id);
    await notifee.cancelNotification(notificationId);
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

  const updatedMedicationDate = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    try {
      const medicationUpdate = await database
        .get<HealthProfile>('healthProfiles')
        .find(route.params.editMedicationData.id);
      await database.write(async () => {
        await medicationUpdate.update(medicationDb => {
          medicationDb.startDate = startDate.toISOString();
          medicationDb.endDate = endDate.toISOString();
        });
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getMedicationsMethod = async () => {
    setIsLoading(true);
    const medications = await database
      .get('healthProfiles')
      .find(route.params?.editMedicationData.id);
    const data: any = medications._raw;
    setAllMedications(JSON.parse(data.medicine_array));
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getMedicationsMethod();
      return () => unsubscribe;
    }, []),
  );

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <View style={currentStyles.container}>
        <View>
          <View style={[commonStyles.row, commonStyles.spaceBetween]}>
            <CustomTextInput
              label="Profile Name"
              allStyle={commonStyles.w45Per}
              borderColor={colors.borderColor}
              value={route.params.editMedicationData.profileName}
              placeholder="Name"
              editable={false}
              style={{ backgroundColor: colors.borderColor }}
            />
            <CustomTextInput
              label="Medication Type"
              allStyle={commonStyles.w45Per}
              borderColor={colors.borderColor}
              value={route.params.editMedicationData.medicationType}
              placeholder="Name"
              editable={false}
              style={{ backgroundColor: colors.borderColor }}
            />
          </View>
          <View
            style={[
              commonStyles.row,
              commonStyles.spaceBetween,
              commonStyles.mt16,
            ]}
          >
            <DateComponent
              label="Start Date"
              borderColor={colors.borderColor}
              value={fromDate}
              placeholder="date"
              allStyle={commonStyles.w160}
              style={{ backgroundColor: colors.pureWhite }}
              labelSyle={currentStyles.labelStyle}
              disable={true}
            />
            <DateComponent
              label="End Date"
              borderColor={colors.borderColor}
              value={toDate}
              placeholder="date"
              allStyle={commonStyles.w160}
              style={{ backgroundColor: colors.pureWhite }}
              labelSyle={currentStyles.labelStyle}
              onChange={date => {
                setToDate(date);
                updatedMedicationDate(fromDate, date);
              }}
            />
          </View>
        </View>
        <View
          style={{
            maxHeight: normalize(400, 'height'),
            marginTop: normalize(20, 'height'),
          }}
        >
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
                                deleteMeicationMethod(
                                  item.id,
                                  item.notificationId,
                                );
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
          id={route.params.editMedicationData.id}
          profileName={route.params.editMedicationData.profileName}
          startDate={route.params.editMedicationData.startDate}
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
          id={route.params.editMedicationData.id}
          allMedicineArray={allMedications}
          profileName={route.params.editMedicationData.profileName}
          startDate={route.params.editMedicationData.startDate}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default EditMedicationScreen;
