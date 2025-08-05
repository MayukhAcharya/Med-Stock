import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';

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
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import CustomTextInput from 'src/components/CustomTextInput/CustomTextInput';

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
  mark_as_required: boolean;
};

const AllMedicinesScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForAllMedicines>();
  const medsRef = useRef<LottieView>(null);

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
          setAllMedicines(temp);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (medsRef.current) {
        medsRef?.current?.pause();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

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
      <View style={[commonStyles.aic, commonStyles.justifyCenter]}>
        <LottieView
          ref={medsRef}
          source={require('src/assets/lottie/Meds.json')}
          autoPlay
          loop
          style={currentStyles.medsStyle}
        />
        <View>
          <Text style={currentStyles.noMedicinesTextStyle}>
            No Medicines Yet
          </Text>
        </View>
        <View style={[commonStyles.mt20, commonStyles.w93Per]}>
          <Text style={currentStyles.detailTextStyle}>
            Press the '+' button below to add your first medicine and stay on
            top of your health.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <BackgroundFill showDesign={false}>
        <View style={currentStyles.container}>
          <View style={commonStyles.aic}>
            <View>
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
                      markAsRequired={item.mark_as_required}
                    />
                  );
                }}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (
                  <View style={commonStyles.mt20} />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyComponent}
                removeClippedSubviews={true}
              />
            </View>
          </View>

          <FloatingButton isFistAdd={allMedicines.length > 0 ? false : true} />
        </View>
      </BackgroundFill>
    </>
  );
};

export default AllMedicinesScreen;
