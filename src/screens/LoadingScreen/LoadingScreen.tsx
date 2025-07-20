import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import { styles } from 'src/screens/LoadingScreen/styles';
import normalize from 'src/config/normalize';

const LoadingScreen = () => {
  const currentStyles = styles();
  return (
    <View style={currentStyles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <LottieView
        source={require('src/assets/lottie/Wave.json')}
        autoPlay
        loop
        style={{
          width: normalize(200, 'width'),
          height: normalize(200, 'height'),
        }}
      />
    </View>
  );
};

export default LoadingScreen;
