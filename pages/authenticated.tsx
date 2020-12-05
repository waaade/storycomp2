import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebaseAdmin';
import { firebaseClient } from '../firebaseClient';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE
    
    //Time to start accessing the Firestore database
    const db = firebaseAdmin.firestore();

    //Add user to users collection, if it's not already there
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      const user = { id: uid,
                    email: email 
      };
      const res = await db.collection('users').doc(uid).set(user);
    }

     const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.where('userId', '==', uid).get();
    let projects = null;
    if (snapshot.empty) {
      console.log('No matching documents.');
    }
    else {
      console.log(snapshot.length);
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        // projects.push({id: doc.id, 
        //               data: {
        //                 name: doc.data().name, 
        //                 userId: doc.data().userId}
        //                 });
        });
    }
    

    return {
      props: { message: `Hello ${email}!` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

const Authenticated = (
props: InferGetServerSidePropsType<typeof getServerSideProps>
) => (
  <div>
    <p>{props.message!}</p>
    <button
      onClick={async () => {
        await firebaseClient.auth().signOut();
        window.location.href = '/';
      }}
    >
      Sign out
    </button>
  </div>
);
export default Authenticated;
  
