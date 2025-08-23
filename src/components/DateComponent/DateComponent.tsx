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

import { styles } from 'src/components/DateComponent/styles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { colors } from 'src/config/colors';

type dateProps = {
  value: any;
  allStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  isError?: boolean;
  errorContainer?: ReactNode;
  label: string;
  onChange?: (date: Date) => void;
  labelSyle?: StyleProp<TextStyle>;
  disable?: boolean;
  minDate?: string;
};

const DateComponent = (props: dateProps) => {
  const currentStyles = styles();
  const dateRef = useRef(null);
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
    disable = false,
    minDate,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
    weekday: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const handleCalendarChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setIsOpen(false);
      if (onChange) {
        onChange(date);
      }
    }
  };

  useEffect(() => {
    setSelectedDate(new Date(value));
  }, [value]);

  return (
    <View ref={dateRef}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} disabled={disable}>
        <CustomTextInput
          allStyle={[allStyle]}
          value={formattedDate}
          label={label}
          borderColor={borderColor}
          placeholder={placeholder}
          rightContainer={
            <TouchableOpacity
              onPress={() => {
                setIsOpen(!isOpen);
              }}
            >
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
      {isOpen ? (
        <View style={currentStyles.mainContainer}>
          <DateTimePicker
            mode="date"
            value={new Date(value)}
            onChange={handleCalendarChange}
            display="calendar"
            minimumDate={minDate ? new Date(minDate) : undefined}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DateComponent;
