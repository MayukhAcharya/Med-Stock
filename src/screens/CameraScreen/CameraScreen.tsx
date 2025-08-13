import { View, Alert, Linking, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AllMedicineStackParamList } from 'src/navigation/types';
import { styles } from 'src/screens/CameraScreen/styles';

type navigationPropsForCamera = NativeStackNavigationProp<
  AllMedicineStackParamList,
  'CameraScreen'
>;

const CameraScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForCamera>();
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const formatImage = useCameraFormat(device, [
    { photoResolution: { width: 1000, height: 800 } },
  ]);

  const [cameraPermission, setPermission] = useState(false);

  const getPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();

      if (permission === 'granted') {
        setPermission(true);
      } else if (permission === 'denied') {
        Alert.alert('Permission', 'Permission Needed to access Camera', [
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Settings',
            onPress: () => {
              Linking.openSettings();
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (device == null) return <View style={currentStyles.noCameraStyle} />;

  return cameraPermission ? (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        enableZoomGesture={true}
        format={formatImage}
        photoQualityBalance="speed"
      />
    </SafeAreaView>
  ) : (
    <View style={currentStyles.noCameraStyle} />
  );
};

export default CameraScreen;
