import { View, Text, Modal, Pressable, StatusBar } from 'react-native';
import React, { useState } from 'react';

import { styles } from 'src/components/AddHealthProfileBottomSheet/styles';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import Button from '../Button/Button';
import { ArrowUpRightFromSquareIcon, SaveIcon } from 'lucide-react-native';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import ReviewMedicationList from '../ReviewMedicationList/ReviewMedicationList';

type addHealthProfileProps = {
  onClose: () => void;
  isVisible: boolean;
};

const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

const AddHealthProfileBottomSheet = (props: addHealthProfileProps) => {
  const { onClose, isVisible } = props;
  const currentStyles = styles();

  const [reviewMeds, setReviewMeds] = useState<boolean>(false);
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={() => onClose()}
      transparent
    >
      <StatusBar
        backgroundColor={colors.backgroundTransparent}
        barStyle={'light-content'}
        translucent
      />
      <Pressable onPress={onClose} style={currentStyles.container}>
        <View style={currentStyles.subContainer}>
          <View style={commonStyles.aic}>
            <Text style={currentStyles.addHealthProfileStyle}>
              Add Health Profile
            </Text>
          </View>
          <View style={currentStyles.inputContainer}>
            <View style={[commonStyles.row, commonStyles.spaceBetween]}>
              <CustomTextInput
                label="Profile Name"
                allStyle={commonStyles.w45Per}
                borderColor={colors.borderColor}
                value=""
                placeholder="Name"
              />
              <CustomTextInput
                label="Type of medication"
                allStyle={commonStyles.w45Per}
                borderColor={colors.borderColor}
                value=""
                placeholder="Fever/Infection"
              />
            </View>
            <CustomDropdown
              label="Gender"
              list={genderOptions}
              borderColor={colors.borderColor}
              selectedValue={''}
              placeholder="Select gender"
              allStyle={commonStyles.w100per}
              style={{ backgroundColor: colors.pureWhite }}
              labelSyle={currentStyles.labelStyle}
              onValueSelect={item => {}}
            />
            <View
              style={[
                commonStyles.row,
                commonStyles.spaceBetween,
                commonStyles.aic,
              ]}
            >
              <CustomTextInput
                label="Add Medicine"
                allStyle={commonStyles.w65per}
                borderColor={colors.borderColor}
                value=""
                placeholder="Calpol-650"
                editable={false}
              />
              <Button
                label="Add"
                mainStyle={currentStyles.addButtonMainStyle}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={commonStyles.mt10}>
            <Text style={currentStyles.totalQuantityTextStyle}>
              Total Medicines: 10
            </Text>
          </View>
          <View style={[commonStyles.mt23, commonStyles.rowGap10]}>
            <Button
              label="Review your medicines"
              mainStyle={currentStyles.reviewMedicinesMainStyle}
              labelStyle={currentStyles.reviewMedicinesLabelStyle}
              icon={<ArrowUpRightFromSquareIcon size={18} />}
              onPress={() => {
                setReviewMeds(true);
              }}
            />
            <Button
              label="Save Health Profile"
              mainStyle={commonStyles.w100per}
              onPress={() => {}}
            />
          </View>
        </View>
      </Pressable>
      {reviewMeds ? (
        <ReviewMedicationList
          isVisible={reviewMeds}
          onClose={() => {
            setReviewMeds(false);
          }}
        />
      ) : null}
    </Modal>
  );
};

export default AddHealthProfileBottomSheet;
