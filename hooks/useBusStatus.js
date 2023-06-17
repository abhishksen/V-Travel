import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import bus_status_schema from '../schemas/bus_status.schema';

/**
 * @returns {{is_running: Boolean, current_location: Object, bus_number: Number,reached_stop_index:Number, is_reverse:Boolean}}
 */
const useBusStatus = (bus_number = 0) => {
  const [busStatus, setbusStatus] = useState({
    is_running: false,
    current_location: {latitude: 37.78825, longitude: -122.4324},
    bus_number,
    is_reverse: false,
    reached_stop_index: -1,
  });

  useEffect(() => {
    if (!bus_number) {
      return;
    }

    const subscriber = firestore()
      .collection(bus_status_schema.name)
      .doc(bus_number.toString())
      .onSnapshot(documentSnapshot => {
        setbusStatus({...documentSnapshot.data(), bus_number});
      });

    return () => subscriber();
  }, [bus_number]);

  return busStatus;
};

export default useBusStatus;
