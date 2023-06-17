const bus_status = {
  name: 'bus_status',
  fields: {
    current_location: {
      name: 'current_location',
      latitude: 'latitude',
      longitude: 'longitude',
    },
    is_running: 'is_running',
    reached_stop_serial_number: 'reached_stop_serial_number',
    reached_stop_index: 'reached_stop_index',
    is_reverse: 'is_reverse',
  },
};

export default bus_status;
