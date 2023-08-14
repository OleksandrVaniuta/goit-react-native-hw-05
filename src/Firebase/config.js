// export * as firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект

// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBZ85pIG0G-Ln6ykrbq6J3U8g-OHnjMtms',
  authDomain: 'rn-hw-848ec.firebaseapp.com',
  projectId: 'rn-hw-848ec',
  storageBucket: 'rn-hw-848ec.appspot.com',
  messagingSenderId: '1021638538229',
  appId: '1:1021638538229:web:5064ddf3c1cdb5f9afe6bc',
  measurementId: 'G-JMN6NVQL2S',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export default firebase;
export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
db = getFirestore(app);
// // export const storage = getStorage(app);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
