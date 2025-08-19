import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
  TextStyle,
} from 'react-native';
import React, { ReactNode, useRef, useState } from 'react';
import {
  BandageIcon,
  ChevronDown,
  DropletsIcon,
  Milk,
  PillBottleIcon,
  PillIcon,
  SyringeIcon,
} from 'lucide-react-native';

import { styles } from 'src/components/CustomDropdown/styles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { OintmentIcon } from 'src/assets/svg/OintmentIcon';

type listType = {
  label: string;
  value: string;
  [key: string]: any;
};

type dropdownProps = {
  selectedValue: string;
  allStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  isError?: boolean;
  errorContainer?: ReactNode;
  list: listType[];
  label: string;
  onValueSelect: (item: any) => void;
  dropdownMainStyle?: StyleProp<ViewStyle>;
  labelSyle?: StyleProp<TextStyle>;
  disable?: boolean;
};

const CustomDropdown = (props: dropdownProps) => {
  const currentStyles = styles();
  const dropdownRef = useRef(null);
  const {
    allStyle,
    borderColor,
    placeholder,
    selectedValue,
    errorContainer,
    isError,
    style,
    list,
    label,
    dropdownMainStyle,
    labelSyle,
    onValueSelect,
    disable = false,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <View ref={dropdownRef}>
      <TouchableOpacity onPress={() => setIsOpen!(!isOpen)} disabled={disable}>
        <CustomTextInput
          allStyle={[allStyle]}
          value={selectedValue}
          label={label}
          borderColor={borderColor}
          placeholder={placeholder}
          rightContainer={
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <ChevronDown color={colors.pureBlack} size={20} />
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
        <ScrollView
          style={[currentStyles.dropdownMainStyle, dropdownMainStyle]}
          nestedScrollEnabled={true}
        >
          {list.length > 0 ? (
            list.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onValueSelect(item);
                    setIsOpen(false);
                  }}
                  key={index}
                  style={currentStyles.flatlistView}
                >
                  <Text style={currentStyles.itemLabelStyle}>{item.label}</Text>
                  <View>
                    {item.label === 'Tablet' ? (
                      <PillIcon />
                    ) : item.label === 'Syrup' ? (
                      <PillBottleIcon />
                    ) : item.label === 'Bandage' ? (
                      <BandageIcon />
                    ) : item.label === 'Ointment' ? (
                      <OintmentIcon />
                    ) : item.value === 'drop' ? (
                      <DropletsIcon />
                    ) : item.value === 'syringe' ? (
                      <SyringeIcon />
                    ) : item.value === 'oral' ? (
                      <Milk />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={currentStyles.emptyContainer}>
              <Text style={currentStyles.emptyTextStyle}>No Data found!</Text>
            </View>
          )}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default CustomDropdown;
