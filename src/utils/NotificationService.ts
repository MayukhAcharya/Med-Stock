import { AppState } from 'react-native';
import { onDisplayNotification } from './DisplayNotification';

export const notificationService = async (title: string, body: string) => {
  const appState = AppState.currentState;

  if (appState === 'active') {
    return; //does nothing
  }

  await onDisplayNotification(title, body);
};
