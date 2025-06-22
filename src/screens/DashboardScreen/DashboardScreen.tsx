import { View, Text } from 'react-native';
import {
  AlertTriangleIcon,
  CircleAlertIcon,
  ShieldPlusIcon,
} from 'lucide-react-native';
import React from 'react';

import { styles } from 'src/screens/DashboardScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import { colors } from 'src/config/colors';

const dummyList = [
  {
    id: '1',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
  {
    id: '2',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
  {
    id: '3',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
  {
    id: '4',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
  {
    id: '5',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
  {
    id: '6',
    medicineName: 'Paracetamol',
    image:
      'https://ayushcare.in/products/calpol-500-paracetamol-tablets-ip-500mg-15tablets',
  },
];

const DashboardScreen = () => {
  const currentStyles = styles();
  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <View style={currentStyles.container}>
        <View style={commonStyles.rowGap6}>
          <Text style={currentStyles.userWelcomeStyle}>Hello, Mayukh</Text>
          <Text style={currentStyles.detailTextStyle}>
            Here's an overview of all your medicines
          </Text>
        </View>
        <View style={currentStyles.MedsView}>
          <Text style={currentStyles.safeTextStyle}>Safe</Text>
          <View style={commonStyles.mt8}>
            <ShieldPlusIcon color={colors.green} size={25} />
          </View>
          <Text style={currentStyles.totalMedsTextStyle}>(23 medicines)</Text>
        </View>
        <View style={currentStyles.MedsView}>
          <Text style={currentStyles.nearExpiryTextStyle}>Near Expiry</Text>
          <View style={commonStyles.mt8}>
            <AlertTriangleIcon color={colors.darkYellow} size={25} />
          </View>
          <Text style={currentStyles.totalMedsTextStyle}>(10 medicines)</Text>
        </View>
        <View style={currentStyles.MedsView}>
          <Text style={currentStyles.expiredTextStyle}>Expired</Text>
          <View style={commonStyles.mt8}>
            <CircleAlertIcon color={colors.error} size={25} />
          </View>
          <Text style={currentStyles.totalMedsTextStyle}>(5 medicines)</Text>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default DashboardScreen;
