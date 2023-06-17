import {View, Heading, VStack, Badge, Center, Spinner} from 'native-base';
import React from 'react';
import Timeline from 'react-native-timeline-flatlist';

import Container from '../components/Container';
import colors from '../constants/colors';
import useFetchStops from '../hooks/useFetchStops';

const TimeTable = ({route}) => {
  const bus_number = route.params.bus_number;
  const {isLoading, stops} = useFetchStops(bus_number);

  return (
    <Container h="100%">
      <Center w="100%">{isLoading ? <Spinner /> : null}</Center>
      <Timeline
        data={stops}
        eventContainerStyle={{
          minHeight: 100,
          marginTop: -13,
        }}
        circleColor={colors.primary[500]}
        lineColor={colors.primary[500]}
        renderDetail={renderDetail}
        showTime={false}
      />
    </Container>
  );
};

export default TimeTable;

function renderDetail(rowData) {
  return (
    <View>
      <Heading
        textTransform={'capitalize'}
        size={'md'}
        color={'black'}
        fontWeight={400}>
        {rowData.stop.title}
      </Heading>
      <VStack my={3} space={1}>
        {rowData.timings.map((t, i) => (
          <Badge
            borderRadius={'full'}
            bgColor={'#ff9797'}
            padding={1}
            w="40%"
            _text={{
              fontSize: 14,
            }}
            key={i}>
            {t}
          </Badge>
        ))}
      </VStack>
    </View>
  );
}
