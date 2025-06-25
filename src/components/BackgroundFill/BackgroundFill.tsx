import { View, Text, useColorScheme, StatusBar } from 'react-native';
import React, { ReactNode } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';

import { styles } from 'src/components/BackgroundFill/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type backgroundProps = {
  children: ReactNode;
  backgroundColor?: 'white' | 'offwhite';
  scroll?: boolean;
  showDesign?: boolean;
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
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
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
      </>
    ) : (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
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
      </>
    )
  ) : (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {scroll ? (
        <KeyboardAwareScrollView
          style={[currentStyles.container, currentStyles.backgroundColor]}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={[currentStyles.container, currentStyles.backgroundColor]}>
          {children}
        </View>
      )}
    </>
  );
};

export default BackgroundFill;
