import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../screens/Search';
import routeNames from '../constants/routeNames';
import colors from '../constants/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Track Bus',
          headerStyle: {
            backgroundColor: colors.primary[500],
          },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'RedHatDisplay-SemiBold',
          },
        }}
        name={routeNames.HOME.SUB_ROUTES.SEARCH}
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default App;
