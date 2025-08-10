import {
  View,
  Text,
  Modal,
  Pressable,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { PlusCircleIcon, XIcon } from 'lucide-react-native';
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

import { styles } from 'src/components/UsesBottomSheet/styles';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';
import Button from 'src/components/Button/Button';

type usesType = {
  use: string;
};

type UsesBottomSheetProps = {
  onClose: () => void;
  isVisible: boolean;
  usesArray: (uses: usesType[]) => void;
  useData?: usesType[];
};

const UsesBottomSheet = (props: UsesBottomSheetProps) => {
  const currentStyles = styles();
  const { onClose, isVisible, usesArray, useData } = props;
  const [useArray, setUseArray] = useState<usesType[]>(
    useData && useData.length > 0
      ? useData
      : [
          {
            use: '',
          },
        ],
  );

  const handleAddAnotherButton = () => {
    const isValidItem = (item: any) =>
      item.use !== '' && item.use.trim().length !== 0;

    const flag = useArray.every(isValidItem);

    return flag;
  };

  const removeItems = (itemIndex: number) => {
    const filterData = useArray.filter((item, index) => index !== itemIndex);

    setUseArray(filterData);
  };

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
      <Pressable style={currentStyles.container}>
        <KeyboardStickyView>
          <View style={currentStyles.subContainer}>
            <View style={currentStyles.paddingH}>
              <View>
                <Text style={currentStyles.addNewItemTextStyle}>
                  Add a new Item
                </Text>
              </View>
              <View style={currentStyles.useHolder}>
                {useArray.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[commonStyles.row, commonStyles.aic]}
                    >
                      <CustomTextInput
                        label={`Use ${index + 1}`}
                        borderColor={colors.borderColor}
                        value={item.use}
                        placeholder="Medicine use"
                        allStyle={
                          index === 0
                            ? commonStyles.w100per
                            : commonStyles.w93Per
                        }
                        style={{ backgroundColor: colors.pureWhite }}
                        onChangeText={text => {
                          const updateItems = [...useArray];
                          updateItems[index].use = text;
                          setUseArray(updateItems);
                        }}
                        autoFocus
                      />
                      {index > 0 ? (
                        <TouchableOpacity
                          style={[commonStyles.mt18, commonStyles.ml10]}
                          onPress={() => {
                            removeItems(index);
                          }}
                        >
                          <XIcon />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  );
                })}
              </View>
              <View style={commonStyles.mt18}>
                <Button
                  label="Add Another"
                  mainStyle={currentStyles.addAnotherButton}
                  labelStyle={currentStyles.addAnotherButtonLabelStyle}
                  icon={<PlusCircleIcon />}
                  onPress={() => {
                    if (handleAddAnotherButton()) {
                      setUseArray([
                        ...useArray,
                        {
                          use: '',
                        },
                      ]);
                    }
                  }}
                  disable={
                    useArray.length === 5 || handleAddAnotherButton() === false
                      ? true
                      : false
                  }
                />
              </View>
            </View>

            <View style={currentStyles.hzLine} />

            <View style={[commonStyles.mt18, currentStyles.paddingH]}>
              <Button
                label="Save Changes"
                mainStyle={commonStyles.w100per}
                onPress={() => {
                  usesArray(useArray);
                  onClose();
                }}
                disable={!handleAddAnotherButton()}
              />
            </View>
          </View>
        </KeyboardStickyView>
      </Pressable>
    </Modal>
  );
};

export default UsesBottomSheet;
