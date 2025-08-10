import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation/AppNavigation';
import BackgroundFetch from 'react-native-background-fetch';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function App() {
  const initBackgroundFetch = async () => {
    // Configure the background fetch
    const status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      },
      async taskId => {
        // This is the task that will run in the background.
        console.log('[BackgroundFetch] taskId: ', taskId);

        // --- YOUR BACKGROUND TASK GOES HERE ---
        // e.g., await fetchNewMessages();
        console.log('Fetching data in the background...');
        // ---

        // IMPORTANT: You MUST call finish() when your task is done.
        // The OS will penalize your app if you don't.
        BackgroundFetch.finish(taskId);
      },
      taskId => {
        // This is an optional timeout callback.
        console.log('[BackgroundFetch] TIMEOUT taskId: ', taskId);
        BackgroundFetch.finish(taskId);
      },
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

  useEffect(() => {
    // Initialize the background fetch
    initBackgroundFetch();
  }, []);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <AppNavigation />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}

export default App;
