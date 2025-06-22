import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/LoginScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { PasswordHideIcon } from 'src/assets/svg/PasswordHideIcon';
import Button from 'src/components/Button/Button';
import { GoogleIcon } from 'src/assets/svg/GoogleIcon';
import { UnAuthStackParamList } from 'src/navigation/types';

type navigationPropsofLoginScreen = NativeStackNavigationProp<
  UnAuthStackParamList,
  'LoginScreen'
>;

const LoginScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsofLoginScreen>();
  return (
    <BackgroundFill showDesign={true} scroll>
      <View style={currentStyles.container}>
        <View style={[commonStyles.mt20, commonStyles.aic]}>
          <Text style={currentStyles.logoText}>MEDISTOCK LOGO</Text>
        </View>
        <View style={commonStyles.aic}>
          <View style={currentStyles.loginContainer}>
            <View style={commonStyles.aic}>
              <Text style={currentStyles.loginTextStyle}>Login</Text>
              <View style={[commonStyles.mt12, commonStyles.row]}>
                <Text style={currentStyles.noAccountTextstyle}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  style={commonStyles.ml6}
                  onPress={() => navigation.navigate('RegisterScreen')}
                >
                  <Text style={currentStyles.signupTextStyle}> Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={currentStyles.emailPassView}>
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
              <View style={commonStyles.alignItemsRight}>
                <TouchableOpacity>
                  <Text style={currentStyles.forgotPassTextStyle}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={commonStyles.mt25}>
              <Button
                label="Login"
                onPress={() => {}}
                mainStyle={currentStyles.buttonStyle}
              />
            </View>
            <View style={currentStyles.orViewStyle}>
              <View style={currentStyles.hzline} />
              <Text style={currentStyles.orTextStyle}>Or</Text>
              <View style={currentStyles.hzline} />
            </View>
            <View style={commonStyles.mt25}>
              <Button
                label="Continue with Google"
                onPress={() => {}}
                mainStyle={currentStyles.googleButtonMainStyle}
                icon={<GoogleIcon />}
                labelStyle={currentStyles.googleButtonLabelStyle}
              />
            </View>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default LoginScreen;
