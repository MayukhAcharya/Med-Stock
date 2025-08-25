import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Alert, Linking, PermissionsAndroid } from 'react-native';
import { database } from 'src/Database/database';
import Profile from 'src/Database/profileModel';

export const requestPermssion = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    await batteryOptimizationMethod();
    return 'Authorized';
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    Alert.alert(
      'Warning',
      'You will not get important notifications, please update the notifcation permission now',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: async () => {
            Linking.openSettings();
          },
        },
      ],
    );
  }
};

export const batteryOptimizationMethod = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    Alert.alert(
      'Battery Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () =>
            await notifee.openBatteryOptimizationSettings().then(async res => {
              const profileData = database.get('profile');
              const items: any = await profileData.query().fetch();

              const profileId = items[0]._raw.id;
              const autostartEnabled = items[0]._raw.autoStart;

              await autostartMethod(profileId, autostartEnabled);
            }),
        },
      ],
      { cancelable: false },
    );
  } else {
    const profileData = database.get('profile');
    const items: any = await profileData.query().fetch();

    const profileId = items[0]._raw.id;
    const autostartEnabled = items[0]._raw.autoStart;
    await autostartMethod(profileId, autostartEnabled);
  }
};

export const autostartMethod = async (
  profileId: string,
  autostartEnabled: boolean,
) => {
  const powerManagerInfo = await notifee.getPowerManagerInfo();

  if (!autostartEnabled) {
    if (powerManagerInfo.activity) {
      Alert.alert(
        'AutoStart Restrictions Detected',
        'To ensure notifications are delivered, please turn on Autostart to prevent the app from being killed',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => {
              await profileUpdateMethod(profileId);
              await notifee.openPowerManagerSettings();
            },
          },
        ],
        { cancelable: false },
      );
    }
  }
};

const profileUpdateMethod = async (id: string) => {
  try {
    const profileUpdate = await database.get<Profile>('profile').find(id);
    await database.write(async () => {
      await profileUpdate.update(() => {
        profileUpdate.autostart = true;
      });
    });
  } catch (error) {
    console.log(error);
  }
};
