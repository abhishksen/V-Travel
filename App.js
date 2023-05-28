import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Login from './screens/Login';
import HomeRoutes from './routes/Home.routes';
import theme from './settings/theme.settings';
import routeNames from './constants/routeNames';

import {setUser} from './redux/reducers/authReducer';
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  const userData = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(
          setUser({name: user.displayName, email: user.email, uid: user.uid}),
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {userData ? (
            <Stack.Screen name={routeNames.HOME.NAME} component={HomeRoutes} />
          ) : (
            <Stack.Screen name={routeNames.LOGIN.NAME} component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
