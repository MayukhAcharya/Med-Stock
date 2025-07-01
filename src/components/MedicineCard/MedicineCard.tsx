import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import {
  BandageIcon,
  ImageOffIcon,
  MoveDiagonalIcon,
  PillBottleIcon,
  PillIcon,
} from 'lucide-react-native';

import { styles } from 'src/components/MedicineCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import { OintmentIconBig } from 'src/assets/svg/OintmentIconBig';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';

type medicineCardProps = {
  medicineName: string;
  expiryDate: string;
  category: string;
  color: string;
  onPress: () => void;
};

const MedicineCard = (props: medicineCardProps) => {
  const currentStyles = styles();
  const { expiryDate, medicineName, category, color, onPress } = props;
  return (
    <Pressable
      style={currentStyles.container}
      onPress={() => {
        onPress();
      }}
    >
      <View style={commonStyles.alignItemsRight}>
        <MoveDiagonalIcon size={20} />
      </View>
      <View style={commonStyles.aic}>
        <View style={currentStyles.imageContainer}>
          {category === 'Tablet' ? (
            <PillIcon size={70} color={color} />
          ) : category === 'Syrup' ? (
            <PillBottleIcon size={70} color={color} />
          ) : category === 'Bandage' ? (
            <BandageIcon size={70} color={color} />
          ) : category === 'Ointment' ? (
            <OintmentIconBig color={color} />
          ) : (
            <ImageOffIcon size={70} color={color} />
          )}
        </View>
        <View style={commonStyles.mt10}>
          <Text style={currentStyles.medicineTextStyle}>{medicineName}</Text>
        </View>
        <View style={commonStyles.mt5}>
          <Text style={currentStyles.expiryTextStyle}>
            Expires-{ReusableDateFormatter(expiryDate)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MedicineCard;
