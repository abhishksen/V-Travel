import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HStack, IconButton, Image, Menu} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import Search from '../screens/Search';
import BusNumSearch from '../screens/BusNumSearch';
import BusStationSearch from '../screens/StationSearch';
import BusList from '../screens/BusList';
import BusResult from '../routes/BusResult.routes';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';
import useFetchBuses from '../hooks/useFetchBuses';

import logo from '../assets/images/vlogo.jpg';

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
          title: 'Vedanta Baitho',

          headerRight: () => {
            return (
              <Menu
                w="190"
                mr={4}
                trigger={triggerProps => {
                  return (
                    <IconButton
                      {...triggerProps}
                      size={'md'}
                      variant="solid"
                      mr={4}
                      _icon={{
                        as: MaterialCommunityIcons,
                        name: 'face-man-profile',
                      }}
                    />
                  );
                }}>
                <Menu.Item onPress={() => auth().signOut()}>Logout</Menu.Item>
              </Menu>
            );
          },
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
        options={({route, navigation}) => ({
          title: route.params.id + ' - ' + route.params.title,
        })}
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.NAME}
        component={BusResult}
      />
    </Stack.Navigator>
  );
};

export default App;
