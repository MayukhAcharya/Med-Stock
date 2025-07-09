import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/screens/MedicationProfilesScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import ProfileCard from 'src/components/ProfileCard/ProfileCard';
import { colors } from 'src/config/colors';
import AddHealthProfileBottomSheet from 'src/components/AddHealthProfileBottomSheet/AddHealthProfileBottomSheet';
import { MedicationProfileStack } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';

type navigationPropsForHealthProfile = NativeStackNavigationProp<
  MedicationProfileStack,
  'MedicationProfilesScreen'
>;

const MedicationProfilesScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForHealthProfile>();

  const [showHealthProfileModal, setShowHealthProfileModal] =
    useState<boolean>(false);
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
