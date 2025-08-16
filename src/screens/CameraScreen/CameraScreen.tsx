import {
  View,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Circle, ZapIcon, ZapOffIcon } from 'lucide-react-native';

import { AllMedicineStackParamList } from 'src/navigation/types';
import { styles } from 'src/screens/CameraScreen/styles';
import { colors } from 'src/config/colors';
import CameraInfoModal from 'src/components/CameraInfoModal/CameraInfoModal';
import { commonStyles } from 'src/config/commonStyles';

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
  const [imageData, setImageData] = useState<string>('');
  const [useFlash, setUseFlash] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const findMedicineName = (data: any) => {
    setIsLoading(true);
    let medicineName = '';
    if (data.text === '') {
      medicineName = '';
    } else {
      for (let block of data.blocks) {
        let totalY = 0;
        for (let cornerPoints of block.cornerPoints) {
          if (cornerPoints.y >= 391 && cornerPoints.y <= 565) {
            totalY++;
          }
        }
        if (totalY === 4) {
          setIsLoading(false);
          return block.text;
        }
      }
    }

    setIsLoading(false);
    return '';
  };

  const takePicture = async () => {
    if (cameraRef.current !== null) {
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: true,
        enableAutoRedEyeReduction: true,
        flash: useFlash ? 'on' : 'off',
      });
      setImageData(photo.path);
      try {
        const result = await TextRecognition.recognize('file://' + photo.path);
        const finalMedicineName = findMedicineName(result);
        if (finalMedicineName) {
          navigation.navigate('AddMedicineScreen', {
            addMedicineDetails: {
              medicineName: finalMedicineName,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setImageData('');
      setShowModal(true);
    }, []),
  );

  if (device == null) return <View style={currentStyles.noCameraStyle} />;

  return cameraPermission ? (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      {showModal ? null : (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          enableZoomGesture={true}
          format={formatImage}
          photoQualityBalance="speed"
          zoom={0}
        />
      )}

      {imageData === '' ? (
        showModal ? null : (
          <>
            <View style={currentStyles.boxView}>
              <View style={currentStyles.box} />
            </View>

            <View style={currentStyles.bottomContainer}>
              <TouchableOpacity
                style={currentStyles.flashIcon}
                onPress={() => {
                  setUseFlash(!useFlash);
                }}
              >
                {useFlash ? (
                  <ZapIcon size={30} color={colors.pureWhite} />
                ) : (
                  <ZapOffIcon size={30} color={colors.pureWhite} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={currentStyles.shutterIcon}
                onPress={() => {
                  takePicture();
                }}
              >
                <Circle size={75} color={colors.pureWhite} />
              </TouchableOpacity>
            </View>
          </>
        )
      ) : (
        <ImageBackground
          source={{ uri: 'file://' + imageData }}
          style={currentStyles.imageWidth}
        >
          <View style={[commonStyles.justifyCenter, commonStyles.aic]}>
            <ActivityIndicator size={'large'} color={colors.primaryBlue} />
          </View>
        </ImageBackground>
      )}
      {showModal ? (
        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <CameraInfoModal
            onClose={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      ) : null}
    </SafeAreaView>
  ) : (
    <View style={currentStyles.noCameraStyle} />
  );
};

export default CameraScreen;
