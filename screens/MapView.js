import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import RNMapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Container from '../components/Container';

import useBusStatus from '../hooks/useBusStatus';
import useFetchStops from '../hooks/useFetchStops';

import configs from '../configs';

import bus_icon_img from '../assets/images/blue_circle.png';

const MapView = ({route}) => {
  const bus_number = route.params.bus_number;
  const {is_running, current_location} = useBusStatus(bus_number);
  const {isLoading, stops} = useFetchStops(bus_number);

  const deltaRef = useRef({latitudeDelta: 0.0092, longitudeDelta: 0.0091});
  const onRgionChange = region => {
    deltaRef.current = {
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
  };

  return (
    <Container h="100%">
      <RNMapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: current_location.latitude,
          longitude: current_location.longitude,
          latitudeDelta: deltaRef.current.latitudeDelta,
          longitudeDelta: deltaRef.current.longitudeDelta,
        }}
        onRegionChange={onRgionChange}
        showsUserLocation
        loadingEnabled>
        {is_running ? (
          <Marker
            coordinate={{
              latitude: current_location.latitude,
              longitude: current_location.longitude,
            }}
            image={bus_icon_img}
            title={'Bus is here'}
          />
        ) : null}

        {!isLoading
          ? stops.map((v, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: v.stop.coords.latitude,
                  longitude: v.stop.coords.longitude,
                }}
                title={'(Stop ' + (i + 1) + ') ' + v.stop.title}
              />
            ))
          : null}
        {!stops.length ? null : (
          <MapViewDirections
            origin={stops[0].coords}
            destination={stops[stops.length - 1].coords}
            apikey={configs.GOOGLE_MAP_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
      </RNMapView>
    </Container>
  );
};

export default MapView;

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
