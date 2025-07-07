import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react-native';

import { styles } from 'src/screens/MedicationProfilesScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import ProfileCard from 'src/components/ProfileCard/ProfileCard';
import { colors } from 'src/config/colors';
import AddHealthProfileBottomSheet from 'src/components/AddHealthProfileBottomSheet/AddHealthProfileBottomSheet';

const MedicationProfilesScreen = () => {
  const currentStyles = styles();

  const [showHealthProfileModal, setShowHealthProfileModal] =
    useState<boolean>(false);
  return (
    <>
      <View style={currentStyles.container}>
        <View style={[commonStyles.row, commonStyles.spaceBetween]}>
          <ProfileCard
            image={require('src/assets/img/male1.png')}
            userProfileName="Mayukh"
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
    </>
  );
};

export default MedicationProfilesScreen;
