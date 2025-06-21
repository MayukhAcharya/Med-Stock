import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { ReactNode } from 'react';

import { styles } from 'src/components/Button/styles';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';

type buttonProps = {
  label: string;
  onPress: () => void;
  disable?: boolean;
  mainStyle: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  showActivityIndicator?: boolean;
  icon?: ReactNode;
};

const Button = (props: buttonProps) => {
  const currentStyles = styles();
  const {
    label,
    mainStyle,
    onPress,
    disable = false,
    labelStyle,
    showActivityIndicator = false,
    icon,
  } = props;
  return disable ? (
    <TouchableOpacity
      style={[currentStyles.buttonDisableStyle, mainStyle]}
      disabled={true}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[currentStyles.buttonStyle, mainStyle]}
    >
      {showActivityIndicator ? (
        <ActivityIndicator size={'small'} color={colors.pureWhite} />
      ) : (
        <View style={commonStyles.row}>
          <View style={commonStyles.mr10}>{icon ? icon : null}</View>

          <Text style={[currentStyles.buttonLabelStyle, labelStyle]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
