import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/MedicineCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import { BandageIcon, MoveDiagonalIcon, PillIcon } from 'lucide-react-native';
import { colors } from 'src/config/colors';

type medicineCardProps = {
  medicineName: string;
  expiryDate: string;
  category: string;
  color: string;
  image?: string | null;
};

const MedicineCard = (props: medicineCardProps) => {
  const currentStyles = styles();
  const { expiryDate, medicineName, image, category, color } = props;
  return (
    <TouchableOpacity style={currentStyles.container}>
      <View style={commonStyles.alignItemsRight}>
        <MoveDiagonalIcon size={20} />
      </View>
      <View style={commonStyles.aic}>
        <View style={currentStyles.imageContainer}>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={currentStyles.imageStyle}
            />
          ) : category === 'Pill' ? (
            <PillIcon size={50} color={color} />
          ) : (
            <BandageIcon size={50} color={color} />
          )}
        </View>
        <View style={commonStyles.mt10}>
          <Text style={currentStyles.medicineTextStyle}>{medicineName}</Text>
        </View>
        <View style={commonStyles.mt5}>
          <Text style={currentStyles.expiryTextStyle}>
            Expires-{expiryDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MedicineCard;
