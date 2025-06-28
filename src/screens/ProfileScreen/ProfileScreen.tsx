import { View, Text } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/ProfileScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import normalize from 'src/config/normalize';
import Button from 'src/components/Button/Button';
import { SaveIcon } from 'lucide-react-native';
import CustomDropdown from 'src/components/CustomDropdown/CustomDropdown';

const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Prefer not to say',
    value: 'noSay',
  },
];

const ProfileScreen = () => {
  const currentStyles = styles();
  return (
    <BackgroundFill backgroundColor="white" scroll>
      <View style={currentStyles.container}>
        <View style={currentStyles.inputContainer}>
          <CustomTextInput
            label="Name"
            borderColor={colors.borderColor}
            value=""
            placeholder="Your Name"
            allStyle={commonStyles.w100per}
            style={{ backgroundColor: colors.pureWhite }}
            labelStyle={currentStyles.labelStyle}
          />
          <View style={[commonStyles.row, commonStyles.spaceBetween]}>
            <CustomTextInput
              label="Age"
              borderColor={colors.borderColor}
              value=""
              placeholder="Your age"
              allStyle={commonStyles.w160}
              keyboardType="numeric"
              style={{ backgroundColor: colors.pureWhite }}
              labelStyle={currentStyles.labelStyle}
            />
            <CustomDropdown
              label="Gender"
              list={genderOptions}
              borderColor={colors.borderColor}
              selectedValue=""
              placeholder="Select gender"
              allStyle={commonStyles.w160}
              style={{ backgroundColor: colors.pureWhite }}
              labelSyle={currentStyles.labelStyle}
              onValueSelect={item => {
                console.log(item);
              }}
            />
          </View>
          <CustomTextInput
            label="Allergies(if any)"
            borderColor={colors.borderColor}
            value=""
            placeholder="List allergies..."
            allStyle={[commonStyles.w100per]}
            keyboardType="numeric"
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
            label="Save changes"
            icon={<SaveIcon color={colors.pureWhite} />}
            mainStyle={commonStyles.w100per}
            onPress={() => {}}
          />
        </View>
      </View>
    </BackgroundFill>
  );
};

export default ProfileScreen;
