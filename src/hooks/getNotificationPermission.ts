import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Alert, Linking } from 'react-native';

export const requestPermssion = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    // const alarmSettings = await notifee.getNotificationSettings();
    // if (alarmSettings.android.alarm != AndroidNotificationSetting.ENABLED) {
    //   await notifee.openAlarmPermissionSettings();
    // } to be used in health profile when adding it
    await batteryOptimizationMethod();
    return 'Authorized';
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    Alert.alert('Permission', 'Permission needed to send Notifications', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Settings',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ]);
  }
};

export const batteryOptimizationMethod = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
};
