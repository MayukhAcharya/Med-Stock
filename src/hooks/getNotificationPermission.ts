import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const getNotificationPermission = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    return 'Authorized';
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    return 'Denied';
  }
};
