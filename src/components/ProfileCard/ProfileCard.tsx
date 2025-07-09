import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/ProfileCard/styles';

type profileCardTypes = {
  userProfileName: string;
  image: any;
  onPress: () => void;
};

const ProfileCard = (props: profileCardTypes) => {
  const currentStyles = styles();
  const { userProfileName, image, onPress } = props;
  return (
    <TouchableOpacity style={currentStyles.boxContainer} onPress={onPress}>
      <Image source={image} style={currentStyles.imageStyle} />

      <Text style={currentStyles.profileTextStyle}>
        {userProfileName}'s meds
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileCard;
