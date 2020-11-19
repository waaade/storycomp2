import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from './secret.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: 'https://storycomp-ab155.firebaseio.com',
  });
}

export { firebaseAdmin };
