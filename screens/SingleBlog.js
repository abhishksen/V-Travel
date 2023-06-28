import {
  Center,
  Heading,
  ScrollView,
  Image,
  VStack,
  HStack,
  Text,
  Box,
} from 'native-base';
import React from 'react';

import BlogCard from '../components/BlogCard';

import blogs from '../data/blogs';

const SingleBlog = ({route}) => {
  const blog_id = route?.params?.id;

  const blog_data = blogs.find(v => v.id === blog_id);
  const also_read = blogs.filter(v => v.id !== blog_id);

  if (!blog_data) {
    return (
      <Center w="100%" h="100%">
        <Heading textAlign={'center'}>
          There was an error fetching blog content!
        </Heading>
      </Center>
    );
  }

  return (
    <ScrollView px={4} mt={4}>
      <VStack space={4}>
        <Image
          size="xl"
          width="100%"
          src={blog_data.image_url}
          alt="Blog Image"
          borderRadius={'lg'}
        />

        <HStack space={4}>
          <Text fontSize={16} fontWeight={200}>
            {blog_data.date}
          </Text>
          <Text>•</Text>
          <Text fontSize={16} fontWeight={200}>
            Read {' ' + blog_data.read_time}
          </Text>
        </HStack>

        <VStack space={2}>
          <Heading size={'xl'}>{blog_data.title}</Heading>
          <Text fontSize={16} fontWeight={700}>
            Team Vedanta
          </Text>
        </VStack>
      </VStack>
      <Box my={7}>
        <Text fontSize={16}>{blog_data.content}</Text>
      </Box>

      <Heading size={'xl'} fontWeight={500}>
        Also Read
      </Heading>
      <ScrollView horizontal>
        <HStack space={5} my={3}>
          {also_read.map((v, i) => (
            <Box key={i} w={320}>
              <BlogCard
                title={v.title}
                date={v.date}
                readTime={v.read_time}
                imageUrl={v.image_url}
                id={v.id}
                disableDivider
              />
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </ScrollView>
  );
};

export default SingleBlog;
