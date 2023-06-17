import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import useAuth from '../../hooks/useAuth';
import schedules_schema from '../../schemas/schedules.schema';

import {setLoading, setStops, reset} from '../../redux/reducers/stops.reducer';

const useFetchStops = () => {
  const dispatch = useDispatch();

  const {bus_number} = useAuth();
  const {timings, stops, isLoading} = useSelector(state => state.stops);

  useEffect(() => {
    dispatch(setLoading(true));
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
              },
            });
          }
          dispatch(setStops(stop_with_timings));
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
      });

    return () => dispatch(reset());
  }, []);

  return {
    stops_timings: timings,
    stops,
    isLoading,
  };
};

export default useFetchStops;
