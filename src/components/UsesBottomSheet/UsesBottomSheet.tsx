import { View, Text, Modal, Pressable, StatusBar } from 'react-native';
import React from 'react';

import { styles } from 'src/components/UsesBottomSheet/styles';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import Button from '../Button/Button';
import { PlusCircleIcon } from 'lucide-react-native';

type UsesBottomSheetProps = {
  onClose: () => void;
  isVisible: boolean;
};

const UsesBottomSheet = (props: UsesBottomSheetProps) => {
  const currentStyles = styles();
  const { onClose, isVisible } = props;
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor={colors.backgroundTransparent}
        barStyle={'light-content'}
        translucent
      />
      <Pressable onPress={onClose} style={currentStyles.container}>
        <View style={currentStyles.subContainer}>
          <View style={currentStyles.paddingH}>
            <View>
              <Text style={currentStyles.addNewItemTextStyle}>
                Add a new Item
              </Text>
            </View>
            <View style={commonStyles.mt20}>
              <CustomTextInput
                label="Use 1"
                borderColor={colors.borderColor}
                value=""
                placeholder="Medicine use"
                allStyle={commonStyles.w100per}
                style={{ backgroundColor: colors.pureWhite }}
              />
            </View>
            <View style={commonStyles.mt18}>
              <Button
                label="Add Another"
                mainStyle={currentStyles.addAnotherButton}
                labelStyle={currentStyles.addAnotherButtonLabelStyle}
                icon={<PlusCircleIcon />}
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={currentStyles.hzLine} />

          <View style={[commonStyles.mt18, currentStyles.paddingH]}>
            <Button
              label="Save Changes"
              mainStyle={commonStyles.w100per}
              onPress={() => {}}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UsesBottomSheet;
