import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { PlusCircleIcon } from 'lucide-react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/AddMedicineScreen/styles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import Button from 'src/components/Button/Button';
import UsesBottomSheet from 'src/components/UsesBottomSheet/UsesBottomSheet';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import DateComponent from 'src/components/DateComponent/DateComponent';
import {
  AllMedicineStackParamList,
  DashboardStackParamList,
  MedicationProfileStack,
} from 'src/navigation/types';
import {
  fieldRegex,
  firstMedicineAddBody,
  firstMedicineAddNotificationTitle,
  numberFieldRegex,
} from 'src/constants/constants';
import { database } from 'src/Database/database';
import Medicine from 'src/Database/medicineModel';
import normalize from 'src/config/normalize';
import HealthProfile from 'src/Database/healthProfileModel';
import {
  addChannelId,
  onDisplayNotification,
} from 'src/utils/DisplayNotification';
import { to24HourFormat } from 'src/utils/convertTime';

type navigationPropsForAddMedicine = NativeStackNavigationProp<
  AllMedicineStackParamList,
  'AddMedicineScreen'
>;

type routePropForDashboard = RouteProp<
  DashboardStackParamList,
  'AddMedicineScreen'
>;

type routePropForHealthProfile = RouteProp<
  MedicationProfileStack,
  'AddMedicineScreen'
>;

type routePropforAllMedicine = RouteProp<
  AllMedicineStackParamList,
  'AddMedicineScreen'
>;

const categoryOptions = [
  {
    label: 'Tablet',
    value: 'Tablet',
  },
  {
    label: 'Syrup',
    value: 'Syrup',
  },
  {
    label: 'Bandage',
    value: 'Bandage',
  },
  {
    label: 'Ointment',
    value: 'Ointment',
  },
  {
    label: 'Ear/Nose/Eye Drop',
    value: 'drop',
  },
  {
    label: 'Cartridge/Ampule',
    value: 'syringe',
  },
];

type addMedicineFormikTypes = {
  medicineName: string;
  quantity: string;
  category: string;
};

type medicationTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: any;
  category: string;
  id: string;
  notificationId?: string;
};

type usesType = {
  use: string;
};

const AddMedicineScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForAddMedicine>();
  const dashboardRoute = useRoute<routePropForDashboard>();
  const healthProfileRoute = useRoute<routePropForHealthProfile>();
  const allMedicineRoute = useRoute<routePropforAllMedicine>();
  const idRef = useRef('');
  const countRef = useRef(0);

  const [showUsesModal, setUsesModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [uses, setUses] = useState<usesType[]>([]);
  const [isLoading, setIsLoading] = useState({
    isSaveLoading: false,
    isSaveAnotherLoading: false,
  });
  const [saveOrSaveAnother, setSaveOrSaveAnother] = useState<
    'Save' | 'Save another'
  >('Save');
  const [allMedicineArray, setAllMedicineArray] = useState<medicationTypes[]>(
    healthProfileRoute.params &&
      healthProfileRoute.params.medicationData &&
      healthProfileRoute.params.medicationData.allMedicineArray
      ? healthProfileRoute.params.medicationData.allMedicineArray
      : [],
  );

  const validationSchema = yup.object().shape({
    medicineName: yup
      .string()
      .matches(fieldRegex, 'No special characters are allowed')
      .required('Medicine name is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      ),
    quantity: yup
      .string()
      .matches(numberFieldRegex, 'Only numbers are allowed')
      .required('Quantity is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      ),
    category: yup.string().required('category of medicine is required'),
  });

  const addMedicineSubmitMethod = async (values: addMedicineFormikTypes) => {
    setIsLoading(prev => ({
      ...prev,
      isSaveLoading: true,
    }));
    try {
      await database.write(async () => {
        await database
          .get<Medicine>('medicines')
          .create(medicine => {
            medicine.medicineName = values.medicineName;
            medicine.category = values.category;
            medicine.expiryDate = date.toISOString();
            medicine.uses = JSON.stringify(uses);
            medicine.quantity = values.quantity;
            medicine.markAsRequired = true;
          })
          .then(res => {
            idRef.current = res._raw.id;
          });
      });
      if (
        healthProfileRoute.params &&
        healthProfileRoute.params.medicationData &&
        healthProfileRoute.params.medicationData.isHealthProfile
      ) {
        await updateMedicationsMethod(values, idRef.current);
      }
      if (
        (dashboardRoute.params &&
          dashboardRoute.params.addMedicineDetails &&
          dashboardRoute.params.addMedicineDetails.isFirstAdd) ||
        (allMedicineRoute.params &&
          allMedicineRoute.params.addMedicineDetails &&
          allMedicineRoute.params.addMedicineDetails.isFirstAdd)
      ) {
        await onDisplayNotification(
          firstMedicineAddNotificationTitle,
          firstMedicineAddBody,
        );
      }

      navigation.goBack();
      setIsLoading(prev => ({
        ...prev,
        isSaveLoading: false,
      }));
    } catch (error) {
      setIsLoading(prev => ({
        ...prev,
        isSaveLoading: false,
      }));
    }
  };

  const addAnotherMedicineSubmitMethod = async (
    values: addMedicineFormikTypes,
    resetForm: any,
  ) => {
    setIsLoading(prev => ({
      ...prev,
      isSaveAnotherLoading: true,
    }));
    try {
      await database.write(async () => {
        await database
          .get<Medicine>('medicines')
          .create(medicine => {
            medicine.medicineName = values.medicineName;
            medicine.category = values.category;
            medicine.expiryDate = date.toISOString();
            medicine.uses = JSON.stringify(uses);
            medicine.quantity = values.quantity;
            medicine.markAsRequired = true;
          })
          .then(res => {
            idRef.current = res._raw.id;
            countRef.current = countRef.current + 1;
          });
      });
      if (
        healthProfileRoute.params &&
        healthProfileRoute.params.medicationData &&
        healthProfileRoute.params.medicationData.isHealthProfile
      ) {
        await updateMedicationsMethod(values, idRef.current);
      }
      if (
        (dashboardRoute.params &&
          dashboardRoute.params.addMedicineDetails &&
          dashboardRoute.params.addMedicineDetails.isFirstAdd) ||
        (allMedicineRoute.params &&
          allMedicineRoute.params.addMedicineDetails &&
          allMedicineRoute.params.addMedicineDetails.isFirstAdd)
      ) {
        if (countRef.current === 1) {
          await onDisplayNotification(
            firstMedicineAddNotificationTitle,
            firstMedicineAddBody,
          );
        }
      }
      resetForm({
        values: {
          medicine_name: '',
          category: 'Tablet',
          expiryDate: setDate(new Date()),
          uses: setUses([]),
          quantity: '',
        },
      });
      setIsLoading(prev => ({
        ...prev,
        isSaveAnotherLoading: false,
      }));
    } catch (error) {
      setIsLoading(prev => ({
        ...prev,
        isSaveAnotherLoading: false,
      }));
    }
  };

  const updateMedicationsMethod = async (
    values: addMedicineFormikTypes,
    id: string,
  ) => {
    const newMedicineObject = {
      medicineName: values.medicineName,
      medicineId: id,
      medicationTime: new Date().toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
      category: values.category,
      id: `${id}${new Date().getTime()}`,
      notificationId: `${
        healthProfileRoute.params &&
        healthProfileRoute.params.medicationData &&
        healthProfileRoute.params.medicationData.profileName
          ? healthProfileRoute.params &&
            healthProfileRoute.params.medicationData &&
            healthProfileRoute.params.medicationData.profileName
          : ''
      }${id}${new Date().getTime()}`,
    };
    const updatedMedicineArray = [...allMedicineArray, newMedicineObject];
    setAllMedicineArray(updatedMedicineArray);
    try {
      const medicationUpdate = await database
        .get<HealthProfile>('healthProfiles')
        .find(healthProfileRoute?.params?.medicationData?.id);
      await database.write(async () => {
        await medicationUpdate
          .update(medicationDb => {
            medicationDb.medicineArray = JSON.stringify(updatedMedicineArray);
          })
          .then(async res => {
            await addNotificationOfProfile(
              updatedMedicineArray,
              healthProfileRoute.params &&
                healthProfileRoute.params.medicationData &&
                healthProfileRoute.params.medicationData.startDate
                ? healthProfileRoute.params &&
                    healthProfileRoute.params.medicationData &&
                    healthProfileRoute.params.medicationData.startDate
                : '',
              healthProfileRoute.params &&
                healthProfileRoute.params.medicationData &&
                healthProfileRoute.params.medicationData.profileName
                ? healthProfileRoute.params &&
                    healthProfileRoute.params.medicationData &&
                    healthProfileRoute.params.medicationData.profileName
                : '',
            );
          });
      });
      setIsLoading(prev => ({
        isSaveAnotherLoading: false,
        isSaveLoading: false,
      }));
    } catch (error) {
      setIsLoading(prev => ({
        isSaveAnotherLoading: false,
        isSaveLoading: false,
      }));
    }
  };

  const addNotificationOfProfile = async (
    medicineArray: medicationTypes[],
    startDate: string,
    profileName: string,
  ) => {
    const date = new Date(startDate);

    //CREATE A TRIGGER NOTIFICATION FOR ALL OF THE MEDICINES IN THE ARRAY
    for (let [index, item] of medicineArray.entries()) {
      const { id, medicationTime, medicineName, notificationId } = item;
      const { hourStr, minuteStr } = to24HourFormat(medicationTime);
      date.setHours(Number(hourStr));
      date.setMinutes(Number(minuteStr));

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
        alarmManager: true,
        repeatFrequency: RepeatFrequency.DAILY,
      };

      let channelId = await addChannelId();

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          id: notificationId,
          title: `Reminder for ${profileName}'s medication`,
          body: `It's ${medicineName} time! Please take your dose now💊`,
          android: {
            channelId: channelId,
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
          },
        },
        trigger,
      );
    }
  };

  const onSubmitMethod = (values: addMedicineFormikTypes, resetForm: any) => {
    if (saveOrSaveAnother === 'Save') {
      addMedicineSubmitMethod(values);
    } else {
      addAnotherMedicineSubmitMethod(values, resetForm);
    }
  };

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <Formik
        initialValues={{
          medicineName: '',
          quantity: '',
          category: 'Tablet',
        }}
        onSubmit={(values: addMedicineFormikTypes, { resetForm }) =>
          onSubmitMethod(values, resetForm)
        }
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
          handleSubmit,
        }) => (
          <View style={currentStyles.container}>
            <View style={currentStyles.inputContainer}>
              <CustomTextInput
                label="Medicine Name"
                borderColor={colors.borderColor}
                value={values.medicineName}
                placeholder="Medicine Name"
                allStyle={commonStyles.w100per}
                style={{ backgroundColor: colors.pureWhite }}
                labelStyle={currentStyles.labelStyle}
                onChangeText={text => {
                  handleChange('medicineName')(text);
                }}
                isError={
                  errors.medicineName && touched.medicineName ? true : false
                }
                errorContainer={
                  errors.medicineName && touched.medicineName ? (
                    <Text>{errors.medicineName}</Text>
                  ) : null
                }
              />
              <CustomDropdown
                label="Category(optional)"
                borderColor={colors.borderColor}
                selectedValue={values.category}
                placeholder="Tablet/Syrup"
                allStyle={commonStyles.w100per}
                style={{ backgroundColor: colors.pureWhite }}
                list={categoryOptions}
                onValueSelect={item => {
                  setFieldValue('category', item.label);
                }}
                isError={errors.category && touched.category ? true : false}
                errorContainer={
                  errors.category && touched.category ? (
                    <Text>{errors.category}</Text>
                  ) : null
                }
                dropdownMainStyle={{ maxHeight: normalize(200, 'height') }}
              />
              <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                <CustomTextInput
                  label="Quantity"
                  borderColor={colors.borderColor}
                  value={values.quantity}
                  placeholder="Quantity"
                  allStyle={commonStyles.w160}
                  keyboardType="numeric"
                  style={{ backgroundColor: colors.pureWhite }}
                  labelStyle={currentStyles.labelStyle}
                  rightContainer={
                    <Text style={currentStyles.quantityUnitStyle}>
                      {values.category === 'Tablet' ||
                      values.category === 'Bandage'
                        ? 'Unit'
                        : values.category === 'Ointment'
                        ? 'g'
                        : 'ml'}
                    </Text>
                  }
                  onChangeText={text => {
                    handleChange('quantity')(text);
                  }}
                  isError={errors.quantity && touched.quantity ? true : false}
                  errorContainer={
                    errors.quantity && touched.quantity ? (
                      <Text>{errors.quantity}</Text>
                    ) : null
                  }
                />
                <DateComponent
                  label="Expiry Date"
                  borderColor={colors.borderColor}
                  value={date}
                  placeholder="date"
                  allStyle={commonStyles.w160}
                  style={{ backgroundColor: colors.pureWhite }}
                  labelSyle={currentStyles.labelStyle}
                  onChange={date => {
                    setDate(date);
                  }}
                />
              </View>
              <View style={currentStyles.boxView}>
                <View
                  style={[
                    commonStyles.row,
                    commonStyles.spaceBetween,
                    commonStyles.aic,
                  ]}
                >
                  <Text style={currentStyles.boxHeaderText}>
                    Uses(optional)
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setUsesModal(true);
                    }}
                  >
                    <Text style={currentStyles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View style={commonStyles.mt5}>
                  <Text style={currentStyles.boxDescriptionText}>
                    {uses.length > 0
                      ? uses.map(item => item.use).join(', ')
                      : 'Press Edit to add uses'}
                  </Text>
                </View>
              </View>
              {dashboardRoute.params &&
              dashboardRoute.params.addMedicineDetails &&
              dashboardRoute.params.addMedicineDetails.isFirstAdd ? (
                <View style={commonStyles.mt16}>
                  <Text style={currentStyles.noteTextStyle}>
                    <Text style={currentStyles.noteTextStyleBold}>Note**:</Text>{' '}
                    You can now add your medicines from{' '}
                    <Text style={currentStyles.noteTextStyleBold}>
                      All Medicines
                    </Text>{' '}
                    tab, by pressing the + icon
                  </Text>
                </View>
              ) : null}
            </View>
            {healthProfileRoute.params &&
            healthProfileRoute.params.medicationData &&
            healthProfileRoute.params.medicationData.isHealthProfile ? (
              <View style={commonStyles.mt30}>
                <Button
                  label={`Save and add another medication to profile`}
                  mainStyle={commonStyles.w100per}
                  onPress={() => {
                    setSaveOrSaveAnother('Save another');
                    handleSubmit();
                  }}
                  showActivityIndicator={isLoading.isSaveAnotherLoading}
                />
                <View style={commonStyles.mt16}>
                  <Button
                    label={`Add Medication to profile`}
                    mainStyle={commonStyles.w100per}
                    onPress={() => {
                      setSaveOrSaveAnother('Save');
                      handleSubmit();
                    }}
                    showActivityIndicator={isLoading.isSaveLoading}
                  />
                </View>
              </View>
            ) : (
              <View style={commonStyles.mt30}>
                <Button
                  label="Save and add another Medicine"
                  mainStyle={commonStyles.w100per}
                  icon={<PlusCircleIcon color={colors.pureWhite} />}
                  onPress={() => {
                    setSaveOrSaveAnother('Save another');
                    handleSubmit();
                  }}
                  showActivityIndicator={isLoading.isSaveAnotherLoading}
                />
                <View style={commonStyles.mt16}>
                  <Button
                    label="Add Medicine"
                    mainStyle={commonStyles.w100per}
                    icon={<PlusCircleIcon color={colors.pureWhite} />}
                    onPress={() => {
                      setSaveOrSaveAnother('Save');
                      handleSubmit();
                    }}
                    showActivityIndicator={isLoading.isSaveLoading}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </Formik>

      {showUsesModal ? (
        <UsesBottomSheet
          onClose={() => setUsesModal(false)}
          isVisible={showUsesModal}
          usesArray={uses => setUses(uses)}
          useData={uses}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default AddMedicineScreen;
