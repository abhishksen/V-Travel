import {
  Text,
  Button,
  Box,
  Stack,
  Divider,
  HStack,
  StatusBar,
  Heading,
  Badge,
  ScrollView,
  Icon,
  Pressable,
} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/Container';
import colors from '../constants/colors';
import routeNames from '../constants/routeNames';

import useSearchData from '../hooks/useSearchData';

const arr = [...new Array(6)].map((e, i) => i);

const Search = ({navigation}) => {
  const {data} = useSearchData();

  const handleSearch = () => {
    // auth().signOut()

    if (!data.source || !data.dest) {
      alert('We need both source and destination to show you the results!');
      return;
    }

    navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_LIST);
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor={colors.primary[500]} />
      <Container bgColor="primary.500" paddingBottom={8}>
        <Box bgColor="primary.100" padding={5} borderRadius={'xl'}>
          <Stack space={4}>
            <InputButton
              Icon={<Icon as={FontAwesome} name={'bus'} />}
              placeholder={'Bus Number'}
              onPress={() =>
                navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_NUM_SEARCH)
              }
            />
            <HStack space={2} alignItems={'center'}>
              <Divider flex={1} bgColor={'primary.500'} />
              <Text>OR</Text>
              <Divider flex={1} bgColor={'primary.500'} />
            </HStack>
            <InputButton
              Icon={<Icon as={FontAwesome} name={'circle-o'} />}
              placeholder={'From Bus Station'}
              value={data.source}
              onPress={() =>
                navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_ST_SEARCH, {
                  type: 'source',
                })
              }
            />
            <InputButton
              Icon={<Icon as={MaterialIcons} name={'location-pin'} />}
              placeholder={'To Bus Station'}
              onPress={() =>
                navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_ST_SEARCH, {
                  type: 'dest',
                })
              }
              value={data.dest}
            />
            <Button
              onPress={handleSearch}
              startIcon={<Icon as={FontAwesome} name="search" />}>
              Search
            </Button>
          </Stack>
        </Box>
      </Container>
      <Container>
        <Heading my={4} fontWeight={500}>
          Recent Searches
        </Heading>
        <Stack space={6}>
          {arr.map(e => (
            <BusCard key={e} />
          ))}
        </Stack>
      </Container>
    </ScrollView>
  );
};

export default Search;

function BusCard() {
  return (
    <Box
      borderRadius={'lg'}
      backgroundColor={'primary.50'}
      borderColor={'primary.500'}
      borderWidth={1}
      padding={5}>
      <Stack space={5}>
        <HStack space={5} alignItems={'center'}>
          <HStack space={1} alignItems={'center'}>
            <Icon as={FontAwesome} name={'bus'} size={'md'} />
            <Heading size={'md'} bold>
              300
            </Heading>
          </HStack>
          <Text fontSize={18}>Silicon Valley</Text>
        </HStack>
        <Badge borderRadius={'lg'} width={'20'} colorScheme="success">
          <Text>Runnig</Text>
        </Badge>
      </Stack>
    </Box>
  );
}

function InputButton({onPress, Icon, value, placeholder}) {
  return (
    <Pressable onPress={onPress}>
      <Box w="100%" bgColor={'primary.50'} padding={3} borderRadius={'md'}>
        <HStack space={2}>
          {Icon}
          <Heading
            size={'sm'}
            fontWeight={500}
            color={value ? 'black' : 'muted.400'}>
            {value ? value : placeholder}
          </Heading>
        </HStack>
      </Box>
    </Pressable>
  );
}
