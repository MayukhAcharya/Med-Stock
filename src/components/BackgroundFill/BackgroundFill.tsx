import { View, Text, useColorScheme } from 'react-native';
import React, { ReactNode } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';

import { styles } from 'src/components/BackgroundFill/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type backgroundProps = {
  showDesign: boolean;
  children: ReactNode;
  backgroundColor?: 'white' | 'offwhite';
  scroll?: boolean;
};

const BackgroundFill = (props: backgroundProps) => {
  const {
    children,
    showDesign = false,
    backgroundColor = 'white',
    scroll = false,
  } = props;
  const currentStyles = styles(backgroundColor);
  return showDesign ? (
    scroll ? (
      <LinearGradient
        colors={['#2567E8', '#1CE6DA']}
        style={currentStyles.container}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      </LinearGradient>
    ) : (
      <LinearGradient
        colors={['#2567E8', '#1CE6DA']}
        style={currentStyles.container}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        {children}
      </LinearGradient>
    )
  ) : (
    <View style={[currentStyles.container, currentStyles.backgroundColor]}>
      {children}
    </View>
  );
};

export default BackgroundFill;
