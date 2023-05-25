import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../screens/Search';
import routeNames from '../constants/routeNames';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={routeNames.HOME.SUB_ROUTES.SEARCH}
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default App;
