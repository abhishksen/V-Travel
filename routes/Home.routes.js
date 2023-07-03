import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../screens/Search';
import BusNumSearch from '../screens/BusNumSearch';
import BusStationSearch from '../screens/StationSearch';
import BusList from '../screens/BusList';
import Blogs from '../screens/Blogs';
import SingleBlog from '../screens/SingleBlog';
import HeaderRight from '../components/HeaderRight';

import BusResult from '../routes/BusResult.routes';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';
import useFetchBuses from '../hooks/useFetchBuses';

const Stack = createStackNavigator();

const App = () => {
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
          title: 'V-Travel',

          headerLeftContainerStyle: {
            marginLeft: 6,
          },

          headerRightContainerStyle: {
            marginRight: 8,
          },

          headerRight: HeaderRight,
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
          title: 'Availale Buses',
        }}
        name={routeNames.HOME.SUB_ROUTES.BUS_LIST}
        component={BusList}
      />
      <Stack.Screen
        options={({route}) => ({
          title: route.params.id + ' - ' + route.params.title,
        })}
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.NAME}
        component={BusResult}
      />
      <Stack.Screen
        options={{
          title: 'Vedanta Blogs',
        }}
        name={routeNames.HOME.SUB_ROUTES.BLOGS}
        component={Blogs}
      />
      <Stack.Screen
        options={({route}) => ({
          title: route.params.title,
        })}
        name={routeNames.HOME.SUB_ROUTES.SINGLE_BLOG}
        component={SingleBlog}
      />
    </Stack.Navigator>
  );
};

export default App;
