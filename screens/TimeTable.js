import {View, Text, Center, HStack, Heading, VStack, Badge} from 'native-base';
import React from 'react';
import Timeline from 'react-native-timeline-flatlist';

import Container from '../components/Container';
import colors from '../constants/colors';

const TimeTable = () => {
  return (
    <Container h="100%">
      <Timeline
        data={data}
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
      <Heading size={'md'} color={'black'} fontWeight={400}>
        {rowData.title}
      </Heading>
      <VStack my={3} space={1}>
        {rowData.times.map((t, i) => (
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

const data = [
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
  {title: 'Red City', times: ['09:00', '13:00', '18:00', '22:00']},
];
