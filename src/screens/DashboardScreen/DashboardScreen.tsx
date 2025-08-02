import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  AlertTriangleIcon,
  CircleAlertIcon,
  PlusCircleIcon,
  ShieldPlusIcon,
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/screens/DashboardScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import { colors } from 'src/config/colors';
import MedicineCard from 'src/components/MedicineCard/MedicineCard';
import { DashboardStackParamList } from 'src/navigation/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { database } from 'src/Database/database';
import Button from 'src/components/Button/Button';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';
import LottieView from 'lottie-react-native';
import { getExpiredMedicines } from 'src/utils/getExpiredMedicines';

type navigationPropsForDashboard = NativeStackNavigationProp<
  DashboardStackParamList,
  'DashboardScreen'
>;

type medicineDataTypes = {
  category: string;
  expiry_date: string;
  id: string;
  medicine_name: string;
  quantity: string;
  uses: string;
};

const DashboardScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForDashboard>();
  const emptyAnimationRef = useRef<LottieView>(null);

  const [profileName, setProfileName] = useState<string>('');
  const [allMedicines, setAllMedicines] = useState<medicineDataTypes[]>([]);
  const [safeMeds, setSafeMeds] = useState<medicineDataTypes[]>([]);
  const [nearExpiryMeds, setNearExpiryMeds] = useState<medicineDataTypes[]>([]);
  const [expiredMeds, setExpiredMeds] = useState<medicineDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProfileDataMethod = () => {
    const profileData = database.get('profile');
    profileData
      .query()
      .observe()
      .forEach(item => {
        let temp: any = [];
        item.forEach(data => {
          temp.push(data._raw);
        });
        setProfileName(temp[0].full_name.split(' ')[0]);
      });
  };

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
          safeNearExpiryExpiredMethod(temp);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const safeNearExpiryExpiredMethod = (data: medicineDataTypes[]) => {
    let safe: medicineDataTypes[] = [];
    let nearExpiry: medicineDataTypes[] = [];
    let expired: medicineDataTypes[] = [];
    const todayDate = ReusableDateFormatter(new Date());
    const [day1, month1, year1] = todayDate.split('/').map(Number);

    data.map(item => {
      const itemDate = ReusableDateFormatter(item.expiry_date);
      const [day2, month2, year2] = itemDate.split('/').map(Number);

      const d1: any = new Date(year1, month1 - 1, day1);
      const d2: any = new Date(year2, month2 - 1, day2);

      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 30) {
        safe.push(item);
      } else if (diffDays >= 1 && diffDays <= 30) {
        nearExpiry.push(item);
      } else {
        expired.push(item);
      }
    });
    setSafeMeds(safe);
    setNearExpiryMeds(nearExpiry);
    setExpiredMeds(expired);
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (emptyAnimationRef.current) {
        emptyAnimationRef?.current?.pause();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getProfileDataMethod();
      const medicineDataUnsubscribe = getMedicineDataMethod();
      return () => {
        unsubscribe;
        medicineDataUnsubscribe;
      };
    }, []),
  );
  return (
    <BackgroundFill showDesign={false} backgroundColor="white">
      <ScrollView>
        <View style={currentStyles.container}>
          <View style={commonStyles.rowGap6}>
            <Text style={currentStyles.userWelcomeStyle}>
              Hello, {profileName}
            </Text>
            <Text style={currentStyles.detailTextStyle}>
              {allMedicines.length > 0
                ? "Here's an overview of all your medicines"
                : null}
            </Text>
          </View>
          {allMedicines.length > 0 ? (
            isLoading ? (
              <View style={commonStyles.mt30}>
                <ActivityIndicator size="large" color={colors.primaryBlue} />
              </View>
            ) : (
              <View>
                <View style={currentStyles.MedsView}>
                  <Text style={currentStyles.safeTextStyle}>Safe</Text>
                  <View style={commonStyles.mt8}>
                    <ShieldPlusIcon color={colors.green} size={25} />
                  </View>
                  <Text style={currentStyles.totalMedsTextStyle}>
                    ({safeMeds.length} medicines)
                  </Text>
                </View>

                {/* Safe Medicine cards     */}
                <View style={[commonStyles.mt25]}>
                  <FlatList
                    data={safeMeds}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ marginBottom: 10 }}>
                          <MedicineCard
                            expiryDate={item.expiry_date}
                            medicineName={item.medicine_name}
                            category={item.category}
                            color={colors.green}
                            onPress={() => {
                              navigation.navigate('MedicineDetailsScreen', {
                                medicineDetails: {
                                  id: item.id,
                                },
                              });
                            }}
                          />
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => item.id}
                    horizontal
                    ItemSeparatorComponent={() => (
                      <View style={commonStyles.ml20} />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                {nearExpiryMeds.length > 0 ? (
                  <View>
                    <View style={currentStyles.MedsView}>
                      <Text style={currentStyles.nearExpiryTextStyle}>
                        Near Expiry
                      </Text>
                      <View style={commonStyles.mt8}>
                        <AlertTriangleIcon
                          color={colors.darkYellow}
                          size={25}
                        />
                      </View>
                      <Text style={currentStyles.totalMedsTextStyle}>
                        ({nearExpiryMeds.length} medicines)
                      </Text>
                    </View>

                    {/* Near Expiry */}
                    <View style={[commonStyles.mt25]}>
                      <FlatList
                        data={nearExpiryMeds}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ marginBottom: 10 }}>
                              <MedicineCard
                                expiryDate={item.expiry_date}
                                medicineName={item.medicine_name}
                                category={item.category}
                                color={colors.darkYellow}
                                onPress={() => {
                                  navigation.navigate('MedicineDetailsScreen', {
                                    medicineDetails: {
                                      id: item.id,
                                    },
                                  });
                                }}
                              />
                            </View>
                          );
                        }}
                        keyExtractor={(item, index) => item.id}
                        horizontal
                        ItemSeparatorComponent={() => (
                          <View style={commonStyles.ml20} />
                        )}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  </View>
                ) : null}

                {expiredMeds.length > 0 ? (
                  <View>
                    <View style={currentStyles.MedsView}>
                      <Text style={currentStyles.expiredTextStyle}>
                        Expired
                      </Text>
                      <View style={commonStyles.mt8}>
                        <CircleAlertIcon color={colors.error} size={25} />
                      </View>
                      <Text style={currentStyles.totalMedsTextStyle}>
                        ({expiredMeds.length} medicines)
                      </Text>
                    </View>

                    {/* Expired */}
                    <View style={[commonStyles.mt25]}>
                      <FlatList
                        data={expiredMeds}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ marginBottom: 10 }}>
                              <MedicineCard
                                expiryDate={item.expiry_date}
                                medicineName={item.medicine_name}
                                category={item.category}
                                color={colors.error}
                                onPress={() => {
                                  navigation.navigate('MedicineDetailsScreen', {
                                    medicineDetails: {
                                      id: item.id,
                                    },
                                  });
                                }}
                              />
                            </View>
                          );
                        }}
                        keyExtractor={(item, index) => item.id}
                        horizontal
                        ItemSeparatorComponent={() => (
                          <View style={commonStyles.ml20} />
                        )}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            )
          ) : isLoading ? (
            <View style={commonStyles.mt30}>
              <ActivityIndicator size="large" color={colors.primaryBlue} />
            </View>
          ) : (
            <View
              style={[commonStyles.mt18, commonStyles.aic, commonStyles.flex1]}
            >
              <LottieView
                ref={emptyAnimationRef}
                source={require('src/assets/lottie/Empty.json')}
                autoPlay
                loop
                style={currentStyles.emptyStyle}
              />
              <View>
                <Text style={currentStyles.noMedicinesTextStyle}>
                  No Medicines Added Yet
                </Text>
              </View>
              <View style={commonStyles.mt10}>
                <Text style={currentStyles.getStartedTextStyle}>
                  Let's get started by adding your first medicine
                </Text>
              </View>
              <Button
                label="Add Medicine"
                mainStyle={[commonStyles.w75per, commonStyles.mt18]}
                icon={<PlusCircleIcon color={colors.pureWhite} size={20} />}
                labelStyle={currentStyles.addButtonLabelStyle}
                onPress={() => {
                  navigation.navigate('AddMedicineScreen', {
                    addMedicineDetails: {
                      isFirstAdd: true,
                    },
                  });
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </BackgroundFill>
  );
};

export default DashboardScreen;
