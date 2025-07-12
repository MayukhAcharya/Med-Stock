import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';

import { colors } from 'src/config/colors';
import { styles } from 'src/components/ReviewMedicationList/styles';
import { X } from 'lucide-react-native';
import { commonStyles } from 'src/config/commonStyles';

type medicineDataTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: any;
  category: any;
};

type reviewMedicationListProps = {
  isVisible: boolean;
  onClose: () => void;
  medicationList: medicineDataTypes[];
  onUpdation: (array: medicineDataTypes[]) => void;
};

const ReviewMedicationList = (props: reviewMedicationListProps) => {
  const currentStyles = styles();
  const { onClose, isVisible, medicationList, onUpdation } = props;

  const [medicineArray, setMedicineArray] =
    useState<medicineDataTypes[]>(medicationList);

  const tableHeader = () => (
    <View style={currentStyles.flatlistHeaderContainer}>
      <View style={[currentStyles.tableColumn, commonStyles.w30Per]}>
        <Text style={currentStyles.flatlistHeaderTextStyle}>Sr No.</Text>
      </View>
      <View style={[currentStyles.tableColumn, commonStyles.w45Per]}>
        <Text style={currentStyles.flatlistHeaderTextStyle}>Medicine Name</Text>
      </View>
    </View>
  );

  const emptyField = () => (
    <View style={currentStyles.emptyFieldTextStyle}>
      <Text style={currentStyles.noMedsTextStyle}>No Medicines Found!</Text>
    </View>
  );

  const removeItems = (id: string) => {
    const filteredItems = medicineArray.filter(item => item.medicineId !== id);

    setMedicineArray(filteredItems);
    onUpdation(filteredItems);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <StatusBar
        backgroundColor={colors.backgroundTransparent}
        barStyle={'light-content'}
        translucent
      />
      <View style={currentStyles.mainContainer}>
        <TouchableOpacity
          onPress={() => onClose()}
          style={currentStyles.crossIconStyle}
        >
          <X color={colors.pureWhite} size={25} />
        </TouchableOpacity>
        <View style={commonStyles.aic}>
          <View style={currentStyles.subContainer}>
            <View style={commonStyles.aic}>
              <Text style={currentStyles.reviewMedicineTextStyle}>
                Review Medication
              </Text>
            </View>
            <View style={currentStyles.flatlistContainer}>
              <FlatList
                data={medicineArray}
                renderItem={({ item, index }) => {
                  return (
                    <View style={currentStyles.flatlistInnerContainer}>
                      <View
                        style={[currentStyles.tableColumn, commonStyles.w30Per]}
                      >
                        <Text style={currentStyles.flatlistTextStyle}>
                          {index + 1}.
                        </Text>
                      </View>
                      <View
                        style={[currentStyles.tableColumn, commonStyles.w65per]}
                      >
                        <Text
                          style={currentStyles.flatlistTextStyle}
                          numberOfLines={1}
                        >
                          {item.medicineName} ({item.medicationTime})
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          removeItems(item.medicineId);
                        }}
                      >
                        <X size={20} color={colors.grey} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ListHeaderComponent={tableHeader}
                keyExtractor={item => item.medicineId}
                ListEmptyComponent={emptyField}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewMedicationList;
