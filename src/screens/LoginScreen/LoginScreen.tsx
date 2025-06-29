import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/LoginScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import Button from 'src/components/Button/Button';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import { database } from 'src/Database/database';
import Profile from 'src/Database/profileModel';

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

type formikTypes = {
  fullName: string;
  age: string;
  gender: string;
};

const LoginScreen = () => {
  const currentStyles = styles();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Your full name is required'), //needs more validations
    age: yup.string().required('Your age is required'), //needs more validations
    gender: yup.string().required('Your gender is required'), //needs more validations
  });

  const onSubmitMethod = async (values: formikTypes) => {
    setIsLoading(true);
    await database.write(async () => {
      await database.get<Profile>('profile').create(profile => {
        profile.fullName = values.fullName;
        profile.age = values.age;
        profile.gender = values.gender;
      });
    });
    setIsLoading(false);
  };

  return (
    <BackgroundFill showDesign={true} scroll>
      <View style={currentStyles.container}>
        <View style={[commonStyles.mt20, commonStyles.aic]}>
          <Text style={currentStyles.logoText}>MEDISTOCK LOGO</Text>
        </View>
        <View style={[commonStyles.aic, commonStyles.mt30]}>
          <View style={currentStyles.loginRegisterContainer}>
            <Formik
              initialValues={{ age: '', gender: '', fullName: '' }}
              onSubmit={onSubmitMethod}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                values,
                errors,
                handleSubmit,
                setFieldValue,
                touched,
              }) => (
                <View style={currentStyles.registerContainer}>
                  <View>
                    <Text style={currentStyles.signUpTextStyle}>
                      Tell us a bit about yourself
                    </Text>
                  </View>
                  <View style={currentStyles.inputContainer}>
                    <CustomTextInput
                      label="Full Name"
                      borderColor={colors.stroke}
                      value={values.fullName}
                      placeholder="Enter name"
                      allStyle={commonStyles.w296}
                      onChangeText={text => {
                        handleChange('fullName')(text);
                      }}
                      isError={
                        errors.fullName && touched.fullName ? true : false
                      }
                      errorContainer={
                        errors.fullName && touched.fullName ? (
                          <Text>{errors.fullName}</Text>
                        ) : null
                      }
                    />
                    <CustomTextInput
                      label="Your Age"
                      borderColor={colors.stroke}
                      value={values.age}
                      placeholder="Enter age"
                      allStyle={commonStyles.w296}
                      keyboardType="numeric"
                      onChangeText={text => {
                        handleChange('age')(text);
                      }}
                      isError={errors.age && touched.age ? true : false}
                      errorContainer={
                        errors.age && touched.age ? (
                          <Text>{errors.age}</Text>
                        ) : null
                      }
                    />
                    <CustomDropdown
                      label="Gender"
                      list={genderOptions}
                      borderColor={colors.stroke}
                      selectedValue={values.gender}
                      placeholder="Select gender"
                      allStyle={commonStyles.w100per}
                      style={{ backgroundColor: colors.pureWhite }}
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
                  <View style={commonStyles.mt38}>
                    <Button
                      label="Let's appName"
                      onPress={() => {
                        handleSubmit();
                      }}
                      mainStyle={currentStyles.buttonStyle}
                      showActivityIndicator={isLoading}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default LoginScreen;
