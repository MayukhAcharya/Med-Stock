import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { styles } from 'src/screens/AllMedicinesScreen/styles';
import MedicineListCard from 'src/components/MedicineListCard/MedicineListCard';
import { commonStyles } from 'src/config/commonStyles';
import FloatingButton from 'src/components/FloatingButton/FloatingButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllMedicineStackParamList } from 'src/navigation/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { database } from 'src/Database/database';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';
import { colors } from 'src/config/colors';
import { PlusCircleIcon, PlusIcon } from 'lucide-react-native';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';

type navigationPropsForAllMedicines = NativeStackNavigationProp<
  AllMedicineStackParamList,
  'AllMedicinesScreen'
>;

type medicineDataTypes = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
};

const AllMedicinesScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForAllMedicines>();

  const [allMedicines, setAllMedicines] = useState<medicineDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMedicineDataMethod = () => {
    setIsLoading(true);
    try {
      const medicineData = database.get('medicines');
      medicineData
        .query()
        .observe()
        .forEach(item => {
          let temp: any = [];
          item.forEach(data => {
            temp.push(data._raw);
          });
          console.log(temp);
          setAllMedicines(temp);

          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getMedicineDataMethod();
      return () => unsubscribe;
    }, []),
  );

  const EmptyComponent = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={colors.primaryBlue} />
    ) : (
      <View
        style={[commonStyles.aic, commonStyles.justifyCenter, commonStyles.row]}
      >
        <Text style={currentStyles.instructionTextStyle}>Press the </Text>
        <View style={currentStyles.plusIconStyle}>
          <PlusIcon color={colors.pureWhite} size={15} />
        </View>
        <Text style={currentStyles.instructionTextStyle}>
          {' '}
          to add your first medicine
        </Text>
      </View>
    );
  };

  return (
    <>
      <BackgroundFill showDesign={false}>
        <View style={currentStyles.container}>
          <View style={commonStyles.aic}>
            <FlatList
              data={allMedicines}
              renderItem={({ item, index }) => {
                return (
                  <MedicineListCard
                    expiryDate={ReusableDateFormatter(item.expiry_date)}
                    medicineName={item.medicine_name}
                    quantity={item.quantity}
                    category={item.category}
                    onPress={() => {
                      navigation.navigate('MedicineDetailsScreen', {
                        medicineDetails: {
                          id: item.id,
                        },
                      });
                    }}
                  />
                );
              }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <View style={commonStyles.mt20} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={EmptyComponent}
            />
          </View>

          <FloatingButton />
        </View>
      </BackgroundFill>
    </>
  );
};

export default AllMedicinesScreen;
