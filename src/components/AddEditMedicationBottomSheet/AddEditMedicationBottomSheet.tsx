import { View, Text, Modal, StatusBar, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import { styles } from 'src/components/AddEditMedicationBottomSheet/styles';
import { colors } from 'src/config/colors';
import { commonStyles } from 'src/config/commonStyles';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import { database } from 'src/Database/database';
import normalize from 'src/config/normalize';
import Button from '../Button/Button';
import TimeComponent from '../TimeComponent/TimeComponent';

type addEditMedicationProps = {
  onClose: () => void;
  isVisible: boolean;
};

type medicineData = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
  label: string;
  value: string;
};

const AddEditMedicationBottomSheet = (props: addEditMedicationProps) => {
  const currentStyles = styles();
  const { isVisible = false, onClose } = props;

  const [allMedicines, setAllMedicines] = useState<medicineData[]>([]);

  const getMedicineDataMethod = () => {
    try {
      const medicineData = database.get('medicines');
      medicineData
        .query()
        .observe()
        .forEach(item => {
          let temp: any = [];
          item.forEach(data => {
            temp.push(data._raw);
          });
          const finalList = temp.map((item: any) => {
            return {
              ...item,
              label: item.medicine_name,
              value: item.id,
            };
          });
          setAllMedicines(finalList);
        });
    } catch (error) {
      setAllMedicines([]);
    }
  };

  useEffect(() => {
    getMedicineDataMethod();
  }, []);
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor={colors.backgroundTransparent}
        barStyle={'light-content'}
        translucent
      />
      <Pressable style={currentStyles.container}>
        <View style={currentStyles.subContainer}>
          <View style={commonStyles.aic}>
            <Text style={currentStyles.HeaderTextStyle}>
              Edit/Add Medication
            </Text>
          </View>
          <View style={currentStyles.inputContainer}>
            <CustomDropdown
              label="Add Medicine"
              list={allMedicines}
              allStyle={commonStyles.w100per}
              borderColor={colors.borderColor}
              selectedValue=""
              placeholder="Calpol-650"
              onValueSelect={item => {}}
              dropdownMainStyle={{
                maxHeight: normalize(125, 'height'),
              }}
              style={{ backgroundColor: colors.pureWhite }}
            />
            <TimeComponent
              label="Medication Time"
              allStyle={commonStyles.w100per}
              borderColor={colors.borderColor}
              placeholder="Before Lunch"
              value={new Date()}
              onChange={time => {}}
              style={{ backgroundColor: colors.pureWhite }}
            />
          </View>
          <View style={currentStyles.bottomContainerMargin}>
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

export default AddEditMedicationBottomSheet;
