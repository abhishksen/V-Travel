import {View} from 'native-base';
import React from 'react';

const Container = ({children, ...rest}) => {
  return (
    <View h={'100%'} padding={3} {...rest}>
      {children}
    </View>
  );
};

export default Container;
