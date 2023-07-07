import {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import useAuth from './useAuth';

import running_rides_schema from '../schemas/running_rides.schema';

const useRunningRide = () => {
  const {uid} = useAuth();

  const [running_ride, setrunning_ride] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection(running_rides_schema.name)
      .where(running_rides_schema.fields.uid, '==', uid)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.empty) {
          const doc = documentSnapshot.docs[0].data();
          setrunning_ride(doc);
        } else {
          setrunning_ride(null);
        }
      });
    return () => subscriber();
  }, [uid]);

  return running_ride;
};

export default useRunningRide;
