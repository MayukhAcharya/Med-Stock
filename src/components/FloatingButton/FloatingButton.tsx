import { View, Pressable } from 'react-native';
import React from 'react';
import { PlusIcon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from 'src/components/FloatingButton/styles';
import { colors } from 'src/config/colors';
import { AllMedicineStackParamList } from 'src/navigation/types';
import { useNavigation } from '@react-navigation/native';

type navigationPropsToAddMedicine =
  NativeStackNavigationProp<AllMedicineStackParamList>;

type floatinButtonProps = {
  isFistAdd: boolean;
};

const FloatingButton = (props: floatinButtonProps) => {
  const { isFistAdd } = props;
  const currentStyles = styles();

  const navigation = useNavigation<navigationPropsToAddMedicine>();

  return (
    <View style={[currentStyles.container]}>
      <View style={[currentStyles.fab]}>
        <Pressable
          onPress={() => {
            navigation.navigate('AddMedicineScreen', {
              addMedicineDetails: {
                isFirstAdd: isFistAdd,
              },
            });
          }}
          style={currentStyles.plusIconPressStyle}
        >
          <PlusIcon color={colors.pureWhite} />
        </Pressable>
      </View>
    </View>
  );
};

export default FloatingButton;
