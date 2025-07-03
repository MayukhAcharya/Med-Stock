import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/MedicineListCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import {
  BandageIcon,
  DropletsIcon,
  Drumstick,
  ImageOffIcon,
  PillBottleIcon,
  PillIcon,
  SyringeIcon,
} from 'lucide-react-native';
import { OintmentIcon } from 'src/assets/svg/OintmentIcon';
import { OintmentIconBig } from 'src/assets/svg/OintmentIconBig';
import { colors } from 'src/config/colors';

type medicineListProps = {
  medicineName: string;
  expiryDate: string;
  quantity: string;
  category?: string;
  onPress: () => void;
};

const MedicineListCard = (props: medicineListProps) => {
  const currentStyles = styles();
  const { medicineName, expiryDate, category, quantity, onPress } = props;
  return (
    <TouchableOpacity style={currentStyles.container} onPress={() => onPress()}>
      <View>
        <View style={[commonStyles.row, commonStyles.aic]}>
          {category === 'Tablet' ? (
            <PillIcon size={75} />
          ) : category === 'Syrup' ? (
            <PillBottleIcon size={75} />
          ) : category === 'Bandage' ? (
            <BandageIcon size={75} />
          ) : category === 'Ointment' ? (
            <OintmentIconBig />
          ) : category === 'Ear/Nose/Eye Drop' ? (
            <DropletsIcon size={75} />
          ) : category === 'Cartridge/Ampule' ? (
            <SyringeIcon size={75} />
          ) : (
            <ImageOffIcon size={75} />
          )}

          <View style={commonStyles.ml20}>
            <View style={[commonStyles.w160]}>
              <Text
                style={currentStyles.medicineNameTextStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {medicineName}
              </Text>
            </View>

            <Text style={currentStyles.quantityTextStyle}>
              Quantity: {quantity}{' '}
              {category === 'Tablet' || category === 'Bandage' ? 'Unit' : 'ml'}
            </Text>
          </View>
        </View>
      </View>
      <View style={commonStyles.alignItemsRight}>
        <Text style={currentStyles.expiresTextStyle}>Expires</Text>
        <Text style={currentStyles.dateTextStyle}>{expiryDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MedicineListCard;
