import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/ProfileCard/styles';
import { commonStyles } from 'src/config/commonStyles';
import { CircleCheck } from 'lucide-react-native';
import { colors } from 'src/config/colors';

type profileCardTypes = {
  userProfileName: string;
  image: any;
  onPress: () => void;
  isDone: boolean;
};

const ProfileCard = (props: profileCardTypes) => {
  const currentStyles = styles();
  const { userProfileName, image, onPress, isDone = false } = props;
  return (
    <TouchableOpacity style={currentStyles.boxContainer} onPress={onPress}>
      <Image source={image} style={currentStyles.imageStyle} />

      <View style={[commonStyles.row, commonStyles.aic]}>
        <Text style={currentStyles.profileTextStyle}>
          {userProfileName}'s meds
        </Text>
        {isDone ? (
          <CircleCheck
            color={colors.green}
            style={commonStyles.ml6}
            size={20}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
