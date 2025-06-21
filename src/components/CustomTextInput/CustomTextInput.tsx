import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  TextInputProps,
  TextInput,
} from 'react-native';
import React, { forwardRef, ReactNode } from 'react';

import { styles } from 'src/components/CustomTextInput/styles';
import { colors } from 'src/config/colors';

type textInputProps = {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  allStyle: StyleProp<ViewStyle>;
  rightContainer?: ReactNode;
  isError?: boolean;
  errorContaier?: ReactNode;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  value: string;
};

const CustomTextInput = forwardRef(
  (
    {
      label,
      labelStyle,
      allStyle,
      rightContainer,
      isError = false,
      errorContaier,
      style,
      borderColor,
      placeholder,
      value,
      ...props
    }: textInputProps & TextInputProps,
    ref: any,
  ) => {
    const currentStyles = styles();
    return (
      <View style={[currentStyles.mainContainer, allStyle]}>
        {label ? (
          <View style={currentStyles.labelViewStyle}>
            <Text style={[currentStyles.labelTextStyle, labelStyle]}>
              {label}
            </Text>
          </View>
        ) : null}
        <View
          style={[
            isError
              ? currentStyles.textInputError
              : { ...currentStyles.textInputStyle, borderColor: borderColor },
            style,
          ]}
        >
          <TextInput
            placeholder={placeholder}
            style={currentStyles.mainTextStyle}
            ref={ref}
            value={value}
            placeholderTextColor={colors.borderColor}
            {...props}
          />
          {rightContainer ? (
            <View style={currentStyles.rightContainerStyle}>
              {rightContainer}
            </View>
          ) : null}
        </View>
      </View>
    );
  },
);

export default CustomTextInput;
