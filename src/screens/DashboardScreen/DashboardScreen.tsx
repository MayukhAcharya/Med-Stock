import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {
  AlertTriangleIcon,
  CircleAlertIcon,
  PlusCircleIcon,
  ShieldPlusIcon,
} from 'lucide-react-native';
import React from 'react';

import { styles } from 'src/screens/DashboardScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import { colors } from 'src/config/colors';
import MedicineCard from 'src/components/MedicineCard/MedicineCard';

const dummyList = [
  {
    id: '1',
    medicineName: 'Paracetamol',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2023/3/296912948/ON/WW/IV/128021380/calpol-650-mg-tablet.png',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '2',
    medicineName: 'Rosuless-10',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '3',
    medicineName: 'Famoccid-10',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2023/3/296912948/ON/WW/IV/128021380/calpol-650-mg-tablet.png',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '4',
    medicineName: 'Paracetamol',
    date: '10/10/2025',
    category: 'Bandage',
  },
  {
    id: '5',
    medicineName: 'Paracetamol',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2023/3/296912948/ON/WW/IV/128021380/calpol-650-mg-tablet.png',
    date: '10/10/2025',
    category: 'Pill',
  },
  {
    id: '6',
    medicineName: 'Paracetamol',
    date: '10/10/2025',
    category: 'Bandage',
  },
];

const DashboardScreen = () => {
  const currentStyles = styles();
  return (
    <BackgroundFill showDesign={false} backgroundColor="white" scroll>
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

        {/* Safe Medicine cards     */}
        <View style={[commonStyles.mt25]}>
          <FlatList
            data={dummyList}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <MedicineCard
                    image={item.image ? item.image : null}
                    expiryDate={item.date}
                    medicineName={item.medicineName}
                    category={item.category}
                    color={colors.green}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={commonStyles.ml20} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={currentStyles.MedsView}>
          <Text style={currentStyles.nearExpiryTextStyle}>Near Expiry</Text>
          <View style={commonStyles.mt8}>
            <AlertTriangleIcon color={colors.darkYellow} size={25} />
          </View>
          <Text style={currentStyles.totalMedsTextStyle}>(10 medicines)</Text>
        </View>

        {/* Near Expiry */}
        <View style={[commonStyles.mt25]}>
          <FlatList
            data={dummyList}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <MedicineCard
                    image={item.image ? item.image : null}
                    expiryDate={item.date}
                    medicineName={item.medicineName}
                    category={item.category}
                    color={colors.darkYellow}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={commonStyles.ml20} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={currentStyles.MedsView}>
          <Text style={currentStyles.expiredTextStyle}>Expired</Text>
          <View style={commonStyles.mt8}>
            <CircleAlertIcon color={colors.error} size={25} />
          </View>
          <Text style={currentStyles.totalMedsTextStyle}>(5 medicines)</Text>
        </View>

        {/* Expired */}
        <View style={[commonStyles.mt25]}>
          <FlatList
            data={dummyList}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <MedicineCard
                    image={item.image ? item.image : null}
                    expiryDate={item.date}
                    medicineName={item.medicineName}
                    category={item.category}
                    color={colors.error}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={commonStyles.ml20} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </BackgroundFill>
  );
};

export default DashboardScreen;
