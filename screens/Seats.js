import {View, Text, Icon, VStack, HStack, Center} from 'native-base';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '../components/Container';

const Seats = () => {
  return (
    <Container>
      <Center h="90%" w="100%">
        <VStack
          borderRadius={'lg'}
          borderWidth={1}
          borderColor={'primary.500'}
          bgColor={'#fff'}
          shadow={6}
          w="60%"
          padding={3}
          space={3}>
          {data.map((e, i) => (
            <HStack
              key={i}
              justifyContent={'space-between'}
              alignItems={'center'}>
              {e.map((ic, k) => (
                <HStack key={k}>
                  {ic.map((j, key) => (
                    <SeatIcon key={key} type={j} />
                  ))}
                </HStack>
              ))}
            </HStack>
          ))}
        </VStack>
      </Center>
    </Container>
  );
};

export default Seats;

const SeatIcon = ({type}) => {
  switch (type) {
    case 'female':
      return <Icon size="3xl" as={FontAwesome5} name="female" />;
    case 'disable':
      return <Icon size="3xl" as={Fontisto} name="paralysis-disability" />;
    case 'door':
      return <Icon size="3xl" as={MaterialCommunityIcons} name="door" />;
    case 'driver':
      return <Icon size="3xl" as={MaterialCommunityIcons} name="steering" />;
    case 'seat':
      return <Icon size="3xl" as={MaterialIcons} name="event-seat" />;

    default:
      return null;
  }
};

const data = [
  [['door'], ['', 'driver']],
  [
    ['seat', 'seat'],
    ['seat', 'seat'],
  ],
  [
    ['seat', 'seat'],
    ['seat', 'seat'],
  ],
  [
    ['seat', 'seat'],
    ['seat', 'seat'],
  ],
  [
    ['female', 'female'],
    ['female', 'female'],
  ],
  [
    ['female', 'female'],
    ['female', 'female'],
  ],
  [
    ['disable', 'disable'],
    ['disable', 'disable'],
  ],
  [['door'], ['seat', 'seat']],
  [
    ['seat', 'seat'],
    ['seat', 'seat'],
  ],
];
