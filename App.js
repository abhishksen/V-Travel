import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import Login from './screens/Login';
import HomeRoutes from './routes/Home.routes';
import InternalRoutes from './routes/Internal.routes';
import theme from './settings/theme.settings';
import routeNames from './constants/routeNames';

import {setUser} from './redux/reducers/authReducer';
import {doUserExists} from './utils/firestore.utils';
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  const userData = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async function (user) {
      if (user) {
        const do_exists = await doUserExists(user.email);

        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            service_type: do_exists ? 'internal' : 'external',
            is_registered_member: do_exists,
            isLoggedIn: true,
            isLoading: false,
          }),
        );
      } else {
        dispatch(setUser({}));
      }
    });

    SplashScreen.hide();
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!userData.isLoggedIn ? (
            <Stack.Screen name={routeNames.LOGIN.NAME} component={Login} />
          ) : userData.service_type === 'internal' ? (
            <Stack.Screen
              name={routeNames.INTERNAL.NAME}
              component={InternalRoutes}
            />
          ) : (
            <Stack.Screen name={routeNames.HOME.NAME} component={HomeRoutes} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
