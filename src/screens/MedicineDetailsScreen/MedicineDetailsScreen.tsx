import { View, Text } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/MedicineDetailsScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';

const MedicineDetailsScreen = () => {
  const currentStyles = styles();
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
            <Text style={currentStyles.boxHeaderText}>Uses</Text>
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
            label="Save Medicine details"
            mainStyle={commonStyles.w100per}
            onPress={() => {}}
          />
        </View>
      </View>
    </BackgroundFill>
  );
};

export default MedicineDetailsScreen;
