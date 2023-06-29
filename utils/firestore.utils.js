import firestore from '@react-native-firebase/firestore';

import org_members_schema from '../schemas/org_members.schema';

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
