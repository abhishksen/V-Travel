const running_rides = {
  name: 'running_rides',
  fields: {
    start_time: 'start_time',
    start_point_loc: {
      name: 'start_point_loc',
      latitude: 'latitude',
      longitude: 'longitude',
    },
    pick_up_loc: {
      name: 'pick_up_loc',
      latitude: 'latitude',
      longitude: 'longitude',
    },
    drop_off_loc: {
      name: 'drop_off_loc',
      latitude: 'latitude',
      longitude: 'longitude',
    },
    status: 'status',
    distance: 'distance',
    distance_covered: 'distance_covered',
    is_ride_started: 'is_ride_started',
    uid: 'uid',
  },
};

export default running_rides;
