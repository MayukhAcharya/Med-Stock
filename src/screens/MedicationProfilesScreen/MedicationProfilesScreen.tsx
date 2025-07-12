import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { styles } from 'src/screens/MedicationProfilesScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import ProfileCard from 'src/components/ProfileCard/ProfileCard';
import { colors } from 'src/config/colors';
import AddHealthProfileBottomSheet from 'src/components/AddHealthProfileBottomSheet/AddHealthProfileBottomSheet';
import { MedicationProfileStack } from 'src/navigation/types';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { database } from 'src/Database/database';

type navigationPropsForHealthProfile = NativeStackNavigationProp<
  MedicationProfileStack,
  'MedicationProfilesScreen'
>;

const MedicationProfilesScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForHealthProfile>();

  const [showHealthProfileModal, setShowHealthProfileModal] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getHealthProfilesMethod = () => {
    setIsLoading(true);
    try {
      const healthProfileData = database.get('healthProfiles');
      healthProfileData
        .query()
        .observe()
        .forEach(item => {
          console.log(item);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getHealthProfilesMethod();
      return () => unsubscribe;
    }, []),
  );
  return (
    <>
      <BackgroundFill>
        <View style={currentStyles.container}>
          <View style={[commonStyles.row, commonStyles.spaceBetween]}>
            <ProfileCard
              image={require('src/assets/img/male1.png')}
              userProfileName="Mayukh"
              onPress={() => {
                navigation.navigate('HealthProfileMedicationScreen');
              }}
            />
          </View>
          <View style={commonStyles.flex1}>
            <View style={currentStyles.fabButtonStyle}>
              <Pressable
                onPress={() => {
                  setShowHealthProfileModal(true);
                }}
                style={currentStyles.plusIconPressStyle}
              >
                <PlusIcon color={colors.pureWhite} />
              </Pressable>
            </View>
          </View>
          {showHealthProfileModal ? (
            <AddHealthProfileBottomSheet
              onClose={() => setShowHealthProfileModal(false)}
              isVisible={showHealthProfileModal}
            />
          ) : null}
        </View>
      </BackgroundFill>
    </>
  );
};

export default MedicationProfilesScreen;
