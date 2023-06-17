import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import LiveStatus from '../screens/LiveStatus';
import TimeTable from '../screens/TimeTable';
import Seats from '../screens/Seats';
import MedicalEmergency from '../screens/MedicalEmergency';

import routeNames from '../constants/routeNames';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

function BusResultRoutes({route}) {
  console.log(route.params);
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
        name={
          routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.LIVE_TRAIN_STATUS
        }
        component={LiveStatus}
      />
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.TIME_TABLE}
        component={TimeTable}
      />
      <Tab.Screen
        name={routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.SEATS}
        component={Seats}
      />
      <Tab.Screen
        name={
          routeNames.HOME.SUB_ROUTES.BUS_RESULT.SUB_ROUTES.MEDICAL_EMERGENCY
        }
        component={MedicalEmergency}
      />
    </Tab.Navigator>
  );
}

export default BusResultRoutes;
