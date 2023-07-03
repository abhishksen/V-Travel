import {PermissionsAndroid} from 'react-native';
import notifee from '@notifee/react-native';

export const requestNotifPermission = () =>
  new Promise((resolve, reject) => {
    const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

    if (!permission) {
      resolve(true);
      return;
    }

    PermissionsAndroid.request(permission)
      .then(granted => {
        if (granted === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(e => {
        reject(e);
      });
  });

export const notifHandler = async remoteMesssage => {
  console.log(remoteMesssage);
  // await notifee.displayNotification({
  //   title: 'Relax!!, we will notify you',
  //   body: 'We will notify you when bus is about to reach!',
  //   android: {
  //     channelId,
  //   },
  // });
};
