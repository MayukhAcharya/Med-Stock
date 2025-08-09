import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { UnAuthStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/OnboardingScreen/styles';
import normalize, { height } from 'src/config/normalize';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from 'src/config/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type navigationPropsForOnboarding = NativeStackNavigationProp<
  UnAuthStackParamList,
  'OnboardingScreen'
>;

const OnboardingScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForOnboarding>();
  const insets = useSafeAreaInsets();

  const pages = [
    {
      backgroundColor: '#CDE5D1',
      image: (
        <View>
          <LottieView
            source={require('src/assets/lottie/Sloth.json')}
            loop
            autoPlay
            style={currentStyles.lottieStyle}
          />
        </View>
      ),
      title: 'Welcome to Your Home Pharmacy',
      subtitle:
        'Easily add medicines from your home stock to track quantity and availability at a glance.',
    },
    {
      backgroundColor: '#BCCCDC',
      image: (
        <View>
          <LottieView
            source={require('src/assets/lottie/Shield.json')}
            loop
            autoPlay
            style={currentStyles.lottieStyle}
          />
        </View>
      ),
      title: 'Never Miss an Expiry Date',
      subtitle:
        'Get timely notifications before any medicine expires, keeping your family safe and your supplies fresh.',
    },
    {
      backgroundColor: '#FAF7F0',
      image: (
        <View>
          <LottieView
            source={require('src/assets/lottie/Family.json')}
            loop
            autoPlay
            style={currentStyles.lottieStyle}
          />
        </View>
      ),
      title: 'Personalized Medication Schedules',
      subtitle:
        'Create health profiles for you and your family to receive timely reminders for daily medications.',
    },
  ];

  const skipButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={currentStyles.skipButtonStyle} {...props}>
        <Text style={currentStyles.skipButtonTextStyle}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={currentStyles.nextButtonStyle} {...props}>
        <Text style={currentStyles.skipButtonTextStyle}>Next</Text>
      </TouchableOpacity>
    );
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={currentStyles.doneButtonStyle} {...props}>
        <Text style={currentStyles.doneButtonTextStyle}>Let's go</Text>
      </TouchableOpacity>
    );
  };

  const DotComponent = ({ selected }: any) => {
    const widthAnim = useRef(
      new Animated.Value(selected ? normalize(20) : normalize(8)),
    ).current;

    useEffect(() => {
      Animated.spring(widthAnim, {
        toValue: selected ? normalize(20) : normalize(8),
        useNativeDriver: false,
        friction: 5,
      }).start();
    }, [selected]);

    return (
      <Animated.View
        style={{
          height: normalize(8),
          borderRadius: normalize(6),
          backgroundColor: selected ? colors.pureBlack : '#5b5757ff',
          marginHorizontal: normalize(4),
          width: widthAnim,
        }}
      />
    );
  };

  const handleNavigation = () => {
    navigation.replace('LoginRegisterScreen');
  };

  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <Onboarding
        pages={pages}
        titleStyles={currentStyles.titleStyle}
        subTitleStyles={currentStyles.subTitleStyles}
        containerStyles={currentStyles.container}
        bottomBarHighlight={false}
        imageContainerStyles={currentStyles.paddingBottom}
        SkipButtonComponent={skipButton}
        NextButtonComponent={nextButton}
        DoneButtonComponent={doneButton}
        DotComponent={DotComponent}
        onSkip={handleNavigation}
        onDone={handleNavigation}
        bottomBarHeight={normalize(100) + insets.bottom}
      />
    </BackgroundFill>
  );
};

export default OnboardingScreen;
