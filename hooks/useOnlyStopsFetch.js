import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import stops_schema from '../schemas/stops.schema';
import useOnlyStops from './useOnlyStops';

import {setStops, setIsLoading} from '../redux/reducers/stops.reducer';

const useOnlyStopsFetch = () => {
  const dispatch = useDispatch();
  const data = useOnlyStops();

  const setLoading = (bool = false) => {
    dispatch(setIsLoading(bool));
  };

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection(stops_schema.name)
      .get()
      .then(async docs => {
        const stops = [];
        if (!docs.empty) {
          for (let index = 0; index < docs.size; index++) {
            const doc = docs.docs[index].data();

            stops.push({
              coords: {
                latitude: doc.coords.latitude,
                longitude: doc.coords.longitude,
              },

              hospitals: doc.hospitals,

              title: doc.title,
            });
          }
          dispatch(setStops(stops));
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  return data;
};

export default useOnlyStopsFetch;
