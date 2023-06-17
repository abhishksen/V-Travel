import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import schedules_schema from '../schemas/schedules.schema';

/**
 * @returns {{isLoading: Boolean, stops: Array}}
 */
const useFetchStopMeds = (bus_number = 0) => {
  const [isLoading, setLoading] = useState(false);
  const [stops, setstops] = useState([]);

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection(schedules_schema.name)
      .where(schedules_schema.fields.bus_number, '==', bus_number)
      .orderBy(schedules_schema.fields.serial_number, 'asc')
      .get()
      .then(async docs => {
        const stop_with_timings = [];
        if (!docs.empty) {
          for (let index = 0; index < docs.size; index++) {
            const doc = docs.docs[index].data();

            const stop_details_ref = await doc.stop.get();
            const stop_data = stop_details_ref.data();

            stop_with_timings.push({
              ...doc,
              stop: {
                title: stop_data.title,
                coords: {
                  latitude: stop_data.coords.latitude,
                  longitude: stop_data.coords.longitude,
                },
                hospitals: [...stop_data.hospitals],
              },
            });
          }
          setstops(stop_with_timings);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return {
    stops,
    isLoading,
  };
};

export default useFetchStopMeds;
