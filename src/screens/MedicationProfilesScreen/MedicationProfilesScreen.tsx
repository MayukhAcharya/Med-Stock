import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { styles } from 'src/screens/MedicationProfilesScreen/styles';
import { commonStyles } from 'src/config/commonStyles';
import ProfileCard from 'src/components/ProfileCard/ProfileCard';
import { colors } from 'src/config/colors';
import { MedicationProfileStack } from 'src/navigation/types';
import BackgroundFill from 'src/components/BackgroundFill/BackgroundFill';
import { database } from 'src/Database/database';
import LottieView from 'lottie-react-native';

type navigationPropsForHealthProfile = NativeStackNavigationProp<
  MedicationProfileStack,
  'MedicationProfilesScreen'
>;

type healthProfileTypes = {
  gender: string;
  gender_avatar: string;
  id: string;
  medication_type: string;
  medicine_array: string;
  profile_name: string;
};

const MedicationProfilesScreen = () => {
  const currentStyles = styles();
  const navigation = useNavigation<navigationPropsForHealthProfile>();
  const healthProfileRef = useRef<LottieView>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [healthProfile, setHealthProfile] = useState<healthProfileTypes[]>([]);

  const getHealthProfilesMethod = () => {
    setIsLoading(true);
    try {
      const healthProfileData = database.get('healthProfiles');
      healthProfileData
        .query()
        .observe()
        .forEach(item => {
          let temp: any = [];
          item.forEach(data => {
            temp.push(data._raw);
          });
          setHealthProfile(temp);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (healthProfileRef.current) {
        healthProfileRef?.current?.pause();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = getHealthProfilesMethod();
      return () => unsubscribe;
    }, []),
  );

  const emptyField = () => {
    return (
      <View style={[commonStyles.flex1, commonStyles.aic]}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primaryBlue} />
        ) : (
          <View style={currentStyles.healthExplainBox}>
            <LottieView
              ref={healthProfileRef}
              source={require('src/assets/lottie/HealthProfile.json')}
              style={currentStyles.heartImageStyle}
              autoPlay
              loop
            />
            <View style={commonStyles.mt20}>
              <Text style={currentStyles.manageTextStyle}>
                Manage Health Profiles
              </Text>
            </View>
            <View style={commonStyles.mt20}>
              <Text style={currentStyles.healthProfileExplainTextStyle}>
                Keep track of who takes what and when—whether it's for you or
                your family. Just add a profile and set medicine times to stay
                on top of daily doses with ease! Press{' '}
                <Text
                  style={currentStyles.hereTextStyle}
                  onPress={() => {
                    navigation.navigate('AddHealthProfileScreen');
                  }}
                >
                  here
                </Text>{' '}
                or the button at the bottom to get started!
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <BackgroundFill>
        <View style={currentStyles.container}>
          <View>
            <FlatList
              data={healthProfile}
              renderItem={({ item, index }) => {
                let imageSource;
                const gender = item.gender;
                const genderAvatar = item.gender_avatar;

                if (gender === 'Male') {
                  switch (genderAvatar) {
                    case '1':
                      imageSource = require('src/assets/img/male1.png');
                      break;
                    case '2':
                      imageSource = require('src/assets/img/male2.png');
                      break;
                    case '3':
                      imageSource = require('src/assets/img/male3.png');
                      break;
                    default:
                      imageSource = require('src/assets/img/male4.png');
                  }
                } else {
                  switch (genderAvatar) {
                    case '1':
                      imageSource = require('src/assets/img/female1.png');
                      break;
                    case '2':
                      imageSource = require('src/assets/img/female2.png');
                      break;
                    case '3':
                      imageSource = require('src/assets/img/female3.png');
                      break;
                    default:
                      imageSource = require('src/assets/img/female4.png');
                  }
                }
                return (
                  <View style={currentStyles.flatlistInnerView}>
                    <ProfileCard
                      image={imageSource}
                      userProfileName={item.profile_name}
                      onPress={() => {
                        navigation.navigate('HealthProfileMedicationScreen', {
                          medicationsData: {
                            id: item.id,
                            profileName: item.profile_name,
                            medicationName: item.medication_type,
                          },
                        });
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => `#_${item.id}`}
              numColumns={2}
              key={'#'}
              ListEmptyComponent={emptyField}
            />
          </View>
          <View style={commonStyles.flex1}>
            <View style={currentStyles.fabButtonStyle}>
              <Pressable
                onPress={() => {
                  navigation.navigate('AddHealthProfileScreen');
                }}
                style={currentStyles.plusIconPressStyle}
              >
                <PlusIcon color={colors.pureWhite} />
              </Pressable>
            </View>
          </View>
        </View>
      </BackgroundFill>
    </>
  );
};

export default MedicationProfilesScreen;
