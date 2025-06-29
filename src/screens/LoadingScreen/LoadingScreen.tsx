import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import React from 'react';

import { styles } from 'src/screens/LoadingScreen/styles';

const LoadingScreen = () => {
  const currentStyles = styles();
  return (
    <View style={currentStyles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
