import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const addHealthProfileChannelId = async () => {
  let healthProfileChannelId: any = null;
  if (!healthProfileChannelId) {
    healthProfileChannelId = await notifee.createChannel({
      id: 'app',
      name: 'Health Profiles',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      visibility: AndroidVisibility.PUBLIC,
    });
  }

  return healthProfileChannelId;
};
