import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

import App from './App';

import {store, persistor} from './redux/store';
import {notifHandler} from './utils/notif.utils';
import {name as appName} from './app.json';

const MainApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// Register background handler
messaging().setBackgroundMessageHandler(notifHandler);

AppRegistry.registerComponent(appName, () => MainApp);
