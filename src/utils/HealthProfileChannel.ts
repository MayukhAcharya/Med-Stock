import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const addHealthProfileChannelId = async () => {
  let healthProfileChannelId: any = await notifee.getChannel('healthProfile');
  if (!healthProfileChannelId) {
    healthProfileChannelId = await notifee.createChannel({
      id: 'healthProfile',
      name: 'Health Profiles',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      visibility: AndroidVisibility.PUBLIC,
    });
    return healthProfileChannelId;
  } else {
    return healthProfileChannelId.id;
  }
};
