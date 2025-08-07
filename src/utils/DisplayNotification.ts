import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const addChannelId = async () => {
  let channelId: any = null;
  if (!channelId) {
    channelId = await notifee.createChannel({
      id: 'app',
      name: 'Miscellaneous',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      visibility: AndroidVisibility.PUBLIC,
    });
  }

  return channelId;
};

export const onDisplayNotification = async (
  title: string,
  notificationText: string,
) => {
  await notifee.displayNotification({
    title: title,
    body: notificationText,
    android: {
      channelId: await addChannelId(),
      pressAction: {
        id: 'default',
      },
    },
  });
};
