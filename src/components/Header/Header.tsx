import { View, Text } from 'react-native';
import React from 'react';

import { styles } from 'src/components/Header/styles';
import { commonStyles } from 'src/config/commonStyles';

type headerProps = {
  title: string;
};

const Header = (props: headerProps) => {
  const currentStyles = styles();
  const { title } = props;
  return (
    <View style={currentStyles.container}>
      <View style={commonStyles.mt25}>
        <Text style={currentStyles.titleTextContainer}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
