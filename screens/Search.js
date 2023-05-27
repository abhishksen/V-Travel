import {View, Text, Button, Box} from 'native-base';
import React from 'react';
import auth from '@react-native-firebase/auth';

import Container from '../components/Container';

const Search = () => {
  return (
    <View>
      <Container h={'40%'}>
        <Box bgColor="primary.100" padding={5} borderRadius={'xl'}>
          <Text>Search</Text>
          <Button onPress={() => auth().signOut()}>log out</Button>
        </Box>
      </Container>
    </View>
  );
};

export default Search;
