import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import ride_req_stack_schema from '../schemas/ride_req_stack.schema';
import useAuth from '../hooks/useAuth';

/**
 * @returns {{pick_up_loc: { title:String, latitude: Number, longitude:Number }, drop_off_loc :{ title:String, latitude: Number, longitude:Number }, status: String, uid: String,}}
 */
const useRideReq = () => {
  const {uid} = useAuth();
  const [ride_req_obj, setride_req_obj] = useState(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection(ride_req_stack_schema.name)
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setride_req_obj(documentSnapshot.data());
      });

    return () => subscriber();
  }, []);

  return ride_req_obj;
};

export default useRideReq;
