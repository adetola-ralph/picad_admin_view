import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDRl7Yche_9bMYt8x63deX8IymnLoTymbw',
  authDomain: 'picad-4223c.firebaseapp.com',
  databaseURL: 'https://picad-4223c.firebaseio.com',
  storageBucket: 'picad-4223c.appspot.com',
  messagingSenderId: '177009626460',
};

firebase.initializeApp(config);

export const authentication = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();
