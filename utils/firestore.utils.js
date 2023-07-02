import firestore from '@react-native-firebase/firestore';

import org_members_schema from '../schemas/org_members.schema';
import ride_req_stack_schema from '../schemas/ride_req_stack.schema';

export async function doUserExists(email = '') {
  const docref = await firestore()
    .collection(org_members_schema.name)
    .where(org_members_schema.fields.email, '==', email)
    .get();

  if (docref.empty) {
    return false;
  } else {
    return true;
  }
}

export async function add_request(data = {}, uid = '') {
  const docref = await firestore()
    .collection(ride_req_stack_schema.name)
    .doc(uid)
    .get();

  if (!docref.exists) {
    await firestore().collection(ride_req_stack_schema.name).doc(uid).set(data);
    return true;
  }

  await firestore()
    .collection(ride_req_stack_schema.name)
    .doc(uid)
    .update(data);
  return true;
}

export async function del_request(uid = '') {
  await firestore().collection(ride_req_stack_schema.name).doc(uid).delete();
  return true;
}
