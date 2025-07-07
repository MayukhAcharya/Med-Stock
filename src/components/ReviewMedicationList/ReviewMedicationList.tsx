import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';

import { colors } from 'src/config/colors';
import { styles } from 'src/components/ReviewMedicationList/styles';
import { X } from 'lucide-react-native';
import { commonStyles } from 'src/config/commonStyles';

type reviewMedicationListProps = {
  isVisible: boolean;
  onClose: () => void;
};

const dummyData = [
  {
    id: '1',
    medicineName: 'Calpol-650',
  },
  {
    id: '2',
    medicineName: 'Famoccid-40',
  },
  {
    id: '3',
    medicineName: 'Ofloxacin-50',
  },
  {
    id: '4',
    medicineName: 'O2',
  },
  {
    id: '5',
    medicineName: 'Resumen',
  },
  {
    id: '6',
    medicineName: 'Resumen',
  },
  {
    id: '7',
    medicineName: 'Resumen',
  },
  {
    id: '8',
    medicineName: 'Resumen',
  },
  {
    id: '9',
    medicineName: 'Resumen',
  },
  {
    id: '10',
    medicineName: 'Resumen',
  },
  {
    id: '11',
    medicineName: 'Resumen',
  },
  {
    id: '12',
    medicineName: 'Resumen',
  },
];

const ReviewMedicationList = (props: reviewMedicationListProps) => {
  const currentStyles = styles();
  const { onClose, isVisible } = props;

  const tableHeader = () => (
    <View style={currentStyles.flatlistHeaderContainer}>
      <View style={[currentStyles.tableColumn, commonStyles.w45Per]}>
        <Text style={currentStyles.flatlistHeaderTextStyle}>Sr No.</Text>
      </View>
      <View style={[currentStyles.tableColumn, commonStyles.w45Per]}>
        <Text style={currentStyles.flatlistHeaderTextStyle}>Medicine Name</Text>
      </View>
    </View>
  );
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
                data={dummyData}
                renderItem={({ item, index }) => {
                  return (
                    <View style={currentStyles.flatlistInnerContainer}>
                      <View
                        style={[currentStyles.tableColumn, commonStyles.w45Per]}
                      >
                        <Text style={currentStyles.flatlistTextStyle}>
                          {item.id}.
                        </Text>
                      </View>
                      <View
                        style={[currentStyles.tableColumn, commonStyles.w45Per]}
                      >
                        <Text style={currentStyles.flatlistTextStyle}>
                          {item.medicineName}
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <X size={20} color={colors.grey} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                ListHeaderComponent={tableHeader}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewMedicationList;
