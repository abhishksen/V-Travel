import {
  FlatList,
  Input,
  Box,
  Icon,
  HStack,
  Text,
  Divider,
  Pressable,
  Spinner,
  Center,
  Heading,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import useInternalSearchData from '../../hooks/useInternalSearchData';

import Container from '../../components/Container';

import configs from '../../configs';

navigator.geolocation = require('react-native-geolocation-service');

const StationSearch = ({navigation, route}) => {
  const type = route?.params?.type || 'dest';

  const {setDest, setSource} = useInternalSearchData();

  const handlePress = (data, details = null) => {
    const obj = {
      title: data.description || data.name,
      coords: {
        latitude: details?.geometry?.location.lat,
        longitude: details?.geometry?.location.lng,
      },
    };

    if (type === 'src') {
      setSource(obj);
    } else {
      setDest(obj);
    }
    navigation.goBack();
  };

  return (
    <Container w="100%" h="100%">
      <Heading mb={4}>
        Search {type === 'src' ? ' pick up point' : ' drop off point'}
      </Heading>
      <GooglePlacesAutocomplete
        onPress={handlePress}
        textInputProps={{autoFocus: true}}
        query={{
          key: configs.GOOGLE_MAP_API_KEY,
          language: 'en',
        }}
        styles={{
          textInput: {
            color: 'black',
          },

          description: {
            color: 'black',
          },
        }}
        currentLocation={true}
        fetchDetails
        currentLocationLabel="Current location"
      />
    </Container>
  );
};

export default StationSearch;
