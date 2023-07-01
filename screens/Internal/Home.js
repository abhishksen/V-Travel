import {
  View,
  Pressable,
  Box,
  HStack,
  Heading,
  Icon,
  Center,
  Spinner,
  VStack,
  Button,
  Text,
} from 'native-base';
import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import RNMapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';

import useCoords from '../../hooks/useCoords';
import useInternalSearchData from '../../hooks/useInternalSearchData';
import useRideReq from '../../hooks/useRideReq';
import useAuth from '../../hooks/useAuth';
import routeNames from '../../constants/routeNames';
import configs from '../../configs';
import {add_request} from '../../utils/firestore.utils';

import Container from '../../components/Container';
import RenderWhen from '../../components/RenderWhen';

const Home = () => {
  const current_loc = useCoords();
  const {data, setreset} = useInternalSearchData();
  const {uid} = useAuth();

  const ride_req_obj = useRideReq();

  const [isRideReqLoading, setisRideReqLoading] = useState(false);
  const navigation = useNavigation();

  const deltaRef = useRef({latitudeDelta: 0.0092, longitudeDelta: 0.0091});
  const mapViewRef = useRef(null);

  const onRgionChange = region => {
    deltaRef.current = {
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
  };

  const make_ride_req = async () => {
    setisRideReqLoading(true);
    await add_request(
      {
        pick_up_loc: {
          title: data.source.title,
          latitude: data.source.coords.latitude,
          longitude: data.source.coords.longitude,
        },

        drop_off_loc: {
          title: data.dest.title,
          latitude: data.dest.coords.latitude,
          longitude: data.dest.coords.longitude,
        },

        status: 'pending',
        uid,
      },
      uid,
    );
    setisRideReqLoading(false);
    setreset();
  };

  useEffect(() => {
    if (mapViewRef.current && data.source) {
      const coordinates = [];

      coordinates[0] = {
        latitude: data.source.coords.latitude,
        longitude: data.source.coords.longitude,
      };

      if (data.dest) {
        coordinates[1] = {
          latitude: data.dest.coords.latitude,
          longitude: data.dest.coords.longitude,
        };
      }

      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 10, right: 80, bottom: 10, left: 80},
        animated: true,
      });
    }
  }, [data.source, data.dest, current_loc]);

  if (!current_loc.latitude) {
    return (
      <Center w="100%" h="100%">
        <Spinner />
        <Heading>Loading...</Heading>
      </Center>
    );
  }

  return (
    <View h="100%">
      <RenderWhen isTrue={current_loc.latitude}>
        <RNMapView
          ref={r => (mapViewRef.current = r)}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: current_loc.latitude,
            longitude: current_loc.longitude,
            latitudeDelta: deltaRef.current.latitudeDelta,
            longitudeDelta: deltaRef.current.longitudeDelta,
          }}
          onRegionChange={onRgionChange}
          moveOnMarkerPress={false}
          showsUserLocation
          loadingEnabled>
          {data.dest ? (
            <Marker
              coordinate={{
                latitude: data.dest.coords.latitude,
                longitude: data.dest.coords.longitude,
              }}
              title={'Drop Off Point'}
            />
          ) : null}

          {data.dest ? (
            <MapViewDirections
              origin={data.source.coords}
              destination={data.dest.coords}
              apikey={configs.GOOGLE_MAP_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          ) : null}
        </RNMapView>
      </RenderWhen>

      <Container padding={0} h="100%" w="100%">
        <RenderWhen isTrue={!ride_req_obj}>
          <VStack padding={4} space={3}>
            <InputButton
              Icon={<Icon as={FontAwesome} name={'circle-o'} />}
              placeholder={'Choose Your Pick up point'}
              value={data.source?.title}
              onPress={() =>
                navigation.navigate(
                  routeNames.INTERNAL.SUB_ROUTES.STATION_SEARCH,
                  {type: 'src'},
                )
              }
            />
            <InputButton
              Icon={<Icon as={MaterialIcons} name={'location-pin'} />}
              placeholder={'Choose Your drop off point'}
              value={data.dest?.title}
              onPress={() =>
                navigation.navigate(
                  routeNames.INTERNAL.SUB_ROUTES.STATION_SEARCH,
                  {type: 'dest'},
                )
              }
            />
          </VStack>
        </RenderWhen>

        <RenderWhen isTrue={ride_req_obj}>
          <VStack
            space={3}
            position={'absolute'}
            w="100%"
            bottom={0}
            padding={8}>
            <Box bgColor={'secondary.50'} padding={3}>
              <Center w="100%" my={3}>
                <Heading fontWeight={500}>Your ride is under request</Heading>
              </Center>
              <HStack>
                <Text>{ride_req_obj?.drop_off_loc?.title}</Text>
              </HStack>
            </Box>
          </VStack>
        </RenderWhen>

        <RenderWhen isTrue={Boolean(data.dest && data.source)}>
          <VStack
            space={3}
            position={'absolute'}
            w="100%"
            padding={2}
            bottom={0}>
            <Button
              isLoading={isRideReqLoading}
              colorScheme={'secondary'}
              onPress={make_ride_req}>
              Book Ride
            </Button>
            <Button colorScheme={'muted'} onPress={setreset}>
              Cancel
            </Button>
          </VStack>
        </RenderWhen>
      </Container>
    </View>
  );
};

export default Home;

function InputButton({onPress, Icon, value, placeholder}) {
  return (
    <Pressable onPress={onPress}>
      <Box w="100%" bgColor={'primary.50'} padding={3} borderRadius={'md'}>
        <HStack alignItems={'center'} space={2}>
          {Icon}
          <Heading
            size={'sm'}
            fontWeight={500}
            textTransform={'capitalize'}
            color={value ? 'black' : 'muted.400'}>
            {value ? value : placeholder}
          </Heading>
        </HStack>
      </Box>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
