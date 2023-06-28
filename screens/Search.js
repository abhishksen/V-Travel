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
  View,
  Icon,
  Pressable,
  IconButton,
  VStack,
  Center,
  Image,
  AlertDialog,
} from 'native-base';
import {Linking, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Container from '../components/Container';
import colors from '../constants/colors';
import routeNames from '../constants/routeNames';

import useSearchData from '../hooks/useSearchData';
import useOnlyStopsFetch from '../hooks/useOnlyStopsFetch';
import useSearchBuses from '../hooks/useSearchBuses';

import fullvlogo from '../assets/images/vlogo_full.jpg';
import blogs from '../data/blogs';

const screen_width = Dimensions.get('screen').width;
const slideWidth = wp(60);
const itemHorizontalMargin = wp(8);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const Search = ({navigation}) => {
  const {data, setSearchResults} = useSearchData();
  const {data: buses_with_stops_data} = useSearchBuses();
  const [isSearchLoading, setisSearchLoading] = useState(false);
  const [activeSlideIdx, setactiveSlideIdx] = useState(0);
  const [openSupport, setopenSupport] = useState(false);

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

  const renderItem = ({item, index}) => {
    return (
      <BlogCard
        key={index}
        title={item.title}
        date={item.date}
        readTime={item.read_time}
        imageUrl={item.image_url}
        id={item.id}
      />
    );
  };

  useOnlyStopsFetch();

  return (
    <View h="100%" backgroundColor={'primary.500'}>
      <StatusBar backgroundColor={colors.primary[500]} />

      {/* Logo */}
      <Box h="6%" px={6} bgColor={'primary.500'}>
        <Box w="100%" h={'100%'} borderRadius={'2xl'} bgColor={'#fff'}>
          <Image
            source={fullvlogo}
            w="100%"
            h={'100%'}
            // size={'full'}
            resizeMethod="scale"
            resizeMode="center"
            borderRadius={'3xl'}
            alt="logo"
          />
        </Box>
      </Box>

      {/* Search Form */}
      <Container h={'50%'} px={6} bgColor="primary.500" py={8}>
        <Center h="100%" w="100%">
          <Box
            w="100%"
            h="100%"
            bgColor="primary.100"
            padding={5}
            borderRadius={'xl'}>
            <Center h="100%">
              <Box w="100%" mb={3}>
                <Heading fontWeight={400}>Search Bus</Heading>
              </Box>
              <Stack w="100%" space={4}>
                <InputButton
                  Icon={<Icon as={FontAwesome} name={'bus'} />}
                  placeholder={'Bus Number'}
                  onPress={() =>
                    navigation.navigate(
                      routeNames.HOME.SUB_ROUTES.BUS_NUM_SEARCH,
                    )
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
                    navigation.navigate(
                      routeNames.HOME.SUB_ROUTES.BUS_ST_SEARCH,
                      {
                        type: 'source',
                      },
                    )
                  }
                />
                <InputButton
                  Icon={<Icon as={MaterialIcons} name={'location-pin'} />}
                  placeholder={'To Bus Station'}
                  onPress={() =>
                    navigation.navigate(
                      routeNames.HOME.SUB_ROUTES.BUS_ST_SEARCH,
                      {
                        type: 'dest',
                      },
                    )
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
            </Center>
          </Box>
        </Center>
      </Container>

      {/* blogs and menu*/}
      <Container h="55%" px={6} bgColor="white">
        {/* <Stack space={6}>
          {bus_data.map((e, i) => (
            <BusCard key={i} num={e.id} title={e.title} status={e.status} />
          ))}
        </Stack> */}

        <VStack h="100%">
          <VStack space={3} w="100%">
            <HStack
              w="100%"
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Heading size={'md'} fontWeight={400}>
                Trending Blogs
              </Heading>
              <IconButton
                onPress={() =>
                  navigation.navigate(routeNames.HOME.SUB_ROUTES.BLOGS)
                }
                variant="solid"
                borderRadius={'full'}
                bgColor={'primary.100'}
                _icon={{
                  as: MaterialIcons,
                  name: 'arrow-forward-ios',
                  color: 'secondary.600',
                }}
              />
            </HStack>

            <Box>
              <Carousel
                data={blogs}
                renderItem={renderItem}
                onSnapToItem={index => setactiveSlideIdx(index)}
                sliderWidth={wp(95)}
                itemWidth={itemWidth}
                enableSnap={true}
                loop
                autoplay
                lockScrollWhileSnapping={true}
              />
              <Pagination
                dotsLength={blogs.length}
                activeDotIndex={activeSlideIdx}
                dotColor={colors.secondary[500]}
                inactiveDotColor={colors.primary[200]}
              />
            </Box>
          </VStack>
          <VStack w="100%">
            {/* <Box w="100%">
              <Heading fontWeight={500}>Important Links</Heading>
            </Box> */}
            <HStack justifyContent={'space-between'} w="100%">
              <MenuIconButton
                title={'About Us'}
                iconName={'info'}
                onPress={() =>
                  Linking.openURL(
                    'https://www.vedantalimited.com/eng/who-we-are-overview.php',
                  )
                }
              />
              <MenuIconButton
                title={'Feedback'}
                onPress={() =>
                  Linking.openURL('mailto:kumarsen.bash@gmail.com')
                }
                iconName={'feedback'}
              />
              <MenuIconButton
                title={'Policy'}
                iconName={'policy'}
                onPress={() =>
                  Linking.openURL(
                    'https://www.freeprivacypolicy.com/live/5a51cb54-77ee-4519-bcc1-00fe41bb3c33',
                  )
                }
              />
              <MenuIconButton
                title={'Contact'}
                onPress={() =>
                  Linking.openURL('mailto:kumarsen.bash@gmail.com')
                }
                iconName={'perm-contact-cal'}
              />
              <MenuIconButton
                title={'Support'}
                iconName={'support-agent'}
                onPress={() => setopenSupport(true)}
              />
            </HStack>
          </VStack>
        </VStack>

        <SuportDialogue
          isOpen={openSupport}
          onClose={() => setopenSupport(false)}
        />
      </Container>
    </View>
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
            textTransform={'capitalize'}
            color={value ? 'black' : 'muted.400'}>
            {value ? value : placeholder}
          </Heading>
        </HStack>
      </Box>
    </Pressable>
  );
}

function MenuIconButton({title, iconName, as, onPress}) {
  return (
    <Box>
      <IconButton
        onPress={onPress}
        bgColor={'primary.50'}
        borderColor={'primary.800'}
        borderWidth={1}
        variant="solid"
        _icon={{
          color: 'secondary.600',
          size: '2xl',
          as: as ? as : MaterialIcons,
          name: iconName,
        }}
      />
      <Text w="100%" textAlign={'center'}>
        {title}
      </Text>
    </Box>
  );
}

function BlogCard({title, date, readTime, imageUrl, id}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(routeNames.HOME.SUB_ROUTES.SINGLE_BLOG, {title, id})
      }>
      <HStack
        alignItems={'flex-start'}
        bgColor={'primary.50'}
        padding={3}
        space={3}
        borderRadius={'2xl'}
        borderWidth={1}
        borderColor={'primary.500'}
        w="100%">
        <Image
          alt="blog header image"
          src={imageUrl}
          size={'md'}
          borderRadius={'2xl'}
        />
        <Box maxW={'90%'}>
          <Heading noOfLines={2} fontWeight={500} maxW="90%" size="md">
            {title}
          </Heading>
          <Text fontSize={16} fontWeight={200}>
            Team Vedanta
          </Text>
        </Box>
      </HStack>
    </Pressable>
  );
}

function wp(percentage) {
  const value = (percentage * screen_width) / 100;
  return Math.round(value);
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

function SuportDialogue({isOpen, onClose}) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Support Contact</AlertDialog.Header>
        <AlertDialog.Body>
          <VStack space={4}>
            <Box>
              <Heading size="md" fontWeight={400}>
                Prem Chopra
              </Heading>
              <Heading size="sm" fontWeight={400}>
                Transport Department Executive
              </Heading>
              <Button
                onPress={() => Linking.openURL('tel:7894561230')}
                mt={3}
                startIcon={<Icon as={MaterialIcons} name="call" />}>
                Call
              </Button>
            </Box>

            <Box>
              <Heading size="md" fontWeight={400}>
                Anjali Singh
              </Heading>
              <Heading size="sm" fontWeight={400}>
                Transport Department Executive
              </Heading>
              <Button
                onPress={() => Linking.openURL('tel:898989899')}
                mt={3}
                startIcon={<Icon as={MaterialIcons} name="call" />}>
                Call
              </Button>
            </Box>
          </VStack>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
