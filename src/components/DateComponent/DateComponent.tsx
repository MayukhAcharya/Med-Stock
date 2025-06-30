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
import { Calendar } from 'react-native-calendars';

import { styles } from 'src/components/DateComponent/styles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

type dateProps = {
  value: any;
  allStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  isError?: boolean;
  errorContainer?: ReactNode;
  label: string;
  onChange: (date: Date) => void;
  labelSyle?: StyleProp<TextStyle>;
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
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
    weekday: undefined,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const handleCalendarChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
    if (onChange) {
      onChange(date);
    }
  };

  useEffect(() => {
    setSelectedDate(new Date(value));
  }, [value]);

  return (
    <View ref={dateRef}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
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
        <Modal
          transparent
          visible={isOpen}
          animationType="slide"
          onRequestClose={() => setIsOpen(false)}
        >
          <StatusBar
            backgroundColor={colors.backgroundTransparent}
            barStyle={'light-content'}
            translucent
          />
          <View style={[currentStyles.mainContainer]}>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={currentStyles.crossIconStyle}
            >
              <X color={colors.pureWhite} size={25} />
            </TouchableOpacity>
            <Calendar
              onDayPress={day => handleCalendarChange(new Date(day.timestamp))}
              current={new Date().toISOString()}
              markingType={'custom'}
              markedDates={{
                [selectedDate ? selectedDate.toISOString().split('T')[0] : '']:
                  {
                    selected: true,
                    selectedColor: colors.primaryBlue,
                  },
              }}
              style={currentStyles.calendarStyle}
              renderArrow={direction => {
                if (direction === 'left') {
                  return <ChevronLeft />;
                } else {
                  return <ChevronRight />;
                }
              }}
              theme={{
                textDayFontFamily: 'PlusJakartaSans-Regular',
                textDayHeaderFontFamily: 'PlusJakartaSans-Regular',
                textMonthFontFamily: 'PlusJakartaSans-Regular',
              }}
              initialDate={value}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default DateComponent;
