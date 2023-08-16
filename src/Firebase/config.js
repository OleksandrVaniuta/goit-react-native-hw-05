import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZ85pIG0G-Ln6ykrbq6J3U8g-OHnjMtms',
  authDomain: 'rn-hw-848ec.firebaseapp.com',
  projectId: 'rn-hw-848ec',
  storageBucket: 'rn-hw-848ec.appspot.com',
  messagingSenderId: '1021638538229',
  appId: '1:1021638538229:web:5064ddf3c1cdb5f9afe6bc',
  measurementId: 'G-JMN6NVQL2S',
};

export const app = initializeApp(firebaseConfig);

db = getFirestore(app);
