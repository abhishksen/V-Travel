import {VStack, ScrollView, Button, Center} from 'native-base';
import React from 'react';
import {Linking} from 'react-native';

import BlogCard from '../components/BlogCard';

import blogs from '../data/blogs';

const Blogs = () => {
  return (
    <ScrollView px={4} mt={4}>
      <VStack space={8}>
        {blogs.map((v, i) => (
          <BlogCard
            key={i}
            title={v.title}
            date={v.date}
            readTime={v.read_time}
            imageUrl={v.image_url}
            id={v.id}
          />
        ))}
      </VStack>

      <Center my={5} w="100%">
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.vedantalimited.com/eng/blog_listing.php',
            )
          }
          colorScheme={'secondary'}
          size={'lg'}
          borderRadius={'full'}>
          Read More
        </Button>
      </Center>
    </ScrollView>
  );
};

export default Blogs;
