import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import LiveStatus from '../screens/LiveStatus';
import TimeTable from '../screens/TimeTable';
import Seats from '../screens/Seats';
import MedicalEmergency from '../screens/MedicalEmergency';
import MapView from '../screens/MapView';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

function BusResultRoutes({route}) {
  const id = route.params.id;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: colors.primary[500],
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: 'RedHatDisplay-SemiBold',
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.LIVE_BUS_STATUS}
        component={LiveStatus}
        initialParams={{bus_number: id}}
      />
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.MAP_VIEW}
        component={MapView}
        options={{title: 'Map View'}}
        initialParams={{bus_number: id}}
      />
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.TIME_TABLE}
        component={TimeTable}
        initialParams={{bus_number: id}}
      />
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.SEATS}
        component={Seats}
        initialParams={{bus_number: id}}
      />
      <Tab.Screen
        name={
          routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.MEDICAL_EMERGENCY
        }
        component={MedicalEmergency}
        initialParams={{bus_number: id}}
      />
    </Tab.Navigator>
  );
}

export default BusResultRoutes;
