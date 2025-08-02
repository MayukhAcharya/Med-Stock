import { View, Text, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { EditIcon } from 'lucide-react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/AddHealthProfileScreen/styles';
import { MedicationProfileStack } from 'src/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { fieldRegex } from 'src/constants/constants';
import { database } from 'src/Database/database';
import HealthProfile from 'src/Database/healthProfileModel';
import { Formik } from 'formik';
import { commonStyles } from 'src/config/commonStyles';
import { colors } from 'src/config/colors';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import DateComponent from 'src/components/DateComponent/DateComponent';
import SearchDropdown from 'src/components/SearchDropdown/SearchDropdown';
import TimeComponent from 'src/components/TimeComponent/TimeComponent';
import Button from 'src/components/Button/Button';
import ReviewMedicationList from 'src/components/ReviewMedicationList/ReviewMedicationList';
import {
  addChannelId,
  onDisplayNotification,
} from 'src/utils/DisplayNotification';
import { to24HourFormat } from 'src/utils/convertTime';

type navigationPropsForHealthProfile =
  NativeStackNavigationProp<MedicationProfileStack>;

type routePropsForHealthProfile = RouteProp<
  MedicationProfileStack,
  'AddHealthProfileScreen'
>;

type formikTypes = {
  profileName: string;
  medicationType: string;
  gender: string;
  medicineName: string;
  id: string;
  medicationTime: any;
  category?: any;
};

type medicineDataTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: string;
  category: any;
  id: string;
  notificationId: string;
};

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

const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

const AddHealthProfileScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForHealthProfile>();
  const idRef = useRef('');
  const route = useRoute<routePropsForHealthProfile>();

  const [reviewMeds, setReviewMeds] = useState<boolean>(false);
  const [medicineArray, setMedicineArray] = useState<medicineDataTypes[]>([]);
  const [allMedicines, setAllMedicines] = useState<medicineData[]>([]);
  const [filterData, setFilterData] = useState<medicineData[]>(allMedicines);
  const [hasArray, setHasArray] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const numbers = ['1', '2', '3', '4'];

  const validationSchema = yup.object().shape({
    profileName: yup
      .string()
      .matches(fieldRegex, 'No special characters are allowed')
      .required('Name of Profile is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      ),
    medicationType: yup
      .string()
      .matches(fieldRegex, 'No special characters are allowed')
      .required('Type of medication is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      ),
    gender: yup.string().required('gender is required'),
  });

  const getRandomImageMethod = (gender: string) => {
    if (gender === 'Male') {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
    }
  };

  const getMedicineDataMethod = () => {
    try {
      const medicineData = database.get('medicines');
      medicineData
        .query()
        .observe()
        .forEach(item => {
          let temp: any = [];
          item.forEach(data => {
            temp.push(data._raw);
          });
          const finalList = temp.map((item: any) => {
            return {
              ...item,
              label: item.medicine_name,
              value: item.id,
            };
          });
          setAllMedicines(finalList);
        });
    } catch (error) {
      setAllMedicines([]);
    }
  };

  const addMedicineMethod = (values: formikTypes) => {
    if (!values.id) {
      return false;
    } else {
      return true;
    }
  };

  const addHealthProfileMethod = async (values: formikTypes) => {
    setIsLoading(true);
    try {
      await database.write(async () => {
        await database
          .get<HealthProfile>('healthProfiles')
          .create(healthProfile => {
            healthProfile.profileName = values.profileName;
            healthProfile.medicationType = values.medicationType;
            healthProfile.gender = values.gender;
            healthProfile.genderAvatar = getRandomImageMethod(values.gender);
            healthProfile.medicineArray = JSON.stringify(medicineArray);
            healthProfile.startDate = fromDate.toISOString();
            healthProfile.endDate = toDate.toISOString();
          })
          .then(async res => {
            await addNotificationOfProfile(
              medicineArray,
              fromDate.toISOString(),
              values.profileName,
            );
            idRef.current = res._raw.id;
          });
      });
      if (
        route.params &&
        route.params.addHealthProfileData &&
        route.params.addHealthProfileData.isFirstAdd
      ) {
        await onDisplayNotification(
          `${values.profileName}'s health profile is added!!🎊`,
          `You're all set! Your health profile is complete - let's keep you on track with your meds!`,
        );
      }

      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
    }
  };

  const addNotificationOfProfile = async (
    medicineArray: medicineDataTypes[],
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

  const searchMethod = (searchString: string) => {
    const searchedData = allMedicines.filter(item =>
      item.medicine_name.toLowerCase().includes(searchString.toLowerCase()),
    );

    setFilterData(searchedData);
  };

  const manageListToDisplay = () => {
    if (searchString && filterData) {
      return filterData;
    } else {
      return allMedicines;
    }
  };

  const checkFieldAndSaveMethod = async (values: formikTypes) => {
    if (values.profileName && values.medicationType && values.gender) {
      await addHealthProfileMethod(values);
      navigation.navigate('AddMedicineScreen', {
        medicationData: {
          isHealthProfile: true,
          id: idRef.current,
          allMedicineArray: medicineArray,
          profileName: values.profileName,
          startDate: fromDate.toISOString(),
        },
      });
    } else {
      Alert.alert('Warning!', 'Please fill in the required fields first.', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };

  const handleAlertMethod = (values: formikTypes) => {
    Alert.alert(
      'Warning!',
      'All your changes will be lost! Save your health profile?',
      [
        {
          text: 'Yes',
          onPress: () => {
            checkFieldAndSaveMethod(values);
          },
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            navigation.navigate('AddMedicineScreen', {
              medicationData: {
                isHealthProfile: false,
              },
            });
          },
        },
      ],
    );
  };

  useEffect(() => {
    getMedicineDataMethod();
  }, []);
  return (
    <BackgroundFill showDesign={false} scroll={true} backgroundColor="white">
      <View style={currentStyles.container}>
        <Formik
          initialValues={{
            gender: '',
            medicationType: '',
            profileName: '',
            id: '',
            medicineName: '',
            category: '',
            medicationTime: new Date(),
          }}
          onSubmit={addHealthProfileMethod}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            dirty,
            handleSubmit,
            touched,
          }) => (
            <>
              <View style={currentStyles.inputContainer}>
                <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                  <CustomTextInput
                    label="Profile Name*"
                    allStyle={commonStyles.w45Per}
                    borderColor={colors.borderColor}
                    value={values.profileName}
                    placeholder="Name"
                    onChangeText={handleChange('profileName')}
                    isError={
                      errors.profileName && touched.profileName ? true : false
                    }
                    errorContainer={
                      errors.profileName && touched.profileName ? (
                        <>
                          <Text>{errors.profileName}</Text>
                        </>
                      ) : null
                    }
                  />
                  <CustomTextInput
                    label="Type of medication*"
                    allStyle={commonStyles.w45Per}
                    borderColor={colors.borderColor}
                    value={values.medicationType}
                    placeholder="Fever/Infection"
                    onChangeText={handleChange('medicationType')}
                    isError={
                      errors.medicationType && touched.medicationType
                        ? true
                        : false
                    }
                    errorContainer={
                      errors.medicationType && touched.medicationType ? (
                        <>
                          <Text>{errors.medicationType}</Text>
                        </>
                      ) : null
                    }
                  />
                </View>
                <CustomDropdown
                  label="Gender*"
                  list={genderOptions}
                  borderColor={colors.borderColor}
                  selectedValue={values.gender}
                  placeholder="Select gender"
                  allStyle={commonStyles.w100per}
                  style={{ backgroundColor: colors.pureWhite }}
                  labelSyle={currentStyles.labelStyle}
                  onValueSelect={item => {
                    setFieldValue('gender', item.label);
                  }}
                  isError={errors.gender && touched.gender ? true : false}
                  errorContainer={
                    errors.gender && touched.gender ? (
                      <>
                        <Text>{errors.gender}</Text>
                      </>
                    ) : null
                  }
                />
                <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                  <DateComponent
                    label="Start Date"
                    borderColor={colors.borderColor}
                    value={fromDate}
                    placeholder="date"
                    allStyle={commonStyles.w160}
                    style={{ backgroundColor: colors.pureWhite }}
                    labelSyle={currentStyles.labelStyle}
                    onChange={date => {
                      setFromDate(date);
                    }}
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
                    }}
                  />
                </View>
                <View style={currentStyles.boxContainer}>
                  <View>
                    <SearchDropdown
                      label="Add Medicine"
                      list={manageListToDisplay()}
                      allStyle={commonStyles.w328}
                      borderColor={colors.borderColor}
                      selectedValue={values.medicineName}
                      placeholder="Calpol-650"
                      onValueSelect={item => {
                        setFieldValue('medicineName', item.label);
                        setFieldValue('id', item.value);
                        setFieldValue('category', item.category);
                        setSearchString('');
                        setFilterData([]);
                      }}
                      onChangeText={text => {
                        setSearchString(text);
                        searchMethod(text);
                      }}
                      style={{ backgroundColor: colors.pureWhite }}
                      onAddPress={() => {
                        handleAlertMethod(values);
                      }}
                      onClose={() => {
                        setFilterData([]);
                        setSearchString('');
                      }}
                    />
                  </View>
                  <View
                    style={[
                      commonStyles.row,
                      commonStyles.spaceBetween,
                      commonStyles.aic,
                    ]}
                  >
                    <TimeComponent
                      label="Medication Time"
                      allStyle={commonStyles.w218}
                      borderColor={colors.borderColor}
                      value={values.medicationTime}
                      placeholder="8:40 am"
                      onChange={time => {
                        setFieldValue('medicationTime', time);
                      }}
                      style={{ backgroundColor: colors.pureWhite }}
                    />
                    <Button
                      label="Add"
                      mainStyle={currentStyles.addButtonMainStyle}
                      onPress={() => {
                        if (addMedicineMethod(values)) {
                          setMedicineArray([
                            ...medicineArray,
                            {
                              medicineName: values.medicineName,
                              medicineId: values.id,
                              medicationTime:
                                values.medicationTime.toLocaleTimeString(
                                  'en-IN',
                                  {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  },
                                ),
                              category: values.category,
                              id: `${values.id}${new Date().getTime()}`,
                              notificationId: `${values.profileName}${
                                values.id
                              }${new Date().getTime()}`,
                            },
                          ]);
                          setFieldValue('medicineName', '');
                          setFieldValue('id', '');
                          setFieldValue('category', '');
                          setHasArray(false);
                        }
                      }}
                      disable={values.id === ''}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[
                  commonStyles.mt10,
                  commonStyles.row,
                  commonStyles.spaceBetween,
                ]}
              >
                <Text style={currentStyles.totalQuantityTextStyle}>
                  Total Medicines: {medicineArray.length}
                </Text>
                {hasArray ? (
                  <Text style={currentStyles.errorText}>
                    At least one medicine is required
                  </Text>
                ) : null}
              </View>
              <View style={[commonStyles.mt30, commonStyles.rowGap10]}>
                <Button
                  label="Review your medicines"
                  mainStyle={currentStyles.reviewMedicinesMainStyle}
                  labelStyle={currentStyles.reviewMedicinesLabelStyle}
                  icon={<EditIcon size={18} />}
                  onPress={() => {
                    setReviewMeds(true);
                  }}
                />
                <Button
                  label="Save Health Profile"
                  mainStyle={commonStyles.w100per}
                  onPress={() => {
                    if (medicineArray.length > 0) {
                      handleSubmit();
                    } else {
                      setHasArray(true);
                    }
                  }}
                  disable={!dirty}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
      {reviewMeds ? (
        <ReviewMedicationList
          isVisible={reviewMeds}
          onClose={() => {
            setReviewMeds(false);
          }}
          medicationList={medicineArray}
          onUpdation={array => {
            setMedicineArray(array);
          }}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default AddHealthProfileScreen;
