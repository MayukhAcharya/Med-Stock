import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  CameraIcon,
  PlusIcon,
  SpeechIcon,
  TextIcon,
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/components/FloatingButton/styles';
import { colors } from 'src/config/colors';
import { AllMedicineStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';

type navigationPropsToAddMedicine = NativeStackNavigationProp<
  AllMedicineStackParamList,
  'AddMedicineScreen'
>;

type floatinButtonProps = {
  isFistAdd: boolean;
};

const FloatingButton = (props: floatinButtonProps) => {
  const { isFistAdd } = props;
  const currentStyles = styles();
  const firstValue = useSharedValue(0);
  const secondValue = useSharedValue(0);
  const thirdValue = useSharedValue(0);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );
  const navigation = useNavigation<navigationPropsToAddMedicine>();

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
      thirdValue.value = withDelay(100, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290);
    }
    isOpen.value = !isOpen.value;
  };

  const plusIconAnimate = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    };
  });

  const speechIconAnimate = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      bottom: firstValue.value,
      transform: [{ scale: scale }],
    };
  });

  const cameraIconAnimate = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      bottom: secondValue.value,
      transform: [{ scale: scale }],
    };
  });

  const textIconAnimate = useAnimatedStyle(() => {
    const scale = interpolate(
      thirdValue.value,
      [30, 290],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      bottom: thirdValue.value,
      transform: [{ scale: scale }],
    };
  });

  return (
    <View style={[currentStyles.container]}>
      <Animated.View style={[currentStyles.smallFab, textIconAnimate]}>
        <Pressable
          style={currentStyles.smallIconsPressStyle}
          onPress={() => {
            handlePress();
            navigation.navigate('AddMedicineScreen', {
              addMedicineDetails: {
                isFirstAdd: isFistAdd,
              },
            });
          }}
        >
          <TextIcon color={colors.pureWhite} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[currentStyles.smallFab, cameraIconAnimate]}>
        <Pressable
          style={currentStyles.smallIconsPressStyle}
          onPress={() => {
            handlePress();
          }}
        >
          <CameraIcon color={colors.pureWhite} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[currentStyles.smallFab, speechIconAnimate]}>
        <Pressable
          style={currentStyles.smallIconsPressStyle}
          onPress={() => {
            handlePress();
          }}
        >
          <SpeechIcon color={colors.pureWhite} />
        </Pressable>
      </Animated.View>
      <Animated.View style={[currentStyles.fab, plusIconAnimate]}>
        <Pressable
          onPress={() => {
            handlePress();
          }}
          style={currentStyles.plusIconPressStyle}
        >
          <PlusIcon color={colors.pureWhite} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default FloatingButton;
