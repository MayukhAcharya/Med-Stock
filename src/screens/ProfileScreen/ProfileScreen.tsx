import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import { SaveIcon } from 'lucide-react-native';

import { styles } from 'src/screens/ProfileScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import { database } from 'src/Database/database';
import { initialValues, profileTypes } from './types';
import Profile from 'src/Database/profileModel';
import {
  fieldRegex,
  numberFieldRegex,
  timeoutConstant,
} from 'src/constants/constants';

const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Prefer not to say',
    value: 'noSay',
  },
];

const ProfileScreen = () => {
  const currentStyles = styles();

  const [fieldValues, setFieldValues] = useState<profileTypes>(initialValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    full_name: yup
      .string()
      .matches(fieldRegex, 'No special characters are allowed')
      .required('Your full name is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      ),
    age: yup
      .string()
      .matches(numberFieldRegex, 'Only numbers are allowed')
      .required('Your age is required')
      .test(
        'blank-space',
        'No blank spaces are allowed',
        (text: any) => text && text.trim().length !== 0,
      )
      .test(
        'age',
        'Age must be between 18-100',
        (text: any) => Number(text) >= 18 && Number(text) <= 100,
      ),
    gender: yup.string().required('Your gender is required'),
  });

  const getProfileDataMethod = () => {
    const profileData = database.get('profile');
    profileData
      .query()
      .observe()
      .forEach(item => {
        let temp: any = [];
        item.forEach(data => {
          temp.push(data._raw);
        });
        setFieldValues(temp[0]);
      });
  };

  const updateProfileMethod = async (
    values: profileTypes,
    { resetForm }: { resetForm: (options?: any) => void },
  ) => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const profileUpdate = await database
          .get<Profile>('profile')
          .find(values.id);
        await database.write(async () => {
          await profileUpdate.update(() => {
            profileUpdate.fullName = values.full_name;
            profileUpdate.age = values.age;
            profileUpdate.gender = values.gender;
            profileUpdate.allergies = values.allergies;
          });
        });
        resetForm({ values });
        setIsLoading(false);
      }, timeoutConstant); //adding a timeout because it SAVES SO FAAAST GAADDAAYUUM
    } catch (error) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getProfileDataMethod();
      return () => unsubscribe;
    }, []),
  );
  return (
    <BackgroundFill backgroundColor="white" scroll>
      <Formik
        initialValues={fieldValues}
        onSubmit={updateProfileMethod}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
          handleSubmit,
          dirty,
        }) => (
          <View style={currentStyles.container}>
            <View style={currentStyles.inputContainer}>
              <CustomTextInput
                label="Name"
                borderColor={colors.borderColor}
                value={values.full_name}
                placeholder="Your Name"
                allStyle={commonStyles.w100per}
                style={{ backgroundColor: colors.pureWhite }}
                labelStyle={currentStyles.labelStyle}
                onChangeText={text => {
                  handleChange('full_name')(text);
                }}
                isError={errors.full_name && touched.full_name ? true : false}
                errorContainer={
                  errors.full_name && touched.full_name ? (
                    <Text>{errors.full_name}</Text>
                  ) : null
                }
              />
              <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                <CustomTextInput
                  label="Age"
                  borderColor={colors.borderColor}
                  value={values.age}
                  placeholder="Your age"
                  allStyle={commonStyles.w160}
                  keyboardType="numeric"
                  style={{ backgroundColor: colors.pureWhite }}
                  labelStyle={currentStyles.labelStyle}
                  onChangeText={text => {
                    handleChange('age')(text);
                  }}
                  isError={errors.age && touched.age ? true : false}
                  errorContainer={
                    errors.age && touched.age ? <Text>{errors.age}</Text> : null
                  }
                />
                <CustomDropdown
                  label="Gender"
                  list={genderOptions}
                  borderColor={colors.borderColor}
                  selectedValue={values.gender}
                  placeholder="Select gender"
                  allStyle={commonStyles.w160}
                  style={{ backgroundColor: colors.pureWhite }}
                  labelSyle={currentStyles.labelStyle}
                  onValueSelect={item => {
                    setFieldValue('gender', item.label);
                  }}
                  isError={errors.gender && touched.gender ? true : false}
                  errorContainer={
                    errors.gender && touched.gender ? (
                      <Text>{errors.gender}</Text>
                    ) : null
                  }
                />
              </View>
              <CustomTextInput
                label="Allergies(if any)"
                borderColor={colors.borderColor}
                value={values.allergies}
                placeholder="List allergies..."
                allStyle={[commonStyles.w100per]}
                style={{
                  backgroundColor: colors.pureWhite,
                  height: normalize(100, 'height'),
                }}
                labelStyle={currentStyles.labelStyle}
                multiline
                onChangeText={text => {
                  handleChange('allergies')(text);
                }}
              />
            </View>
            <View style={commonStyles.mt30}>
              <Button
                label="Save changes"
                icon={<SaveIcon color={colors.pureWhite} />}
                mainStyle={commonStyles.w100per}
                onPress={() => {
                  handleSubmit();
                }}
                showActivityIndicator={isLoading}
                disable={!dirty}
              />
            </View>
          </View>
        )}
      </Formik>
    </BackgroundFill>
  );
};

export default ProfileScreen;
