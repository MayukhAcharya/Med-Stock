import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react-native';

import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { styles } from 'src/screens/AddMedicineScreen/styles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import Button from 'src/components/Button/Button';
import UsesBottomSheet from 'src/components/UsesBottomSheet/UsesBottomSheet';

const AddMedicineScreen = () => {
  const currentStyles = styles();
  const [showUsesModal, setUsesModal] = useState<boolean>(false);
  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
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
          <CustomTextInput
            label="Category(optional)"
            borderColor={colors.borderColor}
            value=""
            placeholder="Tablet/Syrup"
            allStyle={commonStyles.w100per}
            style={{ backgroundColor: colors.pureWhite }}
            labelStyle={currentStyles.labelStyle}
          />
          <View style={[commonStyles.row, commonStyles.spaceBetween]}>
            <CustomTextInput
              label="Quantity"
              borderColor={colors.borderColor}
              value=""
              placeholder="Quantity"
              allStyle={commonStyles.w45Per}
              keyboardType="numeric"
              style={{ backgroundColor: colors.pureWhite }}
              labelStyle={currentStyles.labelStyle}
              rightContainer={
                <Text style={currentStyles.quantityUnitStyle}>Unit</Text>
              }
            />
            <CustomTextInput
              label="Expiry Date"
              borderColor={colors.borderColor}
              value=""
              placeholder="date"
              allStyle={commonStyles.w45Per}
              style={{ backgroundColor: colors.pureWhite }}
              labelStyle={currentStyles.labelStyle}
            />
          </View>
          <View style={currentStyles.boxView}>
            <View
              style={[
                commonStyles.row,
                commonStyles.spaceBetween,
                commonStyles.aic,
              ]}
            >
              <Text style={currentStyles.boxHeaderText}>Uses(optional)</Text>
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
        </View>
        <View>
          <Button
            label="Add Medicine"
            mainStyle={commonStyles.w100per}
            icon={<PlusCircleIcon color={colors.pureWhite} />}
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

export default AddMedicineScreen;
