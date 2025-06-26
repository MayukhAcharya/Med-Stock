import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/MedicineListCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import { BandageIcon, Drumstick, PillIcon } from 'lucide-react-native';

type medicineListProps = {
  medicineName: string;
  expiryDate: string;
  quantity: string;
  category?: string;
  image?: any;
  onPress: () => void;
};

const MedicineListCard = (props: medicineListProps) => {
  const currentStyles = styles();
  const { medicineName, expiryDate, category, image, quantity, onPress } =
    props;
  return (
    <TouchableOpacity style={currentStyles.container} onPress={() => onPress()}>
      <View>
        <View style={[commonStyles.row, commonStyles.aic]}>
          {image ? (
            <Image
              source={{
                uri: 'https://5.imimg.com/data5/SELLER/Default/2023/3/296912948/ON/WW/IV/128021380/calpol-650-mg-tablet.png',
              }}
              style={currentStyles.imageStyle}
            />
          ) : category === 'Pill' ? (
            <PillIcon size={75} />
          ) : (
            <BandageIcon size={75} />
          )}

          <View style={commonStyles.ml20}>
            <Text style={currentStyles.medicineNameTextStyle}>
              {medicineName}
            </Text>
            <Text style={currentStyles.quantityTextStyle}>
              Quantity: {quantity}
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
