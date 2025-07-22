import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { styles } from 'src/components/SearchDropdown/styles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import {
  BandageIcon,
  ChevronDown,
  CrossIcon,
  DropletsIcon,
  PillBottleIcon,
  PillIcon,
  SyringeIcon,
  X,
} from 'lucide-react-native';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import { OintmentIcon } from 'src/assets/svg/OintmentIcon';

type listType = {
  label: string;
  value: string;
  [key: string]: any;
};

type searchDrodpownProps = {
  selectedValue: string;
  onChangeText: (text: string) => void;
  list: listType[];
  allStyle: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  borderColor: string;
  placeholder: string;
  onAddPress?: () => void;
  isError?: boolean;
  errorContainer?: ReactNode;
  onValueSelect: (item: any) => void;
  dropdownMainStyle?: StyleProp<ViewStyle>;
  labelSyle?: StyleProp<TextStyle>;
  disable?: boolean;
  label: string;
  secondInputStyle?: StyleProp<ViewStyle>;
  onClose: () => void;
};

const SearchDropdown = (props: searchDrodpownProps) => {
  const currentStyles = styles();
  const {
    allStyle,
    borderColor,
    list,
    onChangeText,
    onValueSelect,
    placeholder,
    selectedValue,
    disable = false,
    dropdownMainStyle,
    errorContainer,
    isError,
    labelSyle,
    style,
    label,
    secondInputStyle,
    onAddPress,
    onClose,
  } = props;
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [data, setData] = useState(list);

  const emptyField = () => (
    <View style={currentStyles.emptyFieldStyle}>
      <Text style={currentStyles.noFindTextStyle}>
        Couldn't find your medicine?
      </Text>
      <TouchableOpacity style={commonStyles.mt5} onPress={onAddPress}>
        <Text style={currentStyles.addHereTextStyle}>Add Here!</Text>
      </TouchableOpacity>
    </View>
  );

  const handleClose = () => {
    setIsOpen(!isOpen);
    setSearchQuery('');
    onClose();
  };

  useEffect(() => {
    setData(list);
  }, [list]);
  return (
    <View ref={dropdownRef}>
      <TouchableOpacity
        onPress={() => {
          handleClose();
        }}
      >
        <CustomTextInput
          allStyle={[allStyle]}
          value={selectedValue}
          label={label}
          borderColor={borderColor}
          placeholder={placeholder}
          rightContainer={
            <TouchableOpacity
              onPress={() => {
                setIsOpen(!isOpen);
                setSearchQuery('');
              }}
            >
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
        <Modal
          transparent
          visible={isOpen}
          animationType="slide"
          onRequestClose={() => {
            handleClose();
          }}
        >
          <View style={currentStyles.container}>
            <TouchableOpacity
              onPress={() => {
                handleClose();
              }}
              style={currentStyles.crossIconStyle}
            >
              <X color={colors.pureWhite} size={25} />
            </TouchableOpacity>
            <View style={[currentStyles.dropdownMainStyle, dropdownMainStyle]}>
              <View style={commonStyles.aic}>
                <CustomTextInput
                  allStyle={[currentStyles.secondInputStyle, secondInputStyle]}
                  value={searchQuery}
                  label={''}
                  borderColor={colors.borderColor}
                  placeholder={'Search'}
                  style={currentStyles.inputStyle}
                  onChangeText={text => {
                    setSearchQuery(text);
                    onChangeText(text);
                  }}
                />
              </View>
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onValueSelect(item);
                        setIsOpen(false);
                      }}
                      style={[
                        currentStyles.flatlistView,
                        {
                          opacity: item.mark_as_required ? 1 : 0.5,
                        },
                      ]}
                      disabled={!item.mark_as_required}
                    >
                      <Text style={currentStyles.itemLabelStyle}>
                        {item.label}
                      </Text>
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
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.value}
                ListEmptyComponent={emptyField}
                nestedScrollEnabled={true}
              />
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default SearchDropdown;
