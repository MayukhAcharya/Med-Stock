import { View, Text } from 'react-native';
import React from 'react';

import { styles } from 'src/components/CameraInfoModal/styles';
import { commonStyles } from 'src/config/commonStyles';
import Button from '../Button/Button';
import normalize from 'src/config/normalize';

type cameraInfoProps = {
  onClose: () => void;
};

const infoData = [
  {
    id: '1',
    text: 'Please keep the medicine name inside the box',
  },
  {
    id: '2',
    text: 'Please keep the medicine name as near as possible',
  },
  {
    id: '3',
    text: 'Use Flash if medicine name is coming wrong',
  },
  {
    id: '4',
    text: 'MedStock can make mistakes determining medicine name, please rectify it while adding it.',
  },
];

const CameraInfoModal = (props: cameraInfoProps) => {
  const currentStyles = styles();
  const { onClose } = props;
  return (
    <View style={currentStyles.mainContainer}>
      <View style={currentStyles.subContainer}>
        <View style={commonStyles.aic}>
          <Text style={currentStyles.beforeTextStyle}>Before Continuing</Text>
        </View>
        <View
          style={[
            commonStyles.mt16,
            commonStyles.justifyFlexStart,
            { rowGap: normalize(15) },
          ]}
        >
          {infoData.map((item, index) => {
            return (
              <View key={index}>
                <Text style={currentStyles.infoTextStyle}>
                  {index + 1}. {item.text}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={[commonStyles.aic, commonStyles.mt16]}>
          <Button
            label={`Ok, I've read it`}
            mainStyle={currentStyles.buttonStyle}
            labelStyle={currentStyles.buttonTextStyle}
            onPress={onClose}
          />
        </View>
      </View>
    </View>
  );
};

export default CameraInfoModal;
