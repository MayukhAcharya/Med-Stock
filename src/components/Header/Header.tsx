import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { styles } from 'src/components/Header/styles';
import { ArrowLeftIcon, LogOut } from 'lucide-react-native';
import { colors } from 'src/config/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';

type headerProps = {
  title: string;
  showBackIcon?: boolean;
  signout?: boolean;
};

type NavigationProps = NativeStackNavigationProp<AuthStackParamList>;

const Header = (props: headerProps) => {
  const currentStyles = styles();
  const { title, showBackIcon = false, signout = false } = props;
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.headerView}>
        {showBackIcon ? (
          <TouchableOpacity
            style={currentStyles.side}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        ) : (
          <View style={currentStyles.placeholder} />
        )}
        <View style={currentStyles.center}>
          <Text style={currentStyles.titleTextContainer}>{title}</Text>
        </View>
        {signout ? (
          <TouchableOpacity style={currentStyles.side}>
            <LogOut color={colors.error} />
          </TouchableOpacity>
        ) : (
          <View style={currentStyles.placeholder} />
        )}
      </View>
    </View>
  );
};

export default Header;
