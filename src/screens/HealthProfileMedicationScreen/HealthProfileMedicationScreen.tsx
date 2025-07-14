import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
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

const HealthProfileMedicationScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForMedication>();
  const route = useRoute<routeProps>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [medications, setMedications] = useState<medicationsTypes[]>([]);

  const getMedicationsMethod = async () => {
    setIsLoading(true);
    const medications = await database
      .get('healthProfiles')
      .find(route.params?.medicationsData.id);
    const data: any = medications._raw;
    setMedications(JSON.parse(data.medicine_array));
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
            data={medications}
            renderItem={({ item, index }) => {
              return (
                <MedicineListCard
                  medicineName={item.medicineName}
                  category={item.category}
                  onPress={() => {
                    navigation.navigate('MedicineDetailsScreen', {
                      medicineDetails: {
                        id: item.medicineId,
                      },
                    });
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
              <Trash2Icon color={colors.pureWhite} />
            </TouchableOpacity>
          </View>
          <View style={currentStyles.fabButtonStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditMedicationScreen', {
                  editMedicationData: {
                    id: route.params.medicationsData.id,
                    medication: medications,
                  },
                });
              }}
              style={currentStyles.plusIconPressStyle}
            >
              <Edit color={colors.pureWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundFill>
  );
};

export default HealthProfileMedicationScreen;
