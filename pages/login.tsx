import React, { useState } from 'react';
import Link from 'next/link';
//import { firebaseClient } from '../firebaseClient';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseClient from 'firebase/app';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  const CLIENT_CONFIG = {
    apiKey: 'AIzaSyCwDemOYP04flvahj8RRaUqYRLjlOYeiOI',
    authDomain: 'storycomp-ab155.firebaseapp.com',
    databaseURL: 'https://storycomp-ab155.firebaseio.com',
    projectId: 'storycomp-ab155',
    storageBucket: 'storycomp-ab155.appspot.com',
    messagingSenderId: '192779751323',
    appId: '1:192779751323:web:10ccd85b72a96065df9b3e',
  };

  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}


export default (_props: any) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebaseClient.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseClient.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/authenticated'
  };


  // const [email, setEmail] = useState('');
  // const [pass, setPass] = useState('');
  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <StyledFirebaseAuth uiConfig={uiConfig}
                                firebaseAuth={firebaseClient.auth()}/>
    </div> 
  );
};
