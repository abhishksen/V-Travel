import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HStack, IconButton, Image, Menu} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

import Home from '../screens/Internal/Home';

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
        name={routeNames.INTERNAL.SUB_ROUTES.HOME}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default InternalRoutes;
