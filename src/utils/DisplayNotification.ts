import notifee from '@notifee/react-native';

export const onDisplayNotification = async (
  title: string,
  notificationText: string,
) => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'app',
    name: 'Notification Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: notificationText,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
};
