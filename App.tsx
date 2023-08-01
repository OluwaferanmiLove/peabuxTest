import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {Platform, UIManager} from 'react-native';
import {persistor, store} from '@redux/store';
import {useCallback, useEffect} from 'react';
import BaseApp from '@navigation/AppNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {customFonts} from '@constant/staticData';
import * as Notifications from 'expo-notifications';
import useNotificationHandler from '@hooks/useNotificationHandler';
import {ToastProvider} from 'react-native-toast-notifications';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);
  useNotificationHandler();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          placement={'top'}
          duration={3000}
          animationType={'zoom-in'}
          animationDuration={200}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          // offset={50}
          offsetBottom={Platform.select({android: 50, ios: 50})}
          offsetTop={Platform.select({android: 60, ios: 50})}
          swipeEnabled={true}>
          <BaseApp />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
