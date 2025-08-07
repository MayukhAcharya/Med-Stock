/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import notifee, { EventType, TriggerType } from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';

import { notificationService } from 'src/utils/NotificationService';
import { getExpiredMedicines } from 'src/utils/getExpiredMedicines';
import { ReusableDateFormatter } from 'src/utils/FormattedDate';
import { getHealthProofileForCancelNotis } from 'src/utils/getHealthProfileForCancelNotis';
import { database } from 'src/Database/database';
import HealthProfile from 'src/Database/healthProfileModel';
import { updateHealthProfileToDone } from 'src/utils/updateHealthProfileToDone';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;

  // Use a switch statement to handle different event types
  switch (type) {
    case EventType.DISMISSED:
      // User dismissed the notification
      console.log('User dismissed notification', notification.id);
      // You could cancel a repeating alarm here, for example
      break;
    case EventType.PRESS:
      // User pressed the notification
      console.log('User pressed notification', notification.id);
      // This is often handled by the app opening, but you can add logic here
      break;
    case EventType.TRIGGER_NOTIFICATION_CREATED:
      // This is the event that fires when your trigger notification is created.
      // DO NOT display another notification here.
      console.log(
        'Trigger notification was created by the system',
        notification.id,
      );
      // Perform any background tasks needed *after* the notification is shown,
      // but do not display it again.
      break;
  }
});

const HeadlessTask = async event => {
  console.log('[HeadlessTask] event:', event.taskId);

  const expiredMedicines = await getExpiredMedicines();
  const { flattenedNotificationIds, profileIds } =
    await getHealthProofileForCancelNotis();

  for (let [index, item] of expiredMedicines.entries()) {
    const { medicine_name, expiry_date } = item;
    await notificationService(
      `${medicine_name} is Expired`,
      `${medicine_name} expired on ${ReusableDateFormatter(
        expiry_date,
      )}. Please discard or replace it.`,
    );
  }

  if (flattenedNotificationIds.length > 0) {
    await notifee.cancelTriggerNotifications(flattenedNotificationIds);
  }

  if (profileIds.length > 0) {
    await updateHealthProfileToDone(profileIds);
  }

  BackgroundFetch.finish(event.taskId);
};

BackgroundFetch.registerHeadlessTask(HeadlessTask);

AppRegistry.registerComponent(appName, () => App);
