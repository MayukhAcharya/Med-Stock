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
  indicatorColor?: string;
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
    indicatorColor = colors.pureWhite,
  } = props;
  return disable ? (
    <TouchableOpacity
      style={[currentStyles.buttonDisableStyle, mainStyle]}
      disabled={true}
    >
      <View style={[commonStyles.row, commonStyles.aic]}>
        {icon ? <View style={commonStyles.mr10}>{icon}</View> : null}

        <Text style={[currentStyles.buttonLabelStyle, labelStyle]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[currentStyles.buttonStyle, mainStyle]}
      disabled={showActivityIndicator === true ? true : false}
    >
      {showActivityIndicator ? (
        <ActivityIndicator size={'small'} color={indicatorColor} />
      ) : (
        <View style={[commonStyles.row, commonStyles.aic]}>
          {icon ? <View style={commonStyles.mr10}>{icon}</View> : null}

          <Text style={[currentStyles.buttonLabelStyle, labelStyle]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
