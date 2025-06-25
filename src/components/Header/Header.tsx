import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/Header/styles';
import { commonStyles } from 'src/config/commonStyles';
import { BackArrowIcon } from 'src/assets/svg/BackArrowIcon';
import { ArrowLeftIcon, LogOut } from 'lucide-react-native';
import { colors } from 'src/config/colors';

type headerProps = {
  title: string;
  showBackIcon?: boolean;
  signout?: boolean;
};

const Header = (props: headerProps) => {
  const currentStyles = styles();
  const { title, showBackIcon = false, signout = false } = props;
  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.headerView}>
        {showBackIcon ? (
          <TouchableOpacity style={commonStyles.mt8}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Text style={currentStyles.titleTextContainer}>{title}</Text>
        {signout ? (
          <TouchableOpacity>
            <LogOut color={colors.error} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default Header;
