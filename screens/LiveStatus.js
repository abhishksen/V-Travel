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
import RenderWhen from '../components/RenderWhen';

import useLiveStatus from '../hooks/useLiveStatus';

const LiveStatus = ({route}) => {
  const bus_number = route.params.bus_number;

  const {isLoading, data, is_running} = useLiveStatus(bus_number);

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
                      <Text>
                        <Text bold>{stage.distance_km} km away </Text>
                      </Text>
                      <Text bold>Est. Time: {stage.time_min} min </Text>
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
                <HStack my={3}>
                  <Heading
                    textTransform={'capitalize'}
                    w={'100%'}
                    textAlign={'center'}
                    size={'sm'}
                    fontWeight={500}>
                    {stage.title}
                  </Heading>
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
