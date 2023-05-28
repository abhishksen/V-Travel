import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../screens/Search';
import BusNumSearch from '../screens/BusNumSearch';
import BusStationSearch from '../screens/StationSearch';
import BusList from '../screens/BusList';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const App = () => {
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
          title: 'Track Bus',
        }}
        name={routeNames.HOME.SUB_ROUTES.SEARCH}
        component={Search}
      />
      <Stack.Screen
        options={{
          title: 'Search Bus Number',
        }}
        name={routeNames.HOME.SUB_ROUTES.BUS_NUM_SEARCH}
        component={BusNumSearch}
      />
      <Stack.Screen
        options={{
          title: 'Search Bus Stand',
        }}
        name={routeNames.HOME.SUB_ROUTES.BUS_ST_SEARCH}
        component={BusStationSearch}
      />
      <Stack.Screen
        options={{
          title: 'Available Buses',
        }}
        name={routeNames.HOME.SUB_ROUTES.BUS_LIST}
        component={BusList}
      />
    </Stack.Navigator>
  );
};

export default App;
