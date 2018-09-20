import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA0B8ohXB6Cj7EZ4vmhA-qFEVLou-cZTx4',
  authDomain: 'sdpsms-912a6.firebaseapp.com',
  databaseURL: 'https://sdpsms-912a6.firebaseio.com',
  projectId: 'sdpsms-912a6',
  storageBucket: 'sdpsms-912a6.appspot.com',
  messagingSenderId: '326081924238'
};

/**
 * This function is called in the main app to initialized firebase connection
 */
export function initializeFirebase () {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
