import {
  View,
  Text,
  Heading,
  Pressable,
  Badge,
  Box,
  Icon,
  VStack,
  Center,
  Spinner,
} from 'native-base';
import {Linking} from 'react-native';
import React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/Container';

import colors from '../constants/colors';
import useFetchStopMeds from '../hooks/useFetchStopMeds';

const MedicalEmergency = ({route}) => {
  const bus_number = route.params.bus_number;
  const {isLoading, stops} = useFetchStopMeds(bus_number);
  return (
    <Container h="100%">
      <Center w="100%">{isLoading ? <Spinner /> : null}</Center>
      <Timeline
        data={stops}
        titleStyle={{
          color: 'black',
        }}
        descriptionStyle={{color: '#000'}}
        eventContainerStyle={{
          minHeight: 100,
          marginTop: -13,
        }}
        circleColor={colors.primary[500]}
        lineColor={colors.primary[500]}
        showTime={false}
        renderDetail={renderDetail}
      />
    </Container>
  );
};

export default MedicalEmergency;

function renderDetail(rowData) {
  return (
    <View>
      <Heading textTransform={'capitalize'} size={'md'} fontWeight={400}>
        {rowData.stop.title}
      </Heading>
      <VStack my={5} space={3}>
        {rowData.stop.hospitals.map((e, i) => (
          <Box
            key={i}
            borderRadius={'lg'}
            padding={3}
            bgColor={'primary.50'}
            shadow={7}>
            <Text marginBottom={-1} fontSize={18}>
              {e.title}
            </Text>
            <Text fontSize={16}>{e.address}</Text>
            <Pressable onPress={() => Linking.openURL(`tel:${e.phone}`)}>
              <Badge
                borderRadius={'md'}
                bgColor={'primary.500'}
                leftIcon={
                  <Icon as={MaterialIcons} name="call" color={'white'} />
                }
                _text={{color: 'white'}}
                w="50%">
                {`91 ${e.phone}`}
              </Badge>
            </Pressable>
          </Box>
        ))}
      </VStack>
    </View>
  );
}

const data = [
  {
    title: 'Red City',
    hospitals: [
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'Abc street, Red City',
      },
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'xyz street, Red City',
      },
    ],
  },
  {
    title: 'Blue City',
    hospitals: [
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'xyz street, Blue City',
      },
    ],
  },
  {
    title: 'Green City',
    hospitals: [
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'Abc street, Green City',
      },
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'xyz street, Green City',
      },
    ],
  },
  {
    title: 'Yellow City',
    hospitals: [
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'Abc street, Yellow City',
      },
    ],
  },
  {
    title: 'Pink City',
    hospitals: [
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'Abc street, Pink City',
      },
      {
        title: 'Acharya Hospital',
        phone: 9856237845,
        address: 'xyz street, Pink City',
      },
    ],
  },
];
