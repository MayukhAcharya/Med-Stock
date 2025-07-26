/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import notifee, { EventType, TriggerType } from '@notifee/react-native';

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

AppRegistry.registerComponent(appName, () => App);
