import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { styles } from 'src/screens/MedicineDetailsScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';
import UsesBottomSheet from 'src/components/UsesBottomSheet/UsesBottomSheet';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';
import DateComponent from 'src/components/DateComponent/DateComponent';

const categoryOptions = [
  {
    label: 'Tablet',
    value: 'Tablet',
  },
  {
    label: 'Syrup',
    value: 'Syrup',
  },
  {
    label: 'Bandage',
    value: 'Bandage',
  },
  {
    label: 'Ointment',
    value: 'Ointment',
  },
];

const MedicineDetailsScreen = () => {
  const currentStyles = styles();

  const [showUsesModal, setUsesModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <BackgroundFill showDesign={false} backgroundColor="white" scroll>
      <View style={currentStyles.container}>
        <View style={currentStyles.inputContainer}>
          <CustomTextInput
            label="Medicine Name"
            borderColor={colors.borderColor}
            value=""
            placeholder="Medicine Name"
            allStyle={commonStyles.w100per}
            style={{ backgroundColor: colors.pureWhite }}
            labelStyle={currentStyles.labelStyle}
          />
          <CustomDropdown
            label="Category(optional)"
            borderColor={colors.borderColor}
            selectedValue=""
            placeholder="Tablet/Syrup"
            allStyle={commonStyles.w100per}
            style={{ backgroundColor: colors.pureWhite }}
            list={categoryOptions}
            onValueSelect={item => {
              console.log(item);
            }}
          />
          <View style={[commonStyles.row, commonStyles.spaceBetween]}>
            <CustomTextInput
              label="Quantity"
              borderColor={colors.borderColor}
              value=""
              placeholder="Quantity"
              allStyle={commonStyles.w160}
              keyboardType="numeric"
              style={{ backgroundColor: colors.pureWhite }}
              labelStyle={currentStyles.labelStyle}
              rightContainer={
                <Text style={currentStyles.quantityUnitStyle}>Unit</Text>
              }
            />
            <DateComponent
              label="Expiry Date"
              borderColor={colors.borderColor}
              value={date}
              placeholder="date"
              allStyle={commonStyles.w160}
              style={{ backgroundColor: colors.pureWhite }}
              labelSyle={currentStyles.labelStyle}
              onChange={date => {
                setDate(date);
              }}
            />
          </View>

          <View style={currentStyles.boxView}>
            <View
              style={[
                commonStyles.spaceBetween,
                commonStyles.row,
                commonStyles.aic,
              ]}
            >
              <Text style={currentStyles.boxHeaderText}>Uses</Text>
              <TouchableOpacity
                onPress={() => {
                  setUsesModal(true);
                }}
              >
                <Text style={currentStyles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={commonStyles.mt5}>
              <Text style={currentStyles.boxDescriptionText}>
                Pain Relief, Treatment of Fever
              </Text>
            </View>
          </View>
          <CustomTextInput
            label="Note"
            borderColor={colors.borderColor}
            value=""
            placeholder="Add doctor notes..."
            allStyle={commonStyles.w100per}
            style={{
              backgroundColor: colors.pureWhite,
              height: normalize(100, 'height'),
            }}
            labelStyle={currentStyles.labelStyle}
            multiline
          />
        </View>
        <View style={commonStyles.mt30}>
          <Button
            label="Save medicine details"
            mainStyle={commonStyles.w100per}
            onPress={() => {}}
          />
        </View>
      </View>
      {showUsesModal ? (
        <UsesBottomSheet
          onClose={() => setUsesModal(false)}
          isVisible={showUsesModal}
        />
      ) : null}
    </BackgroundFill>
  );
};

export default MedicineDetailsScreen;
