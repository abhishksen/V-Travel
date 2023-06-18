import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import schedules_schema from '../schemas/schedules.schema';
import {setbuses, setLoading} from '../redux/reducers/buses_with_stops.reducer';

import useBusesWithStops from './useBusesWithStops';

/**
 * @returns {{isLoading: Boolean, data: Array}}
 */
const useSearchBuses = () => {
  const dispatch = useDispatch();

  const buses_with_stops_data = useBusesWithStops();

  useEffect(() => {
    dispatch(setLoading(true));
    firestore()
      .collection(schedules_schema.name)
      .get()
      .then(async docs => {
        const bus_data = [];
        if (!docs.empty) {
          for (let index = 0; index < docs.size; index++) {
            const doc = docs.docs[index].data();

            const stop_details_ref = await doc.stop.get();
            const stop_data = stop_details_ref.data();

            bus_data.push({
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
          dispatch(setbuses(structureStopsToBusNumber(bus_data)));
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return buses_with_stops_data;
};

export default useSearchBuses;

const structureStopsToBusNumber = (inputArray = []) =>
  inputArray.reduce((result, current) => {
    const existingItem = result.find(
      item => item.bus_number === current.bus_number,
    );

    if (existingItem) {
      existingItem.stops.push(current.stop);
    } else {
      result.push({
        bus_number: current.bus_number,
        stops: [current.stop],
      });
    }

    return result;
  }, []);
