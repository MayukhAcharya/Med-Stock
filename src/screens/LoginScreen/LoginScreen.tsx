import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef } from 'react';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/LoginScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { PasswordHideIcon } from 'src/assets/svg/PasswordHideIcon';
import Button from 'src/components/Button/Button';
import { GoogleIcon } from 'src/assets/svg/GoogleIcon';
import { BackArrowIcon } from 'src/assets/svg/BackArrowIcon';
import normalize from 'src/config/normalize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; //remove later
import { MainStackParamList } from 'src/navigation/types'; //remove later
import { useNavigation } from '@react-navigation/native';

type navigationPropsTest = NativeStackNavigationProp<
  MainStackParamList,
  'AuthStackScreens'
>;

const LoginScreen = () => {
  const currentStyles = styles();
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<navigationPropsTest>();

  const scrollToRegisterView = (location: any) => {
    scrollViewRef.current?.scrollTo({
      x: location,
      y: 0,
      animated: true,
    });
  };

  const scrollToLoginView = (location: any) => {
    scrollViewRef.current?.scrollTo({
      x: location,
      y: 0,
      animated: true,
    });
  };
  return (
    <BackgroundFill showDesign={true} scroll>
      <View style={currentStyles.container}>
        <View style={[commonStyles.mt20, commonStyles.aic]}>
          <Text style={currentStyles.logoText}>MEDISTOCK LOGO</Text>
        </View>
        <View style={commonStyles.aic}>
          <View style={currentStyles.loginRegisterContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            >
              <View style={currentStyles.loginContainer}>
                <View style={commonStyles.aic}>
                  <Text style={currentStyles.loginTextStyle}>Login</Text>
                  <View style={[commonStyles.mt12, commonStyles.row]}>
                    <Text style={currentStyles.noAccountTextstyle}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      style={commonStyles.ml6}
                      onPress={() => {
                        scrollToRegisterView(normalize(686));
                      }}
                    >
                      <Text style={currentStyles.signupTextStyle}>
                        {' '}
                        Sign up
                      </Text>
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
                    onPress={() => {
                      navigation.navigate('AuthStackScreens');
                    }}
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
              <View style={currentStyles.registerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    scrollToLoginView(0);
                  }}
                >
                  <BackArrowIcon />
                </TouchableOpacity>
                <View style={commonStyles.mt25}>
                  <Text style={currentStyles.signUpTextStyle}>Sign up</Text>
                  <View style={[commonStyles.mt12, commonStyles.row]}>
                    <Text style={currentStyles.accountTextstyle}>
                      Already have an account?{'  '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        scrollToLoginView(0);
                      }}
                    >
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
                <View style={commonStyles.mt38}>
                  <Button
                    label="Register"
                    onPress={() => {}}
                    mainStyle={currentStyles.buttonStyle}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default LoginScreen;
