import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Internal/Home';
import HeaderRight from '../components/HeaderRight';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';
import useFetchBuses from '../hooks/useFetchBuses';

const Stack = createStackNavigator();

const InternalRoutes = () => {
  useFetchBuses();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary[500],
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'RedHatDisplay-SemiBold',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        options={{
          title: 'Vedanta Baitho',

          headerLeftContainerStyle: {
            marginLeft: 6,
          },

          headerRightContainerStyle: {
            marginRight: 8,
          },

          headerRight: HeaderRight,
        }}
        name={routeNames.INTERNAL.SUB_ROUTES.HOME}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default InternalRoutes;
