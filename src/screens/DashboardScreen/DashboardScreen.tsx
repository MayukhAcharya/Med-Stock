import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';

const DashboardScreen = () => {
  return (
    <SafeAreaView
      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    >
      <Text
        style={{
          color: 'black',
          fontFamily: 'PlusJakartaSans-Medium',
          fontSize: 50,
        }}
      >
        BANKAI
      </Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;
