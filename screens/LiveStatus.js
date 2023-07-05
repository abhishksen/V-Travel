import React, {useState} from 'react';
import {
  Text,
  HStack,
  Heading,
  VStack,
  Divider,
  Center,
  Box,
  IconButton,
  Spinner,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

import Container from '../components/Container';
import RenderWhen from '../components/RenderWhen';

import useLiveStatus from '../hooks/useLiveStatus';
import {requestNotifPermission} from '../utils/notif.utils';
import {formatDistance} from '../utils/location.utils';
import {add_stop_alert} from '../utils/firestore.utils';

const LiveStatus = ({route}) => {
  const bus_number = route.params.bus_number;

  const {isLoading, data, is_running} = useLiveStatus(bus_number);
  const [isNotifLoading, setisNotifLoading] = useState({
    id: -1,
    isLoading: false,
  });

  const req_notif = async (title, i, coords) => {
    try {
      setisNotifLoading({id: i, isLoading: true});
      const channelId = await notifee.createChannel({
        id: bus_number + '-stop-' + title,
        name: bus_number + '-stop-' + title,
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      const is_granted = await requestNotifPermission();

      if (!is_granted) {
        alert('We need notification permission to notify you!');
        setisNotifLoading({id: -1, isLoading: false});
        return;
      }

      const token = await messaging().getToken();

      await add_stop_alert({
        bus_number,
        stop_title: title,
        latitude: coords.latitude,
        longitude: coords.longitude,
        is_sent: false,
        token,
        channel_id: channelId,
      });

      await notifee.displayNotification({
        title: 'Relax!!, we will notify you',
        body: 'We will notify you when bus is about to reach!',
        android: {
          channelId,
        },
      });
      // notifee.deleteChannel(bus_number + '-stop-' + title);
      setisNotifLoading({id: -1, isLoading: false});
    } catch (error) {
      setisNotifLoading({id: -1, isLoading: false});
    }
  };

  return (
    <Container>
      <RenderWhen isTrue={isLoading}>
        <Center w="100%">
          <Spinner />
        </Center>
      </RenderWhen>

      {is_running ? (
        <VStack space={7}>
          {data.map((stage, i, arr) => {
            if (stage.status === 'reaching') {
              return (
                <Center key={i} w="100%">
                  <Divider
                    thickness={3}
                    bgColor={'primary.500'}
                    orientation="vertical"
                    h={5}
                  />

                  <HStack
                    alignItems={'center'}
                    padding={3}
                    space={3}
                    borderRadius={'md'}
                    bgColor={'#fff'}>
                    <IconButton
                      borderRadius={'full'}
                      size={'sm'}
                      variant="solid"
                      _icon={{
                        as: FontAwesome,
                        name: 'bus',
                      }}
                    />

                    <Box>
                      <Text>Reaching Next Stop</Text>
                      {stage.distance_km ? (
                        <Text>
                          <Text bold>
                            {formatDistance(stage.distance_km)} away
                          </Text>
                        </Text>
                      ) : null}
                      {stage.time_min ? (
                        <Text bold>
                          reaching in{' '}
                          {moment
                            .duration(stage.time_min, 'minutes')
                            .humanize()}
                        </Text>
                      ) : null}
                    </Box>
                  </HStack>

                  <Divider
                    thickness={3}
                    bgColor={'primary.500'}
                    orientation="vertical"
                    h={5}
                  />

                  <IconButton
                    borderRadius={'full'}
                    size={'sm'}
                    variant="solid"
                    _icon={{
                      as: FontAwesome,
                      name: 'arrow-down',
                    }}
                  />
                </Center>
              );
            }

            return (
              <Box bgColor={'#fff'} padding={1} key={i}>
                <HStack alignItems={'center'} justifyContent={'center'} my={3}>
                  <Heading
                    textTransform={'capitalize'}
                    textAlign={'center'}
                    size={'sm'}
                    fontWeight={500}>
                    {stage.title}
                  </Heading>

                  {isNotifLoading.id !== i ? (
                    <IconButton
                      position={'absolute'}
                      right={0}
                      size={'md'}
                      variant="solid"
                      onPress={() =>
                        req_notif(stage.title, i, stage.stop.coords)
                      }
                      _icon={{
                        as: MaterialIcons,
                        name: 'notifications-active',
                      }}
                    />
                  ) : null}

                  <RenderWhen
                    isTrue={
                      isNotifLoading.isLoading && isNotifLoading.id === i
                    }>
                    <Box position={'absolute'} right={0}>
                      <Spinner />
                    </Box>
                  </RenderWhen>
                </HStack>
                <RenderWhen isTrue={stage.is_halted}>
                  <HStack
                    bgColor={'primary.500'}
                    justifyContent={'center'}
                    space={2}
                    alignItems={'center'}
                    w="100%">
                    <IconButton
                      borderRadius={'full'}
                      size={'sm'}
                      padding={1}
                      variant="solid"
                      _icon={{
                        as: FontAwesome,
                        name: 'bus',
                      }}
                    />
                    <Heading color={'white'} size={'sm'} fontWeight={400}>
                      Bus is waiting here
                    </Heading>
                  </HStack>
                </RenderWhen>
              </Box>
            );
          })}
        </VStack>
      ) : (
        <Center w="100%" h="80%">
          <Box bgColor={'#fff'} padding={5}>
            <HStack space={3}>
              <IconButton
                borderRadius={'full'}
                size={'sm'}
                bgColor={'red.400'}
                variant="solid"
                _icon={{
                  as: FontAwesome,
                  name: 'bus',
                }}
              />
              <Heading>Bus is not running</Heading>
            </HStack>
          </Box>
        </Center>
      )}
    </Container>
  );
};

export default LiveStatus;
