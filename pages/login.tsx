import React, { useState } from 'react';
import Link from 'next/link';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseClient } from '../firebaseClient';
import 'firebase/auth';

export default (_props: any) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebaseClient.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseClient.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/authenticated'
  };

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
