import { View, Text, Modal, Pressable, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { EditIcon } from 'lucide-react-native';

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
};

type medicineDataTypes = {
  medicineName: string;
  medicineId: string;
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

  const addMedicineMethod = (values: formikTypes, setFieldValue: any) => {
    const findDuplicate = medicineArray.find(
      item => item.medicineId === values.id,
    );
    if (!findDuplicate) {
      return true;
    } else {
      return false;
    }
  };

  const addHealthProfileMethod = (values: formikTypes) => {
    console.log(values);
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
      <Pressable style={currentStyles.container}>
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
            }}
            onSubmit={addHealthProfileMethod}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              errors,
              dirty,
              handleSubmit,
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
                    />
                    <CustomTextInput
                      label="Type of medication"
                      allStyle={commonStyles.w45Per}
                      borderColor={colors.borderColor}
                      value={values.medicationType}
                      placeholder="Fever/Infection"
                      onChangeText={handleChange('medicationType')}
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
                  />
                  <View
                    style={[
                      commonStyles.row,
                      commonStyles.spaceBetween,
                      commonStyles.aic,
                    ]}
                  >
                    <CustomDropdown
                      label="Add Medicine"
                      list={allMedicines}
                      allStyle={commonStyles.w218}
                      borderColor={colors.borderColor}
                      selectedValue={values.medicineName}
                      placeholder="Calpol-650"
                      onValueSelect={item => {
                        setFieldValue('medicineName', item.label);
                        setFieldValue('id', item.value);
                      }}
                      dropdownMainStyle={{
                        maxHeight: normalize(150, 'height'),
                      }}
                      isError={
                        addMedicineMethod(values, setFieldValue) === false
                      }
                    />

                    <Button
                      label="Add"
                      mainStyle={currentStyles.addButtonMainStyle}
                      onPress={() => {
                        if (addMedicineMethod(values, setFieldValue)) {
                          setMedicineArray([
                            ...medicineArray,
                            {
                              medicineName: values.medicineName,
                              medicineId: values.id,
                            },
                          ]);
                          setFieldValue('medicineName', '');
                          setFieldValue('id', '');
                        }
                      }}
                      disable={
                        values.id === '' ||
                        addMedicineMethod(values, setFieldValue) === false
                      }
                    />
                  </View>
                </View>
                {addMedicineMethod(values, setFieldValue) === false ? (
                  <Text style={currentStyles.duplicateMedicineTextStyle}>
                    Cannot add Duplicate medicine
                  </Text>
                ) : null}

                <View style={commonStyles.mt10}>
                  <Text style={currentStyles.totalQuantityTextStyle}>
                    Total Medicines: {medicineArray.length}
                  </Text>
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
                    onPress={() => {}}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </Pressable>
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
