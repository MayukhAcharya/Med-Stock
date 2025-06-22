import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/RegisterScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import { BackArrowIcon } from 'src/assets/svg/BackArrowIcon';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { PasswordHideIcon } from 'src/assets/svg/PasswordHideIcon';
import Button from 'src/components/Button/Button';

const RegisterScreen = () => {
  const currentStyles = styles();
  return (
    <BackgroundFill showDesign={true} scroll>
      <View style={currentStyles.container}>
        <View style={[commonStyles.mt20, commonStyles.aic]}>
          <Text style={currentStyles.logoText}>MEDISTOCK LOGO</Text>
        </View>
        <View style={commonStyles.aic}>
          <View style={currentStyles.registerContainer}>
            <TouchableOpacity>
              <BackArrowIcon />
            </TouchableOpacity>
            <View style={commonStyles.mt25}>
              <Text style={currentStyles.signUpTextStyle}>Sign up</Text>
              <View style={[commonStyles.mt12, commonStyles.row]}>
                <Text style={currentStyles.accountTextstyle}>
                  Already have an account?{'  '}
                </Text>
                <TouchableOpacity>
                  <Text style={currentStyles.LoginTextStyle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={currentStyles.inputContainer}>
              <CustomTextInput
                label="Full Name"
                borderColor={colors.stroke}
                value=""
                placeholder="Enter name"
                allStyle={commonStyles.w296}
              />
              <CustomTextInput
                label="Email"
                borderColor={colors.stroke}
                value=""
                placeholder="Enter mail"
                allStyle={commonStyles.w296}
                keyboardType="email-address"
              />
              <CustomTextInput
                label="Password"
                borderColor={colors.stroke}
                value=""
                placeholder="Enter mail"
                allStyle={commonStyles.w296}
                secureTextEntry={true}
                rightContainer={
                  <View>
                    <PasswordHideIcon />
                  </View>
                }
              />
            </View>
            <View style={commonStyles.mt25}>
              <Button
                label="Register"
                onPress={() => {}}
                mainStyle={currentStyles.buttonStyle}
              />
            </View>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default RegisterScreen;
