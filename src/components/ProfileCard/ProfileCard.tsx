import { View, Text, Image } from 'react-native';
import React from 'react';

import { styles } from 'src/components/ProfileCard/styles';

type profileCardTypes = {
  userProfileName: string;
  image: any;
};

const ProfileCard = (props: profileCardTypes) => {
  const currentStyles = styles();
  const { userProfileName, image } = props;
  return (
    <View style={currentStyles.boxContainer}>
      <Image source={image} style={currentStyles.imageStyle} />

      <Text style={currentStyles.profileTextStyle}>
        {userProfileName}'s meds
      </Text>
    </View>
  );
};

export default ProfileCard;
