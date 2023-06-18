const routeNames = {
  HOME: {
    NAME: 'HOME',
    SUB_ROUTES: {
      SEARCH: 'Search',
      BUS_NUM_SEARCH: 'Bus Number Search',
      BUS_ST_SEARCH: 'Bus Station Search',
      BUS_LIST: 'Bus List',
      BUS_RESULT: {
        NAME: 'Bus Result',
        SUB_ROUTES: {
          LIVE_BUS_STATUS: 'Live Bus Status',
          MAP_VIEW: 'MAP_VIEW',
          TIME_TABLE: 'Time Table',
          SEATS: 'Seats',
          MEDICAL_EMERGENCY: 'Medical Emergency',
        },
      },
    },
  },
  LOGIN: {
    NAME: 'Login',
  },
};

export default routeNames;
