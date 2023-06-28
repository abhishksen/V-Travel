import React from 'react';
import {Text, Heading, VStack, Image, HStack, Divider} from 'native-base';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import routeNames from '../constants/routeNames';

function BlogCard({title, date, readTime, imageUrl, id, disableDivider}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(routeNames.HOME.SUB_ROUTES.SINGLE_BLOG, {title, id})
      }>
      <VStack space={4}>
        <Image
          size="2xl"
          width="100%"
          src={imageUrl}
          alt="Blog Image"
          borderRadius={'lg'}
        />

        <HStack space={4}>
          <Text fontSize={16} fontWeight={200}>
            {date}
          </Text>
          <Text>•</Text>
          <Text fontSize={16} fontWeight={200}>
            Read {' ' + readTime}
          </Text>
        </HStack>

        <VStack space={2}>
          <Heading fontWeight={400}>{title}</Heading>
          <Text fontSize={16} fontWeight={200}>
            Team Vedanta
          </Text>
        </VStack>

        {disableDivider ? null : <Divider />}
      </VStack>
    </Pressable>
  );
}

export default BlogCard;
