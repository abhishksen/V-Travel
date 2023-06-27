import {Text, Image, Center, Heading, Box, View, HStack} from 'native-base';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';

import Container from '../components/Container';
import loginImage from '../assets/images/login.png';
import logo from '../assets/images/vlogo.jpg';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '448774381681-da8vhof2bai3j18mjpceb7jc0hvmfm1u.apps.googleusercontent.com',
});

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const [errMsg, seterrMsg] = useState('');

  async function onGoogleButtonPress() {
    try {
      setisLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      seterrMsg(error.message);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <View bgColor={'#fff'} h="100%">
      <Container h={'65%'} bgColor="#fff">
        <Center h="100%" w={'100%'} padding={1} mb={4}>
          <Image source={logo} size={'sm'} mb={1} alt="logo" />
          <Box mb={3}>
            <Center flexDirection={'row'}>
              <Heading
                color={'secondary.500'}
                mr={1}
                fontWeight={600}
                size={'xl'}>
                Vedanta
              </Heading>
              <Heading color={'primary.500'} fontWeight={600} size={'xl'}>
                Baitho!
              </Heading>
            </Center>
            <Heading textAlign={'center'} fontWeight={600} size={'md'}>
              Check Live Bus Status
            </Heading>
            <Text fontSize={18} textAlign={'center'}>
              Know current location & arrival time of your bus
            </Text>
          </Box>
          <Image source={loginImage} size={'2xl'} h={300} alt="login image" />
        </Center>
      </Container>
      <Center
        h="35%"
        bgColor={'primary.500'}
        borderTopRadius={'80'}
        borderWidth={2}>
        <Center>
          <Heading color={'#fff'} fontWeight={600} mb={3} size={'lg'}>
            Login To Start Tracking!
          </Heading>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={onGoogleButtonPress}
            disabled={isLoading}
          />
          {errMsg ? <Text color={'danger.500'}>{errMsg}</Text> : null}
        </Center>
      </Center>
    </View>
  );
};

export default Login;
