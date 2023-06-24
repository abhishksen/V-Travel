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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Container from '../components/Container';
import colors from '../constants/colors';
import routeNames from '../constants/routeNames';

import useSearchData from '../hooks/useSearchData';
import useOnlyStopsFetch from '../hooks/useOnlyStopsFetch';
import useSearchBuses from '../hooks/useSearchBuses';

const Search = ({navigation}) => {
  const {data, setSearchResults} = useSearchData();
  const {data: buses_with_stops_data} = useSearchBuses();
  const [isSearchLoading, setisSearchLoading] = useState(false);

  const handleSearch = () => {
    if (!data.source || !data.dest) {
      alert('We need both source and destination to show you the results!');
      return;
    }

    setisSearchLoading(true);

    const result = buses_with_stops_data.filter(bus => {
      const source_idx = bus.stops.findIndex(
        v => v.title.toLowerCase() === data.source.toLowerCase(),
      );
      const dest_idx = bus.stops.findIndex(
        v => v.title.toLowerCase() === data.dest.toLowerCase(),
      );

      if (source_idx > -1 && dest_idx > -1) {
        return true;
      }

      return false;
    });

    setSearchResults(result);

    setisSearchLoading(false);

    navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_LIST);
  };

  useOnlyStopsFetch();

  return (
    <ScrollView backgroundColor={'primary.500'}>
      <StatusBar backgroundColor={colors.primary[500]} />
      {/* Search Form */}
      <Container bgColor="primary.500" py={8}>
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
              isLoading={isSearchLoading}
              colorScheme={'secondary'}
              onPress={handleSearch}
              startIcon={<Icon as={FontAwesome} name="search" />}>
              Search Buses
            </Button>
          </Stack>
        </Box>
      </Container>
      {/* Recent Searches */}
      <Container bgColor="white" borderTopRadius={'3xl'}>
        <Heading my={4} fontWeight={500}>
          Recent Searches
        </Heading>
        <Stack space={6}>
          {bus_data.map((e, i) => (
            <BusCard key={i} num={e.id} title={e.title} status={e.status} />
          ))}
        </Stack>
      </Container>
    </ScrollView>
  );
};

export default Search;

function BusCard({num, title, status}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_RESULT.NAME, {
          id: num,
          title,
        })
      }>
      <Box
        borderRadius={'lg'}
        backgroundColor={'secondary.50'}
        borderColor={'secondary.500'}
        borderWidth={1}
        padding={2}>
        <Stack space={1}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <HStack space={1} alignItems={'center'}>
              <Icon as={FontAwesome} name={'bus'} size={'md'} />
              <Heading size={'md'} bold>
                {num}
              </Heading>
            </HStack>
            <Badge
              borderRadius={'lg'}
              colorScheme={status === 'running' ? 'success' : 'danger'}>
              <Text>{status === 'running' ? 'Running' : 'Not Running'}</Text>
            </Badge>
          </HStack>
          <Text fontSize={18}>{title}</Text>
        </Stack>
      </Box>
    </Pressable>
  );
}

function InputButton({onPress, Icon, value, placeholder}) {
  return (
    <Pressable onPress={onPress}>
      <Box w="100%" bgColor={'primary.50'} padding={3} borderRadius={'md'}>
        <HStack alignItems={'center'} space={2}>
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

const bus_data = [
  {id: 400, title: 'Bokaro Steel City', status: 'running'},
  {id: 302, title: 'Ranchi', status: 'stop'},
  {id: 512, title: 'Dhanbaad', status: 'running'},
  {id: 311, title: 'Darbhanga', status: 'running'},
  {id: 215, title: 'Green City', status: 'running'},
  {id: 256, title: 'Yellow City', status: 'stop'},
  {id: 316, title: 'Pink City', status: 'running'},
  {id: 515, title: 'Blue City', status: 'running'},
  {id: 412, title: 'Red City', status: 'stop'},
];
