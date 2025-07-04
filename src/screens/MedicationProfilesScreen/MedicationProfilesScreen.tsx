import { View, Text, Image } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/MedicationProfilesScreen/styles';
import { commonStyles } from 'src/config/commonStyles';

const MedicationProfilesScreen = () => {
  const currentStyles = styles();
  return (
    <View style={currentStyles.container}>
      <View style={[commonStyles.row, commonStyles.spaceBetween]}>
        <View style={currentStyles.boxContainer}>
          <Image
            source={require('src/assets/img/male1.png')}
            style={currentStyles.imageStyle}
          />

          <Text style={currentStyles.profileTextStyle}>Mayukh's meds</Text>
        </View>
        <View style={currentStyles.boxContainer}>
          <Image
            source={require('src/assets/img/female2.png')}
            style={currentStyles.imageStyle}
          />

          <Text style={currentStyles.profileTextStyle}>Panna's Meds</Text>
        </View>
      </View>
    </View>
  );
};

export default MedicationProfilesScreen;
