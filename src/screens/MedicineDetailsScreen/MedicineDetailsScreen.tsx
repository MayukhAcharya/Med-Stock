import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/screens/MedicineDetailsScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';
import UsesBottomSheet from 'src/components/UsesBottomSheet/UsesBottomSheet';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import DateComponent from 'src/components/DateComponent/DateComponent';
import {
  initialValues,
  medicineDataTypes,
} from 'src/screens/MedicineDetailsScreen/types';
import { AllMedicineStackParamList } from 'src/navigation/types';
import { database } from 'src/Database/database';
import Medicine from 'src/Database/medicineModel';
import {
  fieldRegex,
  numberFieldRegex,
  timeoutConstant,
} from 'src/constants/constants';

type routeProps = RouteProp<AllMedicineStackParamList>;

type navigationPropForMedicineDetials = NativeStackNavigationProp<
  AllMedicineStackParamList,
  'MedicineDetailsScreen'
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

const MedicineDetailsScreen = () => {
  const currentStyles = styles();
  const route = useRoute<routeProps>();
  const navigation = useNavigation<navigationPropForMedicineDetials>();

  const [showUsesModal, setUsesModal] = useState<boolean>(false);
  const [fieldValues, setFieldValues] =
    useState<medicineDataTypes>(initialValues);
  const [uses, setUses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    isSaveLoading: false,
    isMarkAsRequired: false,
  });

  const validationSchema = yup.object().shape({
    medicine_name: yup
      .string()
      .required('Medicine name is required')
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
    expiry_date: yup.string().required('Expiry date of medicine is required'),
  });

  const getMedicineDetailsData = async () => {
    try {
      const medicineDetails = await database
        .get('medicines')
        .find(route.params?.medicineDetails.id);
      const data: any = medicineDetails._raw;
      setFieldValues(data);
      setUses(JSON.parse(data.uses));
    } catch (error) {}
  };

  const updateMedicineDetailsMethod = async (values: medicineDataTypes) => {
    setIsLoading(prev => ({
      ...prev,
      isSaveLoading: true,
    }));
    try {
      const medicineUpdate = await database
        .get<Medicine>('medicines')
        .find(route.params?.medicineDetails.id);
      await database.write(async () => {
        await medicineUpdate.update(() => {
          medicineUpdate.medicineName = values.medicine_name;
          medicineUpdate.category = values.category;
          medicineUpdate.quantity = values.quantity;
          medicineUpdate.expiryDate = values.expiry_date;
          medicineUpdate.uses = JSON.stringify(uses);
          medicineUpdate.notes = values.notes;
        });
      });
      setIsLoading(prev => ({
        ...prev,
        isSaveLoading: false,
      }));
      getMedicineDetailsData();
      navigation.goBack();
    } catch (error) {
      setIsLoading(prev => ({
        ...prev,
        isSaveLoading: false,
      }));
    }
  };

  const markAsRequiredMethod = async (values: medicineDataTypes) => {
    setIsLoading(prev => ({
      ...prev,
      isMarkAsRequired: true,
    }));
    try {
      const medicineUpdate = await database
        .get<Medicine>('medicines')
        .find(route.params?.medicineDetails.id);
      await database.write(async () => {
        await medicineUpdate.update(() => {
          medicineUpdate.markAsRequired = values.mark_as_required
            ? false
            : true;
        });
      });
      setIsLoading(prev => ({
        ...prev,
        isMarkAsRequired: false,
      }));
      getMedicineDetailsData();
    } catch (error) {
      setIsLoading(prev => ({
        ...prev,
        isMarkAsRequired: true,
      }));
    }
  };

  const alertMethod = (values: medicineDataTypes) => {
    Alert.alert(
      'Warning',
      values.mark_as_required
        ? `This action will mark ${values.medicine_name} as not required and the quantity will be updated to 0 and you will not get notifications when it is expired. Continue?`
        : `This action will mark ${values.medicine_name} as required and you will get notifications when it is expired.`,
      [
        {
          text: 'Yes',
          onPress: () => {
            markAsRequiredMethod(values);
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getMedicineDetailsData();
      return () => unsubscribe;
    }, []),
  );

  return (
    <BackgroundFill showDesign={false} backgroundColor="white" scroll>
      <Formik
        initialValues={fieldValues}
        onSubmit={updateMedicineDetailsMethod}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          dirty,
        }) => (
          <View style={currentStyles.container}>
            <View style={currentStyles.inputContainer}>
              <CustomTextInput
                label="Medicine Name"
                borderColor={colors.borderColor}
                value={values.medicine_name}
                placeholder="Medicine Name"
                allStyle={commonStyles.w100per}
                style={{ backgroundColor: colors.pureWhite }}
                labelStyle={currentStyles.labelStyle}
                onChangeText={text => {
                  handleChange('medicine_name')(text);
                }}
                isError={
                  errors.medicine_name && touched.medicine_name ? true : false
                }
                errorContainer={
                  errors.medicine_name && touched.medicine_name ? (
                    <Text>{errors.medicine_name}</Text>
                  ) : null
                }
                editable={values.mark_as_required}
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
                disable={!values.mark_as_required}
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
                  editable={values.mark_as_required}
                />
                <DateComponent
                  label="Expiry Date"
                  borderColor={colors.borderColor}
                  value={values.expiry_date}
                  placeholder="date"
                  allStyle={commonStyles.w160}
                  style={{ backgroundColor: colors.pureWhite }}
                  labelSyle={currentStyles.labelStyle}
                  onChange={date => {
                    setFieldValue('expiry_date', date.toISOString());
                  }}
                  isError={
                    errors.expiry_date && touched.expiry_date ? true : false
                  }
                  errorContainer={
                    errors.expiry_date && touched.expiry_date ? (
                      <Text>{errors.expiry_date}</Text>
                    ) : null
                  }
                  disable={!values.mark_as_required}
                />
              </View>

              <View style={currentStyles.boxView}>
                <View
                  style={[
                    commonStyles.spaceBetween,
                    commonStyles.row,
                    commonStyles.aic,
                  ]}
                >
                  <Text style={currentStyles.boxHeaderText}>Uses</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setUsesModal(true);
                    }}
                    disabled={!values.mark_as_required}
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
              <CustomTextInput
                label="Note"
                borderColor={colors.borderColor}
                value={values.notes}
                placeholder="Add doctor notes..."
                allStyle={commonStyles.w100per}
                style={{
                  backgroundColor: colors.pureWhite,
                  height: normalize(100, 'height'),
                }}
                labelStyle={currentStyles.labelStyle}
                multiline
                onChangeText={text => {
                  handleChange('notes')(text);
                }}
                editable={values.mark_as_required}
              />
            </View>
            <View style={currentStyles.buttonView}>
              <Button
                label={
                  values.mark_as_required
                    ? 'Mark as Not Required'
                    : 'Mark as Required'
                }
                mainStyle={[currentStyles.notRequiredStyle]}
                labelStyle={currentStyles.notRequiredLabelStyle}
                onPress={() => {
                  alertMethod(values);
                }}
                showActivityIndicator={isLoading.isMarkAsRequired}
                indicatorColor={colors.extraDarkBlue}
              />
              <Button
                label="Save medicine details"
                mainStyle={commonStyles.w100per}
                onPress={() => {
                  handleSubmit();
                }}
                showActivityIndicator={isLoading.isSaveLoading}
                disable={!dirty || !values.mark_as_required}
              />
            </View>
          </View>
        )}
      </Formik>

      {showUsesModal ? (
        <UsesBottomSheet
          onClose={() => setUsesModal(false)}
          isVisible={showUsesModal}
          useData={uses}
          usesArray={data => {
            setUses(data);
          }}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default MedicineDetailsScreen;
