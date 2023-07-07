import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import ride_status_schema from '../../../schemas/ride_status.schema';

const useRideLiveStatus = (plate_number = '') => {
  const [ride_live_status, setride_live_status] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (plate_number) {
        const subscriber = firestore()
          .collection(ride_status_schema.name)
          .doc(plate_number)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              setride_live_status({...documentSnapshot.data(), plate_number});
            } else {
              setride_live_status(null);
            }
          });

        return () => subscriber();
      }
    }, [plate_number]),
  );

  return ride_live_status;
};

export default useRideLiveStatus;
