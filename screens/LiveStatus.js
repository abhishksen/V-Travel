import React from 'react';
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

import Container from '../components/Container';

import useLiveStatus from '../hooks/useLiveStatus';

const LiveStatus = ({route}) => {
  const bus_number = route.params.bus_number;

  const {isLoading, data, is_running} = useLiveStatus(bus_number);

  return (
    <Container>
      {isLoading ? (
        <Center w="100%">
          <Spinner />
        </Center>
      ) : null}
      {is_running ? (
        <VStack space={3}>
          {data.map((stage, i, arr) => {
            if (stage.status === 'reaching' || stage.status === 'final') {
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
                      <Text>
                        {stage.status === 'final'
                          ? 'Bus has reached the destination'
                          : 'Reaching Next Stop'}
                      </Text>
                      {stage.status === 'final' ? null : (
                        <Text>
                          <Text bold>{stage.distance} meters away </Text>
                        </Text>
                      )}
                    </Box>
                  </HStack>

                  <Divider
                    thickness={3}
                    bgColor={'primary.500'}
                    orientation="vertical"
                    h={5}
                  />

                  {stage.status === 'final' ? null : (
                    <IconButton
                      borderRadius={'full'}
                      size={'sm'}
                      variant="solid"
                      _icon={{
                        as: FontAwesome,
                        name: 'arrow-down',
                      }}
                    />
                  )}
                </Center>
              );
            }

            return (
              <HStack bgColor={'#fff'} padding={2} key={i}>
                <Heading
                  textTransform={'capitalize'}
                  w={'100%'}
                  textAlign={'center'}
                  size={'sm'}>
                  {stage.title}
                </Heading>
              </HStack>
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
