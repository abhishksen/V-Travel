import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import buses_schema from '../schemas/buses.schema';
import useBuses from './useBuses';
import {setbuses, setLoading} from '../redux/reducers/buses.reducer';

/**
 * @returns {{isLoading: Boolean, data: Array}}
 */
const useFetchStops = () => {
  const dispatch = useDispatch();

  const buses = useBuses();

  useEffect(() => {
    dispatch(setLoading(true));
    firestore()
      .collection(buses_schema.name)
      .get()
      .then(async docs => {
        const bus_data = [];
        if (!docs.empty) {
          for (let index = 0; index < docs.size; index++) {
            const doc = docs.docs[index].data();

            bus_data.push(doc);
          }
          dispatch(setbuses(bus_data));
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return buses;
};

export default useFetchStops;
