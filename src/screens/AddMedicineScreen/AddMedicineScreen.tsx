import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/AddMedicineScreen/styles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import Button from 'src/components/Button/Button';
import UsesBottomSheet from 'src/components/UsesBottomSheet/UsesBottomSheet';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import DateComponent from 'src/components/DateComponent/DateComponent';

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
];

type addMedicineFormikTypes = {
  medicineName: string;
  quantity: string;
  category?: string;
};

const AddMedicineScreen = () => {
  const currentStyles = styles();
  const [showUsesModal, setUsesModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const validationSchema = yup.object().shape({
    medicineName: yup.string().required('Medicine name is required'),
    quantity: yup.string().required('Quantity is required'),
    category: yup.string().required('category of medicine is required'),
  });

  const addMedicineSubmitMethod = (values: addMedicineFormikTypes) => {
    console.log(values);
  };

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <Formik
        initialValues={{
          medicineName: '',
          quantity: '',
          category: 'Tablet',
        }}
        onSubmit={addMedicineSubmitMethod}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldValue, values, errors, touched }) => (
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
                    Pain Relief, Treatment of Fever
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Button
                label="Add Medicine"
                mainStyle={commonStyles.w100per}
                icon={<PlusCircleIcon color={colors.pureWhite} />}
                onPress={() => {}}
              />
            </View>
          </View>
        )}
      </Formik>

      {showUsesModal ? (
        <UsesBottomSheet
          onClose={() => setUsesModal(false)}
          isVisible={showUsesModal}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default AddMedicineScreen;
