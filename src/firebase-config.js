import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5f_89oL2WrsiNPBDOuWE3yvvgRGTETxk',
  authDomain: 'woman-up-todo.firebaseapp.com',
  projectId: 'woman-up-todo',
  storageBucket: 'woman-up-todo.appspot.com',
  messagingSenderId: '1031164743619',
  appId: '1:1031164743619:web:dd134eb9ebdc089c5ef776',
};

const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export default firebase;
