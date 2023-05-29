import {
  FlatList,
  Input,
  Box,
  Icon,
  HStack,
  Pressable,
  Text,
  Divider,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';

import routeNames from '../constants/routeNames';

const BusNumSearch = () => {
  const [busNum, setbusNum] = useState('');
  const [result, setresult] = useState([]);

  useEffect(() => {
    setresult(
      bus_data.filter(obj => obj.id.toString().includes(busNum.toString())),
    );
  }, [busNum]);

  return (
    <Container>
      <Box mb={4}>
        <Input
          keyboardType="numeric"
          size={'lg'}
          w="100%"
          placeholder="Bus Number"
          value={busNum}
          onChangeText={v => setbusNum(v)}
          autoFocus
        />
      </Box>
      <FlatList
        data={result}
        renderItem={({item}) => <Item title={item.title} id={item.id} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default BusNumSearch;

function Item({id, title}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(routeNames.HOME.SUB_ROUTES.BUS_RESULT.NAME, {
          id,
          title,
        })
      }>
      <HStack padding={1} my={2} alignItems={'center'}>
        <HStack space={2} flex={0.2} alignItems={'center'}>
          <Icon size={'sm'} as={FontAwesome} name={'bus'} />
          <Text fontWeight={400}>{id}</Text>
        </HStack>

        <Text flex={1}>{title}</Text>
      </HStack>
      <Divider />
    </Pressable>
  );
}

const bus_data = [
  {id: 400, title: 'Bokaro Steel City'},
  {id: 302, title: 'Ranchi'},
  {id: 512, title: 'Dhanbaad'},
  {id: 311, title: 'Darbhanga'},
  {id: 215, title: 'Green City'},
  {id: 256, title: 'Yellow City'},
  {id: 316, title: 'Pink City'},
  {id: 515, title: 'Blue City'},
  {id: 412, title: 'Red City'},
];
