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
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';

const LiveStatus = () => {
  const [shippingData, setShippingData] = useState([
    {id: 1, title: 'Red City', status: 'completed'},
    {id: 2, title: 'Green City', status: 'active', type: 'reaching'},
    {id: 3, title: 'Yellow City', status: 'inactive'},
    {id: 4, title: 'blue city', status: 'active'},
    {
      id: 5,
      title: 'Pink City',
      status: 'inactive',
    },
  ]);

  return (
    <Container>
      <VStack space={3}>
        {shippingData.map((stage, i, arr) => {
          if (stage.type === 'reaching') {
            return (
              <Center key={i} w="100%">
                <Divider
                  thickness={3}
                  bgColor={'primary.500'}
                  orientation="vertical"
                  mx="3"
                  h={20}
                />
                <HStack
                  position={'absolute'}
                  zIndex={6}
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
                    <Text>
                      Est. Time: <Text bold>3min</Text>
                    </Text>
                  </Box>
                </HStack>
                <IconButton
                  mt={10}
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
            <HStack bgColor={'#fff'} padding={2} key={i}>
              <Text flex={0.2}>19:00</Text>
              <Heading size={'sm'} flex={0.7}>
                {stage.title}
              </Heading>

              <Text color={'green.500'} flex={0.1}>
                19:00
              </Text>
            </HStack>
          );
        })}
      </VStack>
    </Container>
  );
};

export default LiveStatus;
