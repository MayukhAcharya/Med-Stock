import { View, Text, Modal, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EditIcon } from 'lucide-react-native';
import * as yup from 'yup';

import { styles } from 'src/components/AddHealthProfileBottomSheet/styles';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import Button from 'src/components/Button/Button';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import ReviewMedicationList from 'src/components/ReviewMedicationList/ReviewMedicationList';
import { Formik } from 'formik';
import { database } from 'src/Database/database';
import normalize from 'src/config/normalize';
import TimeComponent from '../TimeComponent/TimeComponent';
import { fieldRegex, timeoutConstant } from 'src/constants/constants';
import HealthProfile from 'src/Database/healthProfileModel';

type addHealthProfileProps = {
  onClose: () => void;
  isVisible: boolean;
};

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

const AddHealthProfileBottomSheet = (props: addHealthProfileProps) => {
  const { onClose, isVisible } = props;
  const currentStyles = styles();

  const [reviewMeds, setReviewMeds] = useState<boolean>(false);
  const [medicineArray, setMedicineArray] = useState<medicineDataTypes[]>([]);
  const [allMedicines, setAllMedicines] = useState<medicineData[]>([]);
  const [hasArray, setHasArray] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const addHealthProfileMethod = (values: formikTypes) => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        await database.write(async () => {
          await database
            .get<HealthProfile>('healthProfiles')
            .create(healthProfile => {
              healthProfile.profileName = values.profileName;
              healthProfile.medicationType = values.medicationType;
              healthProfile.gender = values.gender;
              healthProfile.genderAvatar = getRandomImageMethod(values.gender);
              healthProfile.medicineArray = JSON.stringify(medicineArray);
            });
        });
      }, timeoutConstant);
      onClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMedicineDataMethod();
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={() => onClose()}
      transparent
    >
      <StatusBar
        backgroundColor={colors.backgroundTransparent}
        barStyle={'light-content'}
        translucent
      />
      <View style={currentStyles.container}>
        <View style={currentStyles.subContainer}>
          <View style={commonStyles.aic}>
            <Text style={currentStyles.addHealthProfileStyle}>
              Add Health Profile
            </Text>
          </View>
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
                      label="Profile Name"
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
                      label="Type of medication"
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
                    label="Gender"
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
                  <View style={currentStyles.boxContainer}>
                    <View>
                      <CustomDropdown
                        label="Add Medicine"
                        list={allMedicines}
                        allStyle={commonStyles.w312}
                        borderColor={colors.borderColor}
                        selectedValue={values.medicineName}
                        placeholder="Calpol-650"
                        onValueSelect={item => {
                          setFieldValue('medicineName', item.label);
                          setFieldValue('id', item.value);
                          setFieldValue('category', item.category);
                        }}
                        dropdownMainStyle={{
                          maxHeight: normalize(150, 'height'),
                        }}
                        style={{ backgroundColor: colors.pureWhite }}
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
    </Modal>
  );
};

export default AddHealthProfileBottomSheet;
