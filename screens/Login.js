import {Text, Image, Center, Heading, Box} from 'native-base';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';

import Container from '../components/Container';
import loginImage from '../assets/images/login.png';

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
    <Container>
      <Center h="100%">
        <Center w={'100%'} padding={1} mb={4}>
          <Box mb={3}>
            <Heading textAlign={'center'} fontWeight={500}>
              Live Bus Status
            </Heading>
            <Text fontSize={16} textAlign={'center'}>
              Know current location & arrival time of your bus
            </Text>
          </Box>
          <Image source={loginImage} size={'2xl'} h={300} alt="login image" />
        </Center>
        <Center h="30%">
          <Heading mb={3} size={'lg'}>
            Login To Start Tracking!
          </Heading>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleButtonPress}
            disabled={isLoading}
          />
          {errMsg ? <Text color={'danger.500'}>{errMsg}</Text> : null}
        </Center>
      </Center>
    </Container>
  );
};

export default Login;
