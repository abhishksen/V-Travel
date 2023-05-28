import {
  FlatList,
  Input,
  Box,
  Icon,
  HStack,
  Heading,
  Pressable,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useSearchData from '../hooks/useSearchData';

import Container from '../components/Container';

const StationSearch = ({route, navigation}) => {
  const type = route.params?.type;

  const {setDest, setSource} = useSearchData();

  const [stText, setstText] = useState('');
  const [result, setresult] = useState([]);

  const handlePress = title => {
    if (type === 'source') {
      setSource(title);
    } else {
      setDest(title);
    }

    navigation.goBack();
  };

  useEffect(() => {
    setresult(
      bus_data.filter(obj =>
        obj.title.toLowerCase().includes(stText.toLowerCase()),
      ),
    );
  }, [stText]);

  return (
    <Container>
      <Box mb={4}>
        <Input
          size={'lg'}
          w="100%"
          placeholder="Bus Number"
          value={stText}
          onChangeText={v => setstText(v)}
          autoFocus
        />
      </Box>
      <FlatList
        data={result}
        renderItem={({item}) => (
          <Pressable onPress={handlePress.bind(this, item.title)}>
            <HStack
              padding={2}
              borderColor={'primary.300'}
              bgColor={'primary.50'}
              borderRadius={'md'}
              borderWidth={2}
              my={2}
              space={5}
              alignItems={'center'}>
              <Icon size={'xl'} as={FontAwesome} name={'bus'} />
              <Heading flex={1} size="md" fontWeight={400}>
                {item.title}
              </Heading>
            </HStack>
          </Pressable>
        )}
        keyExtractor={(it, i) => i}
      />
    </Container>
  );
};

export default StationSearch;

const bus_data = [
  {title: 'Bokaro Steel City'},
  {title: 'Ranchi'},
  {title: 'Dhanbaad'},
  {title: 'Darbhanga'},
  {title: 'Green City'},
  {title: 'Yellow City'},
  {title: 'Pink City'},
  {title: 'Blue City'},
  {title: 'Red City'},
];
