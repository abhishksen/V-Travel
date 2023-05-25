import React, {useState, useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Login from './screens/Login';
import HomeRoutes from './routes/Home.routes';
import theme from './settings/theme.settings';
import routeNames from './constants/routeNames';

const Stack = createStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const App = () => {
  const [userData, setuserData] = useState(null);

  function onAuthStateChanged(user) {
    if (user) {
      setuserData({name: user.displayName, email: user.email, uid: user.uid});
    } else {
      setuserData(null);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={navTheme}>
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
