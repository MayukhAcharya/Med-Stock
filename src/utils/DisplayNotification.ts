import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const addChannelId = async () => {
  let channelId: any = await notifee.getChannel('app');
  if (!channelId) {
    channelId = await notifee.createChannel({
      id: 'app',
      name: 'Miscellaneous',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      visibility: AndroidVisibility.PUBLIC,
    });
    return channelId;
  } else {
    return channelId.id;
  }
};

export const onDisplayNotification = async (
  title: string,
  notificationText: string,
) => {
  const channelId = await addChannelId();
  try {
    await notifee.displayNotification({
      title: title,
      body: notificationText,
      android: {
        channelId: channelId,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_small_icon',
        color: '#FFFFFF',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
