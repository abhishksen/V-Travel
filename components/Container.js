import {View} from 'native-base';
import React from 'react';

const Container = ({children, ...rest}) => {
  return (
    <View padding={3} {...rest}>
      {children}
    </View>
  );
};

export default Container;
