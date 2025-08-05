import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import {
  BandageIcon,
  BanIcon,
  DropletsIcon,
  ImageOffIcon,
  MoveDiagonalIcon,
  PillBottleIcon,
  PillIcon,
  SyringeIcon,
} from 'lucide-react-native';

import { styles } from 'src/components/MedicineCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import { OintmentIconBig } from 'src/assets/svg/OintmentIconBig';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';
import { colors } from 'src/config/colors';

type medicineCardProps = {
  medicineName: string;
  expiryDate: string;
  category: string;
  color: string;
  onPress: () => void;
  markAsRequired: boolean;
};

const MedicineCard = (props: medicineCardProps) => {
  const currentStyles = styles();
  const {
    expiryDate,
    medicineName,
    category,
    color,
    onPress,
    markAsRequired = true,
  } = props;
  return (
    <Pressable
      style={currentStyles.container}
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={
          markAsRequired
            ? commonStyles.alignItemsRight
            : [commonStyles.spaceBetween, commonStyles.row]
        }
      >
        {markAsRequired ? null : <BanIcon size={20} color={colors.error} />}

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
          ) : category === 'Ear/Nose/Eye Drop' ? (
            <DropletsIcon size={70} color={color} />
          ) : category === 'Cartridge/Ampule' ? (
            <SyringeIcon size={70} color={color} />
          ) : (
            <ImageOffIcon size={70} color={color} />
          )}
        </View>
        <View style={commonStyles.mt10}>
          <Text style={currentStyles.medicineTextStyle}>{medicineName}</Text>
        </View>
        <View style={commonStyles.mt5}>
          <Text style={currentStyles.expiryTextStyle}>
            {markAsRequired
              ? `Expires-${ReusableDateFormatter(expiryDate)}`
              : 'Unrequired'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MedicineCard;
