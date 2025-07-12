import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { styles } from 'src/components/TimeComponent/styles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

type timeProps = {
  value: any;
  allStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  isError?: boolean;
  errorContainer?: ReactNode;
  label: string;
  onChange: (time: any) => void;
  labelSyle?: StyleProp<TextStyle>;
};

const TimeComponent = (props: timeProps) => {
  const currentStyles = styles();
  const {
    allStyle,
    borderColor,
    label,
    placeholder,
    value = new Date(),
    errorContainer,
    isError,
    labelSyle,
    onChange,
    style,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (event: any, selectedTime?: Date) => {
    setIsOpen(false);
    if (selectedTime) {
      onChange(selectedTime);
    }
  };

  function convertTimestampToTime(date: Date) {
    if (!date || !(date instanceof Date)) return '';
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <CustomTextInput
          allStyle={[allStyle]}
          value={convertTimestampToTime(value)}
          label={label}
          borderColor={borderColor}
          placeholder={placeholder}
          rightContainer={
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <ChevronDownIcon color={colors.pureBlack} size={20} />
            </TouchableOpacity>
          }
          editable={false}
          style={[style]}
          isError={isError}
          errorContainer={errorContainer}
          labelStyle={[labelSyle]}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={[currentStyles.mainContainer]}>
          <DateTimePicker
            value={value instanceof Date ? value : new Date()}
            mode="time"
            onChange={handleChange}
            is24Hour={false}
          />
        </View>
      )}
    </View>
  );
};

export default TimeComponent;
