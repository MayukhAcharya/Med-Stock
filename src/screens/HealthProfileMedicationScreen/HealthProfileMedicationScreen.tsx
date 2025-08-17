import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { Edit, Trash2Icon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import notifee from '@notifee/react-native';

import { styles } from 'src/screens/HealthProfileMedicationScreen/styles';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { commonStyles } from 'src/config/commonStyles';
import MedicineListCard from 'src/components/MedicineListCard/MedicineListCard';
import { colors } from 'src/config/colors';
import { MedicationProfileStack } from 'src/navigation/types';
import { database } from 'src/Database/database';
import HealthProfile from 'src/Database/healthProfileModel';

type navigationPropsForMedication = NativeStackNavigationProp<
  MedicationProfileStack,
  'HealthProfileMedicationScreen'
>;

type routeProps = RouteProp<
  MedicationProfileStack,
  'HealthProfileMedicationScreen'
>;

type medicationsTypes = {
  medicineName: string;
  medicineId: string;
  medicationTime: string;
  category: string;
  id: string;
};

type healthProfileTypes = {
  end_date: string;
  gender: string;
  gender_avatar: string;
  id: string;
  medication_type: string;
  profile_name: string;
  start_date: string;
  medicine_array: any;
};

const HealthProfileMedicationScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForMedication>();
  const route = useRoute<routeProps>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [medications, setMedications] = useState<healthProfileTypes>({
    end_date: '',
    gender: '',
    gender_avatar: '',
    id: '',
    medication_type: '',
    medicine_array: '[]',
    profile_name: '',
    start_date: '',
  });

  const getMedicationsMethod = async () => {
    setIsLoading(true);
    const medications = await database
      .get('healthProfiles')
      .find(route.params?.medicationsData.id);
    const data: any = medications._raw;
    setMedications(data);
    setIsLoading(false);
  };

  const deleteHealthProfileMethod = async () => {
    try {
      const healthProfile = await database
        .get<HealthProfile>('healthProfiles')
        .find(route.params.medicationsData.id);
      await database.write(async () => {
        healthProfile.destroyPermanently();
      });

      const allMedicine = JSON.parse(medications.medicine_array);
      const notificationIds = allMedicine.map(
        (item: any) => item.notificationId,
      );
      await notifee.cancelAllNotifications(notificationIds); // cancels all the notification Ids so that user will not receive further notification when deleted

      navigation.reset({
        routes: [
          {
            name: 'MedicationProfilesScreen',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteIcon = () => {
    Alert.alert(
      'Are you sure?',
      `Do you want to delete ${route.params.medicationsData.profileName}'s health profile? This will be deleted Permanently`,
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteHealthProfileMethod();
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  const handleNavigationMethod = async (item: any) => {
    try {
      const medicineDetails = await database
        .get('medicines')
        .find(item.medicineId);
      const data: any = medicineDetails._raw;
      if (data) {
        navigation.navigate('MedicineDetailsScreen', {
          medicineDetails: {
            id: item.medicineId,
          },
        });
      }
    } catch (error) {
      ToastAndroid.show(
        `${item.medicineName} is deleted permanently`,
        ToastAndroid.SHORT,
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getMedicationsMethod();
      return () => unsubscribe;
    }, []),
  );
  return (
    <BackgroundFill showDesign={false}>
      <View style={currentStyles.container}>
        <View style={commonStyles.aic}>
          <FlatList
            data={JSON.parse(medications.medicine_array)}
            renderItem={({ item, index }) => {
              return (
                <MedicineListCard
                  medicineName={item.medicineName}
                  category={item.category}
                  onPress={() => {
                    handleNavigationMethod(item);
                  }}
                  medicationTime={item.medicationTime}
                  isHealthProfile={true}
                />
              );
            }}
            keyExtractor={item => item.medicineId}
            ItemSeparatorComponent={() => <View style={commonStyles.mt20} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={commonStyles.flex1}>
          <View style={currentStyles.fabButtonStyle2}>
            <TouchableOpacity
              onPress={() => {
                handleDeleteIcon();
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Trash2Icon color={colors.pureWhite} size={22} />
              <Text style={currentStyles.fabButtonTextStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View style={currentStyles.fabButtonStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditMedicationScreen', {
                  editMedicationData: {
                    id: route.params.medicationsData.id,
                    medication: JSON.parse(medications.medicine_array),
                    startDate: medications.start_date,
                    endDate: medications.end_date,
                    medicationType: medications.medication_type,
                    profileName: medications.profile_name,
                  },
                });
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Edit color={colors.pureWhite} size={22} />
              <Text style={currentStyles.fabButtonTextStyle}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default HealthProfileMedicationScreen;
