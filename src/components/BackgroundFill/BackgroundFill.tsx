import { View, Text, useColorScheme, StatusBar } from 'react-native';
import React, { ReactNode } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styles } from 'src/components/BackgroundFill/styles';
import { commonStyles } from 'src/config/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
        </LinearGradient>
      </>
    ) : (
      <>
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
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          {children}
        </LinearGradient>
      </>
    )
  ) : (
    <>
      {scroll ? (
        <View style={commonStyles.flex1}>
          <KeyboardAwareScrollView
            style={[commonStyles.flex1, currentStyles.backgroundColor]}
          >
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={'dark-content'}
            />
            {children}
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <View style={[currentStyles.container, currentStyles.backgroundColor]}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          {children}
        </View>
      )}
    </>
  );
};

export default BackgroundFill;
