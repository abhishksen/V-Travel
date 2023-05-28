import {FlatList, Icon, HStack, Heading} from 'native-base';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';

const BusList = () => {
  const [result, setresult] = useState(bus_data);

  return (
    <Container>
      <FlatList
        data={result}
        renderItem={({item}) => <Item title={item.title} id={item.id} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default BusList;

function Item({id, title}) {
  return (
    <HStack
      padding={2}
      borderColor={'primary.300'}
      bgColor={'primary.50'}
      borderRadius={'md'}
      borderWidth={2}
      my={2}
      space={5}
      alignItems={'center'}>
      <HStack space={2} flex={0.2} alignItems={'center'}>
        <Icon size={'xl'} as={FontAwesome} name={'bus'} />
        <Heading size="md" fontWeight={400}>
          {id}
        </Heading>
      </HStack>

      <Heading flex={1} size="md" fontWeight={400}>
        {title}
      </Heading>
    </HStack>
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
